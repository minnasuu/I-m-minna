import ArticleTitle from "../components/ArticleTitle.tsx";
import ArticleSectionLayout from "../components/ArticleSectionLayout.tsx";
import ArticlePartLayout from "../components/ArticlePartLayout.tsx";
import ArticleDesc from "../components/ArticleDesc.tsx";
import ArticleLayout from "../components/ArticleLayout.tsx";
import ArticleImage from "../components/ArticleImage.tsx";
import ArticleContentLayout from "../components/ArticleContentLayout.tsx";
import ArticleCode from "../components/ArticleCode.tsx";
import ArticleEndText from "../components/ArticleEndText.tsx";

const codeStr1 = `
    // 设置暗色模式
document.documentElement.setAttribute('theme-mode', 'dark');
// 重置为浅色模式
document.documentElement.removeAttribute('theme-mode');
`

const codeStr2 = `
    <ConfigProvider
    theme={{
      token: {
        // Seed Token，影响范围大
        colorPrimary: '#00b96b',
        borderRadius: 2,

        // 派生变量，影响范围小
        colorBgContainer: '#f6ffed',
      },
    }}
  >
    <Space>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
    </Space>
  </ConfigProvider>
`

const codeStr3 = `
    <ConfigProvider
    theme={{
      darkAlgorithm: darkAlgorithm,
    }}
  >
    ...
  </ConfigProvider>
`

const codeStr4 = `:root {
  --color-primary-6: #1677FF;
  --color-bg-container: #fff;
}
`

const codeStr5 = `:root {
    --color-primary-6: #177ddc;
    --color-bg-container: #001529;
  }
  `

  const codeStr6 = `:root {
    color: var(--color-primary-6, #177ddc);
    background-color: var(--color-bg-container, #fff);
  }
  `

  const codeStr7 = `<ConfigProvider
    style={{
        --color-primary-6: #177ddc;
        --color-bg-container: #001529;
    }}
/>
  `
