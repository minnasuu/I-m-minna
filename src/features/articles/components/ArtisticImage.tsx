import React, { useRef, useEffect, useState } from 'react';

interface ArtisticImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ArtisticImage: React.FC<ArtisticImageProps> = ({ src, alt, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  
  // 动画状态
  const animationRef = useRef<number>(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const targetOffset = useRef({ x: 0, y: 0 }); // 目标偏移量（基于鼠标位置）
  const currentOffset = useRef({ x: 0, y: 0 }); // 当前平滑过渡的偏移量
  const isHovering = useRef(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
      initCanvas();
    };
  }, [src]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !imageRef.current) return;

    // 设置 Canvas 尺寸为容器尺寸 (Retina 屏幕适配)
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
    
    // 初始绘制
    draw(0, 0);
  };

  // 核心绘制逻辑
  const draw = (offsetX: number, offsetY: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imageRef.current;
    
    if (!canvas || !ctx || !img) return;

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, width, height);

    // 计算图片覆盖 (Object-fit: cover 模拟)
    const imgAspect = img.width / img.height;
    const canvasAspect = width / height;
    let drawWidth, drawHeight, drawX, drawY;

    if (imgAspect > canvasAspect) {
      drawHeight = height;
      drawWidth = height * imgAspect;
      drawY = 0;
      drawX = (width - drawWidth) / 2;
    } else {
      drawWidth = width;
      drawHeight = width / imgAspect;
      drawX = 0;
      drawY = (height - drawHeight) / 2;
    }

    // 只有 Hover 时才开启特效
    if (Math.abs(offsetX) < 0.5 && Math.abs(offsetY) < 0.5 && !isHovering.current) {
       // 静态绘制：稍微放大一点避免后续动起来露底
       const scale = 1.05;
       const drawW = drawWidth * scale;
       const drawH = drawHeight * scale;
       ctx.drawImage(img, drawX - (drawWidth * (scale-1)/2), drawY - (drawHeight * (scale-1)/2), drawW, drawH);
    } else {
      // --- 艺术切片故障效果 (Glitch Slice) ---
      const scale = 1.1;
      const scaledW = drawWidth * scale;
      const scaledH = drawHeight * scale;
      const startX = drawX - (drawWidth * (scale-1)/2);
      const startY = drawY - (drawHeight * (scale-1)/2);

      // 分层绘制：底层原图
      // ctx.globalAlpha = 1;
      // ctx.drawImage(img, startX, startY, scaledW, scaledH);

      // 切片参数
      const sliceHeight = scaledH / 20; // 分成 20 个切片
      const amplitude = Math.sqrt(offsetX * offsetX + offsetY * offsetY) * 0.15; // 振幅取决于鼠标速度/距离
      
      // 如果鼠标在左边，波浪向左；鼠标在右边，波浪向右
      // 引入一个随机种子或时间因子让波浪动起来
      const time = Date.now() / 100;

      for (let i = 0; i < 20; i++) {
        const sy = sliceHeight * i; // 原图切片 Y
        const dy = startY + sy; // 目标位置 Y
        
        // 计算切片偏移：正弦波
        // 频率取决于 i，相位取决于 time
        const wave = Math.sin(i * 0.5 + time) * amplitude;
        
        // 额外的随机故障位移 (Glitch)
        const glitch = Math.random() > 0.9 ? (Math.random() - 0.5) * 20 : 0;
        
        const dx = startX + wave + glitch + (offsetX * 0.05); // 基础偏移 + 波浪 + 故障

        // 绘制切片
        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        // 注意：sx, sy 是基于原图尺寸的。我们需要把 scaledW/H 映射回原图坐标
        // 简化：直接假设我们切的是已经缩放好的 Canvas 区域（不行，drawImage 源必须是 img）
        
        // 正确映射：
        // 目标区域是 scaledW * scaledH。
        // 切片高度是 sliceHeight。
        // 对应原图的切片高度 sourceSliceHeight = img.height / 20
        // sourceSliceY = img.height * (i / 20)
        
        const sourceSliceH = img.height / 20;
        const sourceSliceY = i * sourceSliceH;
        
        // 绘制 R 通道 (红色偏移)
        // 为了性能，我们只绘制一次全彩，但带有 RGB 分离错位会更酷
        // 这里做简单版：只做位置错位
        
        ctx.save();
        // 边缘淡化
        ctx.globalAlpha = 0.9 + Math.random() * 0.1;
        ctx.drawImage(
          img, 
          0, sourceSliceY, img.width, sourceSliceH, // 源
          dx, dy, scaledW, sliceHeight // 目标
        );
        
        // 增加一点 RGB 分离线条 (装饰)
        if (Math.random() > 0.8) {
          ctx.globalCompositeOperation = 'lighter';
          ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,0,0,0.5)' : 'rgba(0,255,255,0.5)';
          ctx.fillRect(dx + (Math.random() * 10), dy, scaledW, 2);
        }
        
        ctx.restore();
      }
    }
  };

  const loop = () => {
    // 只要 Hover 或者是还有偏移量，就一直循环
    if (!isHovering.current && Math.abs(currentOffset.current.x) < 0.1) {
      animationRef.current = 0;
      // 最后画一帧静止的
      draw(0, 0);
      return;
    }
    
    // 让波浪一直动，即使鼠标停下
    // 所以只要 isHovering 就一直 loop
    
    currentOffset.current.x += (targetOffset.current.x - currentOffset.current.x) * 0.1;
    currentOffset.current.y += (targetOffset.current.y - currentOffset.current.y) * 0.1;

    // 传入 time 参数给 draw? draw 内部用 Date.now()
    draw(currentOffset.current.x, currentOffset.current.y);
    
    animationRef.current = requestAnimationFrame(loop);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // 鼠标相对于中心的坐标
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // 目标偏移量 = 鼠标位置 * 系数
    targetOffset.current = { x: x, y: y };
    
    if (animationRef.current === 0) {
      animationRef.current = requestAnimationFrame(loop);
    }
  };

  const handleMouseEnter = () => {
    isHovering.current = true;
    if (animationRef.current === 0) {
      animationRef.current = requestAnimationFrame(loop);
    }
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    targetOffset.current = { x: 0, y: 0 }; // 复位
  };

  // 窗口大小改变时重置 Canvas
  useEffect(() => {
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`artistic-image-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}
    >
      {/* Canvas 层 */}
      <canvas 
        ref={canvasRef} 
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
      
      {/* 备用图片 (SEO + 加载前显示) */}
      <img 
        src={src} 
        alt={alt} 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          opacity: imageLoaded ? 0 : 1, // 加载完成后隐藏
          transition: 'opacity 0.3s'
        }} 
      />
    </div>
  );
};

export default ArtisticImage;

