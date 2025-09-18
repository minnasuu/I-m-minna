import getRandomRgbaColor from "../../../../utils/getRandomRgba";
import ArticleDesc from "../../components/ArticleDesc";
import ArticleLayout from "../../components/ArticleLayout";
import ArticlePartLayout from "../../components/ArticlePartLayout";
import ArticleSectionLayout from "../../components/ArticleSectionLayout";
import ArticleTitle from "../../components/ArticleTitle";
import SectorWheel from "./SectorWheel";
import ArticlePreface from "../../components/ArticlePreface";
import ArticleContentLayout from "../../components/ArticleContentLayout";
import ArticleCode from "../../components/ArticleCode";
import ArticleEndText from "../../components/ArticleEndText";

const codeStr1 = `interface SectorWheelProps {
    size: number;                // 圆的大小（直径）
    sectorData: SectorData[];    // 扇形数据数组
  }
  `;

const codeStr2 = `interface SectorData {
    id: string | number;  // 扇形ID
    path?: string;           // 扇形路径
    background-color?: string;        // 扇形颜色
  }
  `;

const codeStr3 = `interface SectorWheelProps {
  size: number;                // 圆的大小（直径）
  sectorData: SectorData[];    // 扇形数据数组
  startDeg?: number;           // 起始偏移角度，默认为270度（圆的竖直半径上半部分）
}
`;

const codeStr4 = `interface SectorData {
  id: string | number;  // 扇形ID
  deg?: number;           // 扇形角度（默认均分）
  background-color?: string;        // 扇形颜色
}
`;

const codeStr5 = `<svg>
    {data.map(item => <path key={item.id} d={item.path}></path>)}
</svg>
`;
const codeStr6 = `/**
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
`;

const codeStr7 = `<svg>
    {sectorData.map(item => <path key={item.id} d={item.path}></path>)}
</svg>
`;

const codeStr8 = `
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
`;

const codeStr9 = `<StyledRotarySvg
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
`;
export const svg_interactive_wheel = (
  <ArticleLayout>
    <ArticleSectionLayout>
      <ArticlePreface>
        在
        <a href="https://e.qq.com/" style={{ color: "#202020" }}>
          腾讯广告官网（e.qq.com）
        </a>
        的页面还原中，通过 SVG
        的方式实现了一个支持鼠标交互的轮盘，整个轮盘实现的主要有两个要点：
        <ul>
          <li>扇形的绘制与交互：通过 SVG 的 path 元素（路径）实现。</li>
          <li>
            扇形交互的过渡效果：内层与外层通过 transform 的 scale 依次扩散。
          </li>
        </ul>
        趁热打铁，以此为例，对需求中实现轮盘的过程进行封装与扩展，沉淀转盘相关页面的通用重构方案。
      </ArticlePreface>
      <ArticleTitle type={"h1"} title={"一、基础效果预览"} />
      <ArticlePartLayout>
        <div className="w-full flex justify-center">
          <SectorWheel
            size={400}
            sectorData={[
              ...Array.from({ length: 10 }).map((_i, idx) => ({
                deg: 36,
                id: `sector-${idx}`,
                color: getRandomRgbaColor(0.3),
              })),
            ]}
            startDeg={0}
            strokeWidth={2}
          />
        </div>
      </ArticlePartLayout>
    </ArticleSectionLayout>

    <ArticleSectionLayout>
      <ArticleTitle type={"h1"} title={"二、轮盘扇形分区如何实现？"} />
      <ArticlePartLayout>
        <ArticleTitle type={"h3"} title={"思路剖析："} />
        <ArticleDesc>
          首先，选择
          SVG实现轮盘的原因在于可交互性，使轮盘中的每个扇形都在当前特定的扇形区域内可以用鼠标交互。
        </ArticleDesc>
        <ArticleDesc>其次，明确轮盘需要定制化的地方：</ArticleDesc>
        <ArticleDesc>
          <ul>
            <li>扇形分区数量</li>
            <li>扇形角度</li>
            <li>从中心到外围的扇形层数</li>
            <li>跨层扇形的包含关系（类似于表格的“合并单元格”）</li>
            <li>每个扇形的颜色等样式</li>
            <li>每个扇形内部的内容——文字、图标、图片等</li>
            <li>扇形的交互效果</li>
          </ul>
        </ArticleDesc>
        <ArticleDesc>
          这样看来，似乎是一个非常非常复杂的组件，且！这样的组件是没有在网页上出现过的。所以层层效果都需要思考应该如何实现，还要保证最终的实现方式是容易维护的。
        </ArticleDesc>
      </ArticlePartLayout>

      <ArticlePartLayout>
        <ArticleTitle type={"h3"} title={"基础方案（扇形路径）——实现步骤："} />
        <ArticleDesc>
          首先能想到一个很简单的基础方案，将设计稿中的扇形轮盘对应的扇形路径整理成数据直接使用。
        </ArticleDesc>
        <ArticleTitle type={"h4"} title={"1. 定义轮盘数据类型"} />
        <ArticleCode language="js" codeStr={codeStr1} />
        <ArticleTitle type={"h4"} title={"2. 定义扇形数据类型"} />
        <ArticleCode language="js" codeStr={codeStr2} />
        <ArticleTitle type={"h4"} title={"3. 遍历数据绘制轮盘扇形"} />
        <ArticleCode language="js" codeStr={codeStr5} />
        <ArticleDesc>
          这种方案显然费时费力且不易维护，一旦任何一个扇形区域的角度变化，数据就需要一起更新。
        </ArticleDesc>
      </ArticlePartLayout>

      <ArticlePartLayout>
        <ArticleTitle type={"h3"} title={"进阶方案（扇形角度）——实现步骤："} />
        <ArticleDesc>
          更加灵活的做法是参考svg扇形路径的特点，根据角度、半径等数据计算得出对应的扇形路径。
        </ArticleDesc>
        <ArticleTitle type={"h4"} title={"1. 定义轮盘数据类型"} />
        <ArticleCode language="js" codeStr={codeStr3} />
        <ArticleTitle type={"h4"} title={"2. 定义扇形数据类型"} />
        <ArticleCode language="js" codeStr={codeStr4} />
        <ArticleTitle type={"h4"} title={"3. 计算扇形路径"} />
        <ArticleCode language="js" codeStr={codeStr6} />
        <ArticleTitle type={"h4"} title={"4. 遍历新的数据绘制轮盘扇形"} />
        <ArticleCode language="js" codeStr={codeStr7} />
      </ArticlePartLayout>
      <ArticleDesc>至此，一个可以交互的扇形轮盘就绘制好了。</ArticleDesc>
    </ArticleSectionLayout>

    <ArticleSectionLayout>
      <ArticleTitle type={"h1"} title={"三、扩展玩法"} />
      <ArticleDesc>
        接下来对这个可以交互交互的扇形轮盘进行一些扩展：
      </ArticleDesc>
      <ArticlePartLayout>
        <ArticleContentLayout>
          <ArticleTitle type={"h3"} title={"1. 包含文字"} />
          <SectorWheel
            size={400}
            sectorData={[
              ...Array.from({ length: 10 }).map((_i, idx) => ({
                deg: 36,
                id: `sector-${idx}`,
                color: getRandomRgbaColor(0.3),
                component: (
                  <div
                    className="flex items-center w-full h-full color-gray-3 font-bold"
                    style={{ paddingLeft: "24px" }}
                  >
                    {idx + 1}
                  </div>
                ),
              })),
            ]}
            startDeg={0}
            strokeWidth={2}
            style={{ margin: "20px auto" }}
          />
          <ArticleDesc>在组件中新增文字层，并旋转对应的角度。</ArticleDesc>
          <ArticleCode language="js" codeStr={codeStr8} />
        </ArticleContentLayout>

        <ArticleContentLayout>
          <ArticleTitle type={"h3"} title={"2. 包含图片"} />
          <SectorWheel
            size={400}
            sectorData={[
              ...[47.5, 66, 23, 23, 23, 23, 23.5, 32.5, 98.5].map((i, idx) => ({
                deg: i,
                id: `sector-${idx + 1}`,
                color: getRandomRgbaColor(0.1),
              })),
            ]}
            strokeWidth={2}
            startDeg={-72}
            style={{ margin: "20px auto" }}
            defaultImgUrl="https://qzonestyle.gdtimg.com/gdt_ui_proj/imghub/dist/eqq-home-rotary-circle-icons-full-new-0324.png?max_age=31536000"
          />
          <ArticleDesc>
            在组件中新增图片mask层svg，对每个扇形进行图片贴图。
          </ArticleDesc>
          <ArticleCode language="js" codeStr={codeStr9} />
        </ArticleContentLayout>
      </ArticlePartLayout>
    </ArticleSectionLayout>
    <ArticleEndText />
  </ArticleLayout>
);