export const dark_mode_and_adaptation = (
  <ArticleLayout>
    <ArticleSectionLayout>
      <ArticlePartLayout>
        <ArticleTitle type={"h1"} title={"一. 什么是深色模式？"} />
        <ArticleContentLayout>
          <ArticleDesc>
            深色模式（Dark Mode）也叫做作暗黑模式，是一种低光用户界面（low-light
            UI）。深色模式可降低设备屏幕发出的亮度，同时满足最低色彩对比度，具有一定用处：
            <ul>
              <li>有助于改善视觉人体工程学，减少眼睛疲劳</li>
              <li>方便在黑暗环境中使用屏幕</li>
              <li>节省电池电量</li>
            </ul>
          </ArticleDesc>
          <ArticleDesc>
            例如，
            <a
              className="text-16"
              href={"https://support.apple.com/zh-cn/108350"}
            >
              在 iPhone 或 iPad 中切换深色模式
            </a>
            体验深色模式的效果。
          </ArticleDesc>
          <ArticleImage
            url={
              "https://cdsassets.apple.com/live/7WUAS350/images/ios/locale/zh-cn/ios-17-iphone-15-pro-settings-control-center.gif"
            }
          />
        </ArticleContentLayout>
      </ArticlePartLayout>
      <ArticlePartLayout>
        <ArticleTitle type={"h1"} title={"二. 深色模式的兴起与发展"} />
        <ArticleContentLayout>
          <ArticleDesc>
            深色模式的概念最早可以追溯到早期的计算机界面设计。在图形用户界面（GUI）出现之前，命令行界面普遍采用浅色文字配深色背景的显示方式。随着Web技术的发展，受印刷品设计影响，白底黑字成为网页设计的主流。
          </ArticleDesc>
          <ArticleDesc noIndent>深色模式的回归背景:</ArticleDesc>
          <ArticleDesc>
            <ul>
              <li>
                CSS3的成熟使得样式定制更加灵活，CSS变量（Custom
                Properties）的引入为主题切换提供了技术基础。
              </li>
              <li>JavaScript引擎性能的提升，使得实时主题切换成为可能。</li>
              <li>
                现代显示技术的发展，特别是OLED屏幕的普及，凸显了深色模式在节能方面的优势。
              </li>
              <li>
                随着移动设备使用时间的增加，用户对夜间浏览体验的要求不断提高,用户需求的转变推动了深色模式的普及。
              </li>
              <li>
                系统级深色模式的支持（如macOS的Dark
                Mode和Windows的夜间模式），也促使网页开发者必须考虑深色模式的实现。
              </li>
            </ul>
          </ArticleDesc>
        </ArticleContentLayout>
      </ArticlePartLayout>

      <ArticlePartLayout>
        <ArticleTitle type={"h1"} title={"三. 一些深色模式规范"} />
        <ArticleContentLayout>
          <ArticleTitle type={"h2"} title={"1. TDesign"} />
          <ArticleDesc>
            <a href="https://tdesign.tencent.com/design/dark">
              TDesign的深色模式
            </a>
            也叫 Dark
            Mode（暗黑模式）——暗黑模式是一种夜间友好的颜色主题，主要侧重于UI界面中每个元素可读性所需的最小色彩对比度，以保证出色的阅读体验。
          </ArticleDesc>
          <ArticleImage url="https://static.tdesign.tencent.com/assets/starter-UABtSUhJ.png" />
          <ArticleTitle type="h3" title="设计原则：" />
          <ArticleDesc>
            <ul>
              <li>内容优先：优先保证内容的识别度，确保文本内容易于阅读。</li>
              <li>
                阅读舒适度：使用低饱和度或稍微柔和的颜色会减少人眼的视觉疲劳。
              </li>
              <li>
                信息层级一致性：浅色模式和深色模式下转换时应该保持信息层级一致性。
              </li>
              <li>
                符合 WCAG2.0 标准：依据 WCAG2.0
                设计标准，文本的视觉呈现以及文本图像至少要有 1:4.5 的对比度。
              </li>
            </ul>
          </ArticleDesc>
          <ArticleTitle type="h3" title="配置方式：" />
          <ArticleDesc>
            给 <span className="highlight">html</span> 增加{" "}
            <span className="highlight">theme-mode</span>{" "}
            属性来控制浅色/暗色展示：
          </ArticleDesc>
          <ArticleCode language="js" codeStr={codeStr1} />
          <ArticleTitle type="h3" title="实现原理：" />
          <ArticleDesc>css variables（自定义属性）</ArticleDesc>
        </ArticleContentLayout>

        <ArticleContentLayout>
          <ArticleTitle type={"h2"} title={"2. Ant Design"} />
          <ArticleDesc>
            <a href="https://ant.design/docs/spec/dark-cn">
              Ant Design 的暗黑模式
            </a>
            ——把所有 UI 换成黑色或者深色的一个主题模式。对此，Ant
            Design给出了两种使用场景：
          </ArticleDesc>
          <ArticleDesc>
            <ul>
              <li>
                当需要<span className="bold">长时间在暗光环境下工作</span>
                时，建议使用暗黑模式，减小亮度对比带来的视觉压力，保证使用者的体验舒适。
              </li>
              <li>
                当需要<span className="bold">沉浸式的专注工作内容</span>
                时，建议使用暗黑模式，可以帮助使用者更关注凸显出来的内容和操作。
              </li>
            </ul>
          </ArticleDesc>
          <ArticleTitle type="h3" title="设计原则：" />
          <ArticleDesc>
            <ul>
              <li>
                内容的舒适性：避免使用对比很强的色彩或内容，长时间使用会带来疲劳感。
              </li>
              <li>
                信息的一致性：暗黑模式下的信息内容需要和浅色模式保持一致性，不应该打破原有的层级关系。
              </li>
            </ul>
          </ArticleDesc>
          <ArticleTitle type="h3" title="实现原理：" />
          <ArticleDesc>
            Ant
            Design将暗黑模式是作为众多主题模式中的一种，因为实现的原理是相同的。
          </ArticleDesc>
          <ArticleImage url="/articles/articles2025-1-2-1.png" />
          <ArticleTitle type="h3" title="配置方式：" />
          <ArticleDesc>
            Ant Design 深色模式的配置方式和配置其他主题模式一样，通过修改 Design
            Token来呈现不同的主题。这种方式使得 And Design的主题配置非常灵活。
          </ArticleDesc>
          <ArticleDesc>
            <ul>
              <li>支持动态切换主题;</li>
              <li>支持同时存在多个主题；</li>
              <li>支持针对某个/某些组件修改主题变量；</li>
            </ul>
          </ArticleDesc>
          <ArticleTitle type="h4" title="方式1：修改主题变量" />
          <ArticleCode language="js" codeStr={codeStr2} />
          <ArticleTitle
            type="h4"
            title="方式2：使用预设的暗色算法——theme.darkAlgorithm"
          />
          <ArticleCode language="js" codeStr={codeStr3} />
          <ArticleTitle type="h3" title="实现原理" />
          <ArticleDesc>CSS-in-JS</ArticleDesc>
        </ArticleContentLayout>

        <ArticleContentLayout>
          <ArticleTitle type={"h2"} title={"3. Apple Developer"} />
          <ArticleDesc>
            <a href="https://developer.apple.com/cn/design/human-interface-guidelines/dark-mode">
              Apple Developer对深色模式的定义
            </a>
            是——深色模式是一种系统范围的外观设置，使用深色调色盘为低光环境提供舒适的浏览体验。
          </ArticleDesc>
          <ArticleTitle type="h3" title="设计原则（最佳实践）：" />
          <ArticleDesc>
            <ul>
              <li>避免提供 App 特定的外观设置</li>
              <li>确保 App 在两种外观模式下都能很好地呈现</li>
              <li>测试你的内容以确保在两种外观模式下都能保持舒适易读</li>
              <li>
                在极少数情况下，可以考虑在界面中只使用深色外观（例如股票面板）
              </li>
              <li>
                颜色原则：
                <ul>
                  <li>包含适合当前外观的颜色。</li>
                  <li>
                    力求所有外观都有足够的颜色对比度：至少要确保颜色之间的对比度不低于
                    4.5:1。对于自定义前景色和背景色，应尽量将对比度设为
                    7:1，尤其是在小文本中。
                  </li>
                  <li>
                    柔化白色背景的颜色：如果显示的内容图像包含白色背景，应考虑略微调暗图像，以防止背景在周围的深色模式环境中发光。
                  </li>
                </ul>
              </li>
              <li>
                颜色原则：
                <ul>
                  <li>尽可能使用 SF 符号（使用动态颜色来着色）</li>
                  <li>如有必要，为浅色和深色外观设计单独的界面图标。</li>
                  <li>确保全彩图像和图标在两种外观中都有良好的效果。</li>
                </ul>
              </li>
            </ul>
            <ArticleImage
              url="/articles/articles2025-1-2-2.png"
              imgStyle={{ width: "70%" }}
            />
          </ArticleDesc>
        </ArticleContentLayout>
      </ArticlePartLayout>

      <ArticlePartLayout>
        <ArticleTitle type={"h1"} title={"四. 网页开发中如何适配深色模式？"} />
        <ArticleDesc>
          结合上述 TDesign 和 And Design
          对深色模式的实现方案，可以得到网页开发中最常见的两种适配方案——
          <span className="bold">CSS变量</span>和
          <span className="bold">CSS-in-JS</span>。
        </ArticleDesc>
        <ArticleDesc>
          这两种方案的原理其实是相同的，核心在于将涉及到深色模式的css属性用变量赋值，再在不同模式中去改变这些变量。
        </ArticleDesc>
        <ArticleContentLayout>
          <ArticleTitle type={"h3"} title={"方案一：CSS 变量"} />
          <ArticleDesc>
            首先，假设我们在项目中定义了一组主题样式变量：
          </ArticleDesc>
          <ArticleCode language="css" codeStr={codeStr4} />
          <ArticleDesc>
            当开启深色模式后，需要在更高的优先级将变量的值更新：
          </ArticleDesc>
          <ArticleCode language="css" codeStr={codeStr5} />
        </ArticleContentLayout>

        <ArticleContentLayout>
          <ArticleTitle type={"h3"} title={"方案二：CSS-in-JS"} />
          <ArticleDesc>
            首先，假设我们在项目中实现样式时引用了css变量：
          </ArticleDesc>
          <ArticleCode language="css" codeStr={codeStr6} />
          <ArticleDesc>
            当开启深色模式后，需要将对应的css变量重新赋值：
          </ArticleDesc>
          <ArticleCode language="js" codeStr={codeStr7} />
        </ArticleContentLayout>
      </ArticlePartLayout>
    </ArticleSectionLayout>
    <ArticleEndText />
  </ArticleLayout>
);