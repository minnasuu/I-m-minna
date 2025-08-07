import React, { Fragment, useRef, useState } from 'react';
import styled from 'styled-components';

// 定义扇形数据接口
interface SectorData {
  deg: number;           // 扇形角度
  color?: string;        // 扇形颜色
  id?: string | number;  // 扇形ID
  component?:React.ReactNode; // 扇形内容
}

// 在接口中添加padding参数
interface SectorWheelProps {
  size: number;                // 圆的大小（直径）
  sectorData: SectorData[];    // 扇形数据数组
  startDeg?: number;           // 起始偏移角度，默认为270度（圆的竖直半径上半部分）
  strokeWidth?: number;        // 扇形边框宽度
  strokeColor?: string;        // 扇形边框颜色
  className?: string;          // 自定义类名
  style?: React.CSSProperties; // 自定义样式
  pointerColor?: string;       // 指针颜色
  padding?: number;            // 扇形与SVG边框的间距
  onSectorChange?: (sectorIndex: number, sector: SectorData) => void; // 扇形变化回调
  buttonText?: string;         // 按钮文本
  buttonStyle?: React.CSSProperties; // 按钮样式
  enableRotate?: boolean;           // 是否旋转
  defaultImgUrl?: string;          // 默认图片URL
  activeImgUrl?: string;           // 激活图片URL
}

/**
 * 将角度转换为弧度
 * @param deg 角度
 * @returns 弧度
 */
const degToRad = (deg: number): number => {
  return (deg * Math.PI) / 180;
};

/**
 * 计算圆上一点的坐标
 * @param centerX 圆心X坐标
 * @param centerY 圆心Y坐标
 * @param radius 半径
 * @param angleInDegrees 角度
 * @returns 坐标点 {x, y}
 */
const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } => {
  const angleInRadians = degToRad(angleInDegrees);
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

/**
 * 生成扇形的SVG路径
 * @param x 圆心X坐标
 * @param y 圆心Y坐标
 * @param radius 半径
 * @param startAngle 起始角度
 * @param endAngle 结束角度
 * @returns SVG路径字符串
 */
const createSectorPath = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  strokeWidth: number,
): string => {
  const start = polarToCartesian(x+strokeWidth, y+strokeWidth, radius, endAngle);
  const end = polarToCartesian(x+strokeWidth, y+strokeWidth, radius, startAngle);
  
  // 判断扇形角度是否大于等于180度
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  
  // 构建SVG路径
  const path = [
    'M', x+strokeWidth, y+strokeWidth,                           // 移动到圆心
    'L', start.x, start.y,               // 画线到起始点
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y, // 画弧
    'Z'                                  // 闭合路径
  ].join(' ');
  
  return path;
};

/**
 * 生成默认颜色数组
 * @param count 需要的颜色数量
 * @returns 颜色数组
 */
const generateDefaultColors = (count: number): string[] => {
  const defaultColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA5A5', '#98D8C8',
    '#F9C74F', '#90BE6D', '#43AA8B', '#577590', '#F94144',
    '#F3722C', '#F8961E', '#F9844A', '#F9C74F', '#90BE6D'
  ];
  
  // 如果默认颜色不够，则循环使用
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    colors.push(defaultColors[i % defaultColors.length]);
  }
  
  return colors;
};

const SectorWheel: React.FC<SectorWheelProps> = ({
  size,
  sectorData,
  startDeg = 270, // 默认从顶部开始（270度）
  strokeWidth = 0,
  className = '',
  style = {},
  pointerColor = 'black',
  padding = 0,
  buttonText = 'GO',
  buttonStyle = {},
  enableRotate=false,
  defaultImgUrl,
}) => {
  // 验证扇形角度总和是否为360度
  const totalDeg = sectorData.reduce((sum, sector) => sum + sector.deg, 0);
  if (Math.abs(totalDeg - 360) > 0.001) {
    console.warn(`扇形角度总和应为360度，当前为${totalDeg}度`);
  }
  
  // 引用
  const svgRef = useRef<SVGSVGElement>(null);
  
  // 生成默认颜色
  const defaultColors = generateDefaultColors(sectorData.length);
  
  // 计算圆心和半径
  const center = size / 2;
  const radius = center - padding;
  
  // 生成扇形路径
  const sectors = [];
  let currentAngle = startDeg;
  
  for (let i = 0; i < sectorData.length; i++) {
    const { deg, color, id } = sectorData[i];
    const startAngle = currentAngle;
    const endAngle = currentAngle + deg;
    
    sectors.push({
      path: createSectorPath(center, center, radius, startAngle, endAngle, strokeWidth),
      color: color || defaultColors[i],
      id: id || `sector-${i}`,
      startAngle,
      endAngle,
      deg,
      component: sectorData[i].component
    });
    
    currentAngle = endAngle;
  }

  const [rotation, setRotation] = useState(0); // 旋转角度
  const [isSpinning, setIsSpinning] = useState(false); // 新的状态变量
  
  // 处理按钮点击，开始旋转
  const handleSpinClick = () => {
    setIsSpinning(true);
    const randomRotation = Math.floor(Math.random() * 360*12) + 360*3; // 随机旋转3到5  
    const randomRotation2 = Math.floor(Math.random() * 15) + 5; // 随机旋转3到5
    setRotation((prevRotation) => (prevRotation + randomRotation));
    setRotation((prevRotation) => (prevRotation - randomRotation2));
    setIsSpinning(false);
  }

  // 计算当前圆形周长
  const circumference = 2 * Math.PI * radius;
  
  return (
    <div className={`sector-wheel-container ${className}`} style={{ position: 'relative', width: size, height: size, ...style }}>
      <StyledRotarySvg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size+strokeWidth*2} ${size+strokeWidth*2}`}
        style={{ 
          transform: `rotate(${rotation}deg)`,
          transitionDuration: rotation%360*50 + 'ms',
        }}
      >
        {sectors.map((sector, index) => (
          <path
            key={sector.id??index}
            d={sector.path}
            fill={sector.color}
            strokeWidth={strokeWidth}
          />
        ))}
      </StyledRotarySvg>
     {defaultImgUrl&& <StyledRotarySvg
        width={size}
        height={size}
        viewBox={`0 0 ${size+strokeWidth*2} ${size+strokeWidth*2}`}
        style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%,-50%) rotate(${rotation}deg)`,
          transitionDuration: rotation%360*50 + 'ms',
          zIndex: 10,
          pointerEvents: 'none'
        }}
      >
        {sectors.map((maskSector, maskIndex) => (
          <Fragment key={maskSector.id??maskIndex}>
            <mask
              xmlns="http://www.w3.org/2000/svg"
              id={`eqq-home-rotary-circle-icons-white-${maskIndex + 1}`}
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x={strokeWidth}
              y={strokeWidth}
              width={size}
              height={size}
            >
              <path
              d={maskSector.path}
              strokeWidth={strokeWidth}
            />
            </mask>
            <image
              mask={`url(#eqq-home-rotary-circle-icons-white-${maskIndex + 1})`}
              href={defaultImgUrl}
              x={strokeWidth}
              y={strokeWidth}
              width={size}
              height={size}
            />
          </Fragment>
        ))}
      </StyledRotarySvg>}
      <div className='absolute top-0 left-0 width-100 height-100 events-none'>
        {sectors.map?.((sector, index) => <div key={sector.id??index} className='absolute-center width-100' style={{height: circumference*sector.deg/360,transform: `translate(-50%, -50%) rotate(${sector.deg/2 + sector.startAngle}deg)`,transformOrigin:'center'}}>{sector.component}</div>)}
      </div>
      {/* 固定指针 */}
      {enableRotate && <div 
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: `20px solid ${pointerColor}`,
          zIndex: 10
        }}
      />}
      
      {/* 旋转按钮 */}
      {enableRotate&&<button
        onClick={enableRotate?handleSpinClick:undefined}
        disabled={isSpinning}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '80px',
          height: '80px',
          transform: 'translate(-50%, -50%)',
          padding: '8px 16px',
          backgroundColor: isSpinning ? '#cccccc' : 'black',
          color: 'white',
          border: 'none',
          borderRadius: '100%',
          cursor: isSpinning ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          zIndex: 20,
          ...buttonStyle
        }}
      >
        {isSpinning ? '旋转中...' : buttonText}
      </button>}
    </div>
  );
};

const StyledRotarySvg = styled.svg`
  path{
    transition: all 0.2s linear;
    cursor: pointer;
    &:hover{
      stroke: #999;
    }
  }
`

export default SectorWheel;