在 [腾讯广告官网（e.qq.com）](https://e.qq.com/) 的页面还原中，通过 SVG 的方式实现了一个支持鼠标交互的轮盘，整个轮盘实现的主要有两个要点：

- 扇形的绘制与交互：通过 SVG 的 path 元素（路径）实现。
- 扇形交互的过渡效果：内层与外层通过 transform 的 scale 依次扩散。

趁热打铁，以此为例，对需求中实现轮盘的过程进行封装与扩展，沉淀转盘相关页面的通用重构方案。

# 一、基础效果预览

{{BasicSectorWheel}}

# 二、轮盘扇形分区如何实现？

### 思路剖析：

首先，选择 SVG 实现轮盘的原因在于可交互性，使轮盘中的每个扇形都在当前特定的扇形区域内可以用鼠标交互。

其次，明确轮盘需要定制化的地方：

- 扇形分区数量
- 扇形角度
- 从中心到外围的扇形层数
- 跨层扇形的包含关系（类似于表格的"合并单元格"）
- 每个扇形的颜色等样式
- 每个扇形内部的内容——文字、图标、图片等
- 扇形的交互效果

这样看来，似乎是一个非常非常复杂的组件，且！这样的组件是没有在网页上出现过的。所以层层效果都需要思考应该如何实现，还要保证最终的实现方式是容易维护的。

### 基础方案（扇形路径）——实现步骤：

首先能想到一个很简单的基础方案，将设计稿中的扇形轮盘对应的扇形路径整理成数据直接使用。

#### 1. 定义轮盘数据类型

```js
interface SectorWheelProps {
    size: number;                // 圆的大小（直径）
    sectorData: SectorData[];    // 扇形数据数组
  }
```

#### 2. 定义扇形数据类型

```js
interface SectorData {
    id: string | number;  // 扇形ID
    path?: string;           // 扇形路径
    background-color?: string;        // 扇形颜色
  }
```

#### 3. 遍历数据绘制轮盘扇形

```js
<svg>
    {data.map(item => <path key={item.id} d={item.path}></path>)}
</svg>
```

这种方案显然费时费力且不易维护，一旦任何一个扇形区域的角度变化，数据就需要一起更新。

### 进阶方案（扇形角度）——实现步骤：

更加灵活的做法是参考 SVG 扇形路径的特点，根据角度、半径等数据计算得出对应的扇形路径。

#### 1. 定义轮盘数据类型

```js
interface SectorWheelProps {
  size: number;                // 圆的大小（直径）
  sectorData: SectorData[];    // 扇形数据数组
  startDeg?: number;           // 起始偏移角度，默认为270度（圆的竖直半径上半部分）
}
```

#### 2. 定义扇形数据类型

```js
interface SectorData {
  id: string | number;  // 扇形ID
  deg?: number;           // 扇形角度（默认均分）
  background-color?: string;        // 扇形颜色
}
```

#### 3. 计算扇形路径

```js
/**
 * 生成扇形的SVG路径
 * @param x 圆心X坐标
 * @param y 圆心Y坐标
 * @param radius 半径
 * @param startAngle 起始角度
 * @param endAngle 结束角度
 * @param strokeWidth 描边宽度
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
```

#### 4. 遍历新的数据绘制轮盘扇形

```js
<svg>
    {sectorData.map(item => <path key={item.id} d={item.path}></path>)}
</svg>
```

至此，一个可以交互的扇形轮盘就绘制好了。

# 三、扩展玩法

接下来对这个可以交互的扇形轮盘进行一些扩展：

### 1. 包含文字

{{TextSectorWheel}}

在组件中新增文字层，并旋转对应的角度。

```js
const getTextRotate = (startAngle,sector) => {
 return 'translate(-50%, -50%) rotate(' + deg/2 + startAngle + 'deg)'}
}
return {
  ...
  <div className='absolute top-0 left-0 width-100 height-100 events-none'>
    {sectors.map?.((sector, index) => <div key={sector.id??index} className='absolute-center width-100' style={{height: circumference*sector.deg/360,transform: getTextRotate(sector.startAngle,sector.deg),transformOrigin:'center'}}>{sector.component}</div>)}
  </div>    
  ...
}
```

### 2. 包含图片

{{ImageSectorWheel}}

在组件中新增图片 mask 层 SVG，对每个扇形进行图片贴图。

```js
<StyledRotarySvg
  width={size}
  height={size}
  viewBox={'0 0 ' + size+strokeWidth*2+ ' ' + 'size+strokeWidth*2'}
  style={{ 
    transform: 'translate(-50%,-50%) rotate('+rotation + 'deg)',
    transitionDuration: rotation%360*50 + 'ms',
  }}
  className='absolute-center events-none'
  >
  {sectors.map((maskSector, maskIndex) => (
    <Fragment key={maskSector.id??maskIndex}>
    <mask
        xmlns="http://www.w3.org/2000/svg"
        id={'eqq-home-rotary-circle-icons-white-' + maskIndex + 1'}
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
        mask={'url(#eqq-home-rotary-circle-icons-white-' + maskIndex + 1 + ')'}
        href={defaultImgUrl}
        x={strokeWidth}
        y={strokeWidth}
        width={size}
        height={size}
    />
    </Fragment>
  ))}
</StyledRotarySvg>
```

---

*本文完*
