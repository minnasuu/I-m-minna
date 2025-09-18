import ArticleSectionLayout from "../../components/ArticleSectionLayout.tsx";
import ArticlePartLayout from "../../components/ArticlePartLayout.tsx";
import ArticleDesc from "../../components/ArticleDesc.tsx";
import ArticleTitle from "../../components/ArticleTitle.tsx";
import ArticleLayout from "../../components/ArticleLayout.tsx";
import ArticleImage from "../../components/ArticleImage.tsx";
import Animation1 from "./Animation1.tsx";
import Animation2 from "./Animation2.tsx";
import Animation3 from "./Animation3.tsx";
import Animation4 from "./Animation4.tsx";
import ArticleEndText from "../../components/ArticleEndText.tsx";

export const css_implementation_of_morphing_animation = (
  <ArticleLayout>
    <ArticleSectionLayout>
      <ArticlePartLayout>
        <ArticleTitle type={"h2"} title={"一. 什么是 Morph 变形动画"} />
        <ArticleDesc>
          变形动画（Morphing
          Animation）是一种使元素在不同形状之间平滑过渡的视觉效果，广泛应用于UI交互、数据可视化和动态图形设计，常见于按钮状态切换、图标变换、加载动画等场景。传统实现方式依赖
          JavaScript 或 Flash，现在 CSS 提供了多种方式实现变形动画，包括
          transition、clip-path、SVG等技术。
        </ArticleDesc>
        <ArticleDesc>
          <ul>
            <li>transition + border-radius（基础变形）</li>
            <li>clip-path 路径裁剪（复杂形状变换）</li>
            <li>{`SVG < path > 变形（矢量图形动画）`}</li>
          </ul>
        </ArticleDesc>
      </ArticlePartLayout>
      <ArticlePartLayout>
        <ArticleTitle
          type={"h2"}
          title={"二. CSS 实现 Morph 变形动画的几种方案"}
        />
        <ArticleTitle
          type={"h3"}
          title={"1.1. 基础变形：transition 与 border-radius"}
        />
        <ArticleDesc>
          最简单的变形动画可通过 CSS transition 结合 border-radius
          实现，适用于圆形、圆角矩形等基本形状的过渡。
        </ArticleDesc>
        <ArticleDesc>
          <div className={"flex items-center justify-center w-full h-[200px]"}>
            <Animation1 />
          </div>
        </ArticleDesc>
        <ArticleTitle type={"h3"} title={"1.2. 高级变形：clip-path 路径裁剪"} />
        <ArticleDesc>
          CSS 属性 clip-path
          使用裁剪方式创建元素的可显示区域，区域内的部分显示，区域外的隐藏。clip-path
          支持多边形和更加复杂的 svg 图形。
        </ArticleDesc>
        <ArticleDesc>
          <ul>
            <li>
              <span className={"bold"}>basic-shape</span>: 定义裁切形状
              <ul>
                <li>
                  inset():
                  定义一个矩形，规定位于参考框的每一边内侧的指定的距离，例如inset(10%)。
                </li>
                <li>
                  circle():
                  定义一个圆形，使用半径和圆心位置来描述，默认居中，例如circle(6rem
                  at right center)
                </li>
                <li>
                  ellipse():
                  定义一个椭圆，使用两个半径和一个圆心位置来描述，例如ellipse(20px
                  50px)
                </li>
                <li>
                  polygon(): 定义一个多边形，使用一个 SVG
                  填充规则和一组顶点来描述。
                </li>
                <li>
                  path(): 定义一个任意形状，使用一个可选的 SVG 填充规则和一个
                  SVG 路径定义。
                </li>
              </ul>
            </li>
            <li>
              <span className={"bold"}>geometry-box</span>: 定义裁切参考盒子
              <ul>
                <li>margin-box</li>
                <li>border-box</li>
                <li>padding-box</li>
                <li>content-box</li>
                <li>fill-box</li>
                <li>stroke-box</li>
                <li>view-box: 使用最近的 SVG 视口（viewport）作为引用框。</li>
              </ul>
            </li>
          </ul>
        </ArticleDesc>
        <ArticleDesc>
          <div className={"flex items-center justify-center w-full h-[200px]"}>
            <Animation2 />
          </div>
        </ArticleDesc>
        <ArticleTitle type={"h3"} title={`1.3. SVG <path> 变形动画`} />
        <ArticleDesc>{`SVG 的 <path> 元素支持 d 属性动态变化，可定义初始和结束路径实现更流畅的矢量图形变形。效果等同于在 clip-path 中使用 svg 图形。`}</ArticleDesc>
        <ArticleDesc>
          <div className={"flex items-center justify-center w-full h-[200px]"}>
            <Animation3 className="scale-400" />
          </div>
        </ArticleDesc>
      </ArticlePartLayout>
      <ArticlePartLayout>
        <ArticleTitle type={"h2"} title={"三. 路径类型 Morph 变形动画的关键"} />
        <ArticleDesc>
          Morph
          动画是从一个图形逐渐变化到另一个图形，本质是图形的点与线在移动变化，两个图形能够互相过渡必须具备以下条件：
          <ul>
            <li>点数相同</li>
            <li>起点与终点相同，方向相同</li>
            <li>
              两点之间的路径相同（例如都为贝塞尔曲线或都为直线，对应代码中形同的绘制方式——L、H、C、Q）
            </li>
          </ul>
        </ArticleDesc>
        <ArticleImage
          url={"/articles/articles2025-2-22-1.png"}
          imgStyle={{ width: "300px" }}
        ></ArticleImage>
        <ArticleDesc>
          通常，在实现变形动画时拿到的两个图形并不满足以上两个条件，而是满足最少点数的原则，为了让两个图形实现变形效果，就需要手动将两个图形的点、线进行重绘，以满足变形动画的条件。
        </ArticleDesc>
        <ArticleDesc>
          下面列举手动重绘的几种方式，实现调整点数与方向、直线转曲线：
          <ul>
            <li>
              figma + 插件 fill rule Editor
              <ArticleImage
                url={"/articles/articles2025-2-22-2.png"}
              ></ArticleImage>
            </li>
            <li>Illustrator</li>
          </ul>
        </ArticleDesc>
        <ArticleDesc>
          转换之后将两个图形的 path 路径作为初始路径和结束路径，即可实现丝滑的
          morph 变形动画。
        </ArticleDesc>
        <ArticleDesc>
          <div className={"w-full h-[200px] flex items-center justify-center"}>
            <Animation4 />
          </div>
        </ArticleDesc>
      </ArticlePartLayout>
    </ArticleSectionLayout>
    <ArticleEndText />
  </ArticleLayout>
);

export default css_implementation_of_morphing_animation;