import ArticleLayout from "../../components/ArticleLayout.tsx";
import ArticleSectionLayout from "../../components/ArticleSectionLayout.tsx";
import ArticlePartLayout from "../../components/ArticlePartLayout.tsx";
import ArticleDesc from "../../components/ArticleDesc.tsx";
import ArticleList from "../../components/ArticleList.tsx";
import ArticleTable from "../../components/ArticleTable.tsx";
import ArticleTitle from "../../components/ArticleTitle.tsx";
import AgentScroller1 from "./AgentScroller1.tsx";
import AgentScroller2 from "./AgentScroller2.tsx";
import AgentScroller3 from "./AgentScroller3.tsx";
import AgentScroller4 from "./AgentScroller4.tsx";
import ArticleCode from "../../components/ArticleCode.tsx";
import AgentScroller5 from "./AgentScroller5.tsx";
import HistoryScrollerDemo1 from "./HistoryScroller/HistoryScrollerDemo1.tsx";
import HistoryScrollerDemo2 from "./HistoryScroller/HistoryScrollerDemo2.tsx";
import ArticleImage from "../../components/ArticleImage.tsx";
import HistoryScroller1 from "./HistoryScroller/HistoryScroller1.tsx";
import HistoryScroller2 from "./HistoryScroller/HistoryScroller2.tsx";
import HistoryScroller3 from "./HistoryScroller/HistoryScroller3.tsx";
import FixScroller1 from "./FixScroller/FixScroller1.tsx";
import BlinkOutput from "./BlinkOutput.tsx";
import ArticleEndText from "../../components/ArticleEndText.tsx";

const codeString = `
.scroll-container {
  height: fit-content;
  max-height: 100%;
}
  `;

const codeString1 = `
.scroll-container {
  height: 100%;
  transform: rotate(180deg);
  overflow: auto;
}
.scroll-container .scroll-content{
  transform: rotate(180deg);
}
  `;

const codeString2 = `
.scroll-container {
  height: 100%;
  transform: rotate(180deg) scaleX(-1);
  overflow: auto;
}
.scroll-container .scroll-content{
  transform: rotate(180deg) scaleX(-1);
}
  `;

const codeString3 = `
.scroll-container {
  height: 100%;
  transform: rotate(180deg);
  overflow: auto;
  direction: rtl;
}
.scroll-container .scroll-content{
  direction: ltr;
}
  `;

const codeString4 = `
.scroll-container {
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
}
  `;

const codeString5 = `
    useEffect(() => {
        if (!loadingRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    // 加载历史数据
                }
            },
            { threshold: 1.0 } // 当目标元素完全可见时触发
        );
        
        observer.observe(loadingRef.current);
        
        return () => {
                observer.disconnect();
        };
    }, [loading, data]);
`

const codeString6 = `
const height = contentRef.current?.offsetHeight || 0;
const handleClick = () => {
    if(!scrollRef.current||!contentRef.current)return;
    const scroller = scrollRef.current;
    const scrollPosition = scroller?.scrollTop || 0;
    if(open){
      setTimeout(() => {
          setOpen(false);
          requestAnimationFrame(() => {
              scroller.scrollTop = scrollPosition + height;
          });
      }, 50);
    }else{
      setTimeout(() => {
        setOpen(true);
        requestAnimationFrame(() => {
            scroller.scrollTop = scrollPosition - height;
        });
      }, 50);
    } 
}
`

const codeString7 = `
useEffect(() => {
  if (currentIndex >= content.length) {
    if (!isCompleted.current) {
      isCompleted.current = true;
      setLoading(false);
    }
    return;
  }

  // 开始逐字输出
  const timeoutId = setTimeout(() => {
    // 优先保证段落完整性，如果遇到换行符则一次性输出整个段落
    const nextNewline = content.indexOf('\n\n', currentIndex);
    const chunkSize = nextNewline !== -1 && nextNewline - currentIndex < 50
      ? nextNewline - currentIndex + 2
      : 1;

    setDisplayContent(prev => prev + content.slice(currentIndex, currentIndex + chunkSize));
    setCurrentIndex(prev => prev + chunkSize);
  }, 30); // 控制输出速度

  return () => clearTimeout(timeoutId);
}, [currentIndex]);
  `

const codeString8 = `
{/* 闪烁光标效果 */}
{!isCompleted.current && (<span
    style={{
      display: 'inline-block',
      width: 2,
      height: '1.2em',
      backgroundColor: 'var(--color-text-3)',
      animation: 'blink .6s step-end infinite',
      marginLeft: 0,
      verticalAlign: 'middle'
    }}
/>
)}
`
const codeString9 = `
@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
`

export const build_a_smooth_ai_chat_layout = (
  <ArticleLayout>
    <ArticleSectionLayout>
      <ArticlePartLayout>
        <ArticleTitle
          type={"h1"}
          title={"前言：Agent UI 对话式布局有哪些特点？"}
        />
        <ArticleDesc>
          截止今日，我已经在两个 AI 产品中接触到了对话式的布局，和目前大多数 AI
          产品一样，在用户输入与结果输出的这场交流中，我们的产品也选择了对话式的交互形式，像与朋友聊天的回复一般，将生成结果发送到用户眼前。本篇文章的重点是想全面系统地探索与一下
          AI 产品的对话式布局，这里有就两个关键词，AI和对话式布局。
        </ArticleDesc>
        <ArticleDesc>
          对话式布局广泛应用在绝大部分的聊天软件中，通常具备一下特点（感谢 DS
          倾情助力）：
        </ArticleDesc>
        <ArticleDesc
          useBg
          toggle
          toggleTitle="聊天软件的对话式布局特点（展开查看详情）"
        >
          <ArticleList
            ordered
            list={[
              <>
                <span className={"bold"}>核心布局结构</span>
                <ArticleList
                  list={[
                    <>
                      <span className={"bold"}>三分区垂直布局</span>
                      <ArticleList
                        list={[
                          "消息展示区（顶部80%屏幕)：历史消息气泡流",
                          "输入操作区（底部固定栏）：文本输入+功能扩展按钮",
                          "状态提示区（顶部/底部边缘）：对方输入状态、网络状态、时间戳",
                        ]}
                      />
                    </>,
                    <>
                      <span className={"bold"}>双向消息流</span>
                      <ArticleList
                        list={[
                          "用户消息右对齐",
                          "对方消息左对齐",
                          '时间中线分割：重要时间节点显示（如"昨天 15:30"）',
                        ]}
                      />
                    </>,
                  ]}
                />
              </>,
              <>
                <span className={"bold"}>消息呈现设计</span>
                <ArticleList
                  list={[
                    <>
                      <span className={"bold"}>智能气泡系统</span>
                      <ArticleList
                        list={[
                          "自适应宽度",
                          "统一处理图片/视频/文件多媒体容器",
                          "状态标识系统：✅发送成功 → ✅✅已送达 → ✅✅✅已读",
                        ]}
                      />
                    </>,
                    <>
                      <span className={"bold"}>上下文关联设计</span>
                      <ArticleList
                        list={[
                          "引用回复：嵌套显示原始消息片段",
                          "消息菜单：长按触发删除/转发/收藏等操作",
                        ]}
                      />
                    </>,
                  ]}
                />
              </>,
              <>
                <span className={"bold"}>输入交互体系</span>
                <ArticleList
                  list={[
                    <>
                      <span className={"bold"}>多模态输入扩展</span>
                      <ArticleList
                        list={["自适应高度输入框", "附件菜单", "快捷操作按钮"]}
                      />
                    </>,
                    <>
                      <span className={"bold"}>智能输入反馈</span>
                      <ArticleList
                        list={[
                          "@提及高亮：自动匹配联系人列表",
                          '输入状态同步："对方正在输入..."实时提示',
                          "内容预解析：URL自动转链接预览",
                        ]}
                      />
                    </>,
                  ]}
                />
              </>,
              <>
                <span className={"bold"}>滚动与加载优化</span>
                <ArticleList
                  list={[
                    <>
                      <span className={"bold"}>消息导航机制</span>
                      <ArticleList
                        list={[
                          "自动锚定：新消息到达时锁定底部位置",
                          '加载更多历史：向上滚动触发分页加载（显示"加载中..."提示）',
                          "跳转定位：点击未读消息标识快速定位",
                        ]}
                      />
                    </>,
                    <>
                      <span className={"bold"}>性能优化策略</span>
                      <ArticleList
                        list={[
                          "虚拟化列表：使用react-window/vue-virtual-scroller处理长列表",
                          "差异更新：仅渲染可视区域变化部分",
                          "资源懒加载：图片/视频滚动到视口时开始加载",
                        ]}
                      />
                    </>,
                  ]}
                />
              </>,
              <>
                <span className={"bold"}>状态可视化设计</span>
                <ArticleList
                  list={[
                    <ArticleTable>
                      <thead>
                        <tr>
                          <th>状态类型</th>
                          <th>视觉表现</th>
                          <th>交互反馈</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>发送中</td>
                          <td>气泡尾部旋转loading图标</td>
                          <td>可取消发送</td>
                        </tr>
                        <tr>
                          <td>发送失败</td>
                          <td>红色感叹号+重试按钮</td>
                          <td>点击自动重发</td>
                        </tr>
                        <tr>
                          <td>已读状态</td>
                          <td>显示已读，消息底部显示接收者头像微缩图 </td>
                          <td>点击查看已读详细名单</td>
                        </tr>
                        <tr>
                          <td>撤回通知 </td>
                          <td>灰色系统提示"某消息已撤回"</td>
                          <td>长按显示撤回前内容快照</td>
                        </tr>
                      </tbody>
                    </ArticleTable>,
                  ]}
                />
              </>,
              <>
                <span className={"bold"}>多端适配方案</span>
                <ArticleList
                  list={[
                    <span className={"bold"}>响应式适配</span>,
                    <>
                      <span className={"bold"}>跨平台一致性策略</span>
                      <ArticleList
                        list={[
                          "iOS/Android差异处理：遵循各自平台规范（如iOS右滑返回）",
                          "Web/桌面端增强：支持快捷键（Ctrl+Enter发送）",
                          "多窗口协同：手机扫码登录后的状态同步",
                        ]}
                      />
                    </>,
                  ]}
                />
              </>,
              <>
                <span className={"bold"}>特色交互模式</span>
                <ArticleList
                  list={[
                    <>
                      <span className={"bold"}>情景化交互</span>
                      <ArticleList
                        list={[
                          "语音消息进度拖拽：滑动调整播放位置",
                          "消息翻译切换：长按切换多语言显示",
                          "红包特效：特殊动效+点击展开",
                        ]}
                      />
                    </>,
                    <>
                      <span className={"bold"}>无障碍设计</span>
                      <ArticleList
                        list={[
                          "屏幕阅读器适配：为图片消息添加alt文本描述",
                          "高对比度模式：确保色盲用户可辨识消息状态",
                          "触控热区优化：按钮最小48×48px点击区域",
                        ]}
                      />
                    </>,
                  ]}
                />
              </>,
              <>
                <span className={"bold"}>安全隐私设计</span>
                <ArticleList
                  list={[
                    <>
                      <span className={"bold"}>敏感内容防护</span>
                      <ArticleList
                        list={[
                          "模糊预览：未知链接/文件显示安全警告",
                          "阅后即焚：倒计时销毁敏感消息",
                          "截屏检测：金融类对话禁止截屏（Android）",
                        ]}
                      />
                    </>,
                    <>
                      <span className={"bold"}>认证可视化</span>
                      <ArticleList
                        list={[
                          "加密会话标识：端到端加密聊天显示锁形图标",
                          "设备指纹：新设备登录时显示机型标识",
                        ]}
                      />
                    </>,
                  ]}
                />
              </>,
            ]}
          />
        </ArticleDesc>
        <ArticleDesc>
          AI
          产品正是借鉴了我们与朋友聊天的方式，采用了这种布局方式，也自然而然地具备了上述的很多特点，结合
          AI 产品本身的特点，这些相似之处可以总结如下：
        </ArticleDesc>
        <ArticleDesc>
          <ArticleList
            ordered
            list={[
              <>
                <span className={"bold"}>核心对话结构</span>
                <ArticleList
                  list={[
                    <>
                      <span className={"bold"}>消息流布局：</span>
                      均采用垂直排列的对话气泡，用户输入右对齐，系统/对方回复左对齐
                    </>,
                    <>
                      <span className={"bold"}>时序展示：</span>
                      通过时间戳或上下文分割线（如“新对话开始”）维护对话时序
                    </>,
                    <>
                      <span className={"bold"}>滚动锚定：</span>
                      新消息到达时自动滚动到底部（如GPT的持续生成场景）
                    </>,
                  ]}
                />
              </>,
              <>
                <span className={"bold"}>基础交互模式</span>
                <ArticleList
                  list={[
                    <>
                      <span className={"bold"}>输入反馈：</span>
                      显示“对方正在输入”状态（如DeepSeek的生成指示符）
                    </>,
                    <>
                      <span className={"bold"}>消息操作：</span>
                      支持复制、删除、重新生成
                    </>,
                    <>
                      <span className={"bold"}>多模态支持：</span>
                      均可处理文本/代码/图片
                    </>,
                  ]}
                />
              </>,
              <>
                <span className={"bold"}>状态可视化</span>
                <ArticleList
                  list={[
                    <>
                      <span className={"bold"}>网络状态提示：</span>
                      均显示连接状态（如断线重连提示）
                    </>,
                    <>
                      <span className={"bold"}>操作反馈：</span>
                      发送成功/失败的状态标识（如错误消息的红色警示）
                    </>,
                  ]}
                />
              </>,
            ]}
          />
        </ArticleDesc>
        <ArticleDesc>
          但是当聊天的那位朋友变成 AI 时，这种对话式布局也会自然会产生一些差异：
        </ArticleDesc>
        <ArticleDesc>
          <ArticleList
            ordered
            list={[
              <>
                <span className={"bold"}>信息结构差异</span>
                <ArticleList
                  list={[
                    <ArticleTable>
                      <thead>
                        <tr>
                          <th>维度</th>
                          <th>AI 对话界面</th>
                          <th>聊天软件</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className={"bold"}>消息主体</td>
                          <td>单用户 vs 系统AI</td>
                          <td>单用户或多用户社交网络</td>
                        </tr>
                        <tr>
                          <td className={"bold"}>内容类型</td>
                          <td>侧重知识/代码（Markdown高亮）</td>
                          <td>侧重社交内容（图片/视频/红包）</td>
                        </tr>
                        <tr>
                          <td className={"bold"}>消息密度</td>
                          <td>长文本段落为主</td>
                          <td>短消息+碎片化交流</td>
                        </tr>
                      </tbody>
                    </ArticleTable>,
                  ]}
                />
              </>,
              <>
                <span className={"bold"}>交互逻辑差异</span>
                <ArticleList
                  list={[
                    <ArticleTable>
                      <thead>
                        <tr>
                          <th>维度</th>
                          <th>AI 对话界面</th>
                          <th>聊天软件</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className={"bold"}>消息流控制</td>
                          <td>流式响应（逐字输出）+ 停止生成按钮</td>
                          <td>完整消息一次性送达</td>
                        </tr>
                        <tr>
                          <td className={"bold"}>上下文管理</td>
                          <td>显式的会话分支管理（如ChatGPT的会话树）</td>
                          <td>隐式时序上下文（通过引用回复扩展）</td>
                        </tr>
                      </tbody>
                    </ArticleTable>,
                  ]}
                />
              </>,
              <>
                <span className={"bold"}>状态可视化</span>
                <ArticleList
                  list={[
                    <>
                      <span className={"bold"}>网络状态提示：</span>
                      均显示连接状态（如断线重连提示）
                    </>,
                    <>
                      <span className={"bold"}>操作反馈：</span>
                      发送成功/失败的状态标识（如错误消息的红色警示）
                    </>,
                  ]}
                />
              </>,
            ]}
          />
        </ArticleDesc>
        <ArticleDesc>
          综合以上的特点，我认为实现流畅的 AI
          产品对话式布局的重点是实现好对话式滚动布局、上下文分页加载、消息流控制三个方面。接下来我会详细地从这两个方面入手，记录我在实现这种布局时的探索与思考。
        </ArticleDesc>
      </ArticlePartLayout>
    </ArticleSectionLayout>

    <ArticleSectionLayout>
      <ArticlePartLayout>
        <ArticleTitle type={"h1"} title={"一. 对话式滚动布局"} />
        <ArticleDesc>
          对话式上下文滚动布局的核心是导航锚定机制，
          <span className={"bold"}>
            新消息到达时锁定底部位置，向上滚动触发分页加载
          </span>
          。
        </ArticleDesc>
        <ArticleDesc>
          然而在网页开发的语言里，信息一直是从上往下加载的，信息超过显示区域时，也是从上往下滚动浏览的，这似乎和
          AI 的对话布局刚好<span className="bold highlight">相反</span>
          ，这自然是需要解决的关键问题。
        </ArticleDesc>
        <div className={"flex flex-col gap-4 items-center"}>
          <div
            className={"px-12 py-24 w-full bg-gray-3 border-box"}
            style={{ height: "240px", overflow: "auto" }}
          >
            <div
              className={"flex items-center justify-center text-12 color-gray-4"}
              style={{
                height: "400px",
                backgroundColor: "var(--color-border-1)",
              }}
            >
              对话内容
            </div>
          </div>
          <div className={"text-12 color-gray-4"}>常规的网页滚动布局</div>
        </div>
        <ArticleDesc>
          <span className={"bold"}>接下来一起👀看看别的产品怎么实现的？</span>
          在记录我的实现方式之前，先一起看看其他 AI
          产品，甚至是聊天产品是怎么实现的？
        </ArticleDesc>
      </ArticlePartLayout>
      <ArticlePartLayout>
        <ArticleTitle
          type={"h2"}
          title={"方案一：常规布局 ➕ 实时滚动到底部"}
        />
        <ArticleDesc noIndent>
          案例：<a href={"https://chatgpt.com/"}>ChatGPT</a>、
          <a href={"https://deepseek.com/"}>DeepSeek</a>、
          <a href={"https://yuanbao.tencent.com/"}>腾讯元宝</a>
        </ArticleDesc>
        <ArticleTitle type={"h3"} title={"实现步骤"} />
        <ArticleDesc>step 1. 在页面初始化时自动定位到底部：</ArticleDesc>
        <AgentScroller1 />
        <ArticleDesc>step 2. 结合 AI 逐字输出实时定位到底部：</ArticleDesc>
        <AgentScroller2 />
        <ArticleDesc>
          step 3.
          解决难点——回答过程中页面会持续地滚动到底部，因此页面本身的滚动浏览会受到影响，即在回答过程中是不支持向上滚动的。如何解决呢？🤔
        </ArticleDesc>
        <ArticleDesc noIndent>
          核心在于理清<span className="bold">生成时自动滚动</span>与
          <span className="bold">用户自由滚动</span>的关系与优先级：
        </ArticleDesc>
        <ArticleDesc>
          <ol>
            <li>内容变化时、当前滚动位置在底部附近——生成时自动滚动</li>
            <li>内容不变时、当前滚动位置不在底部附近——用户自由滚动</li>
            <li>优先级：用户一旦开始自由滚动，立即打断自动滚动。</li>
          </ol>
        </ArticleDesc>
        <ArticleDesc noIndent>综上所述的解决思路如下：</ArticleDesc>
        <ArticleDesc>
          <ul>
            <li>监听内容变化</li>
            <li>每次内容变化后，检查当前滚动位置是否在底部附近。</li>
            <li>如果是，则自动滚动到底部；否则，不滚动。</li>
            <li>
              通过判断滚动事件的来源（用户或程序），若用户干预，则将自动滚动的标记。
            </li>
          </ul>
        </ArticleDesc>
        <AgentScroller3 />
        <ArticleDesc>
          至此，第一种对话式布局的方案就全部实现了，这种方案具有很明显的优点，也是市面上
          Agent 产品的主流方案，缺点则需要根据业务需求进行判断。
        </ArticleDesc>
        <ArticleTitle type={"h3"} title={"优点"} />
        <ArticleDesc>
          这种实现方式因为<span className="bold">没有改动网页常规布局</span>
          ，而是通过 js
          控制滚动容器的位置，所以不会影响到网页滚动布局中的一些元素和交互，如滚动条的位置、展开收起交互等（对比后续方案）。
        </ArticleDesc>
        <ArticleTitle type={"h3"} title={"缺点"} />
        <ArticleDesc>
          通过 JS 实现，相对复杂（后面两种方案通过 css 样式即可实现）。
        </ArticleDesc>
      </ArticlePartLayout>

      <ArticlePartLayout>
        <ArticleTitle type={"h2"} title={"方案二：transform 旋转布局"} />
        <ArticleDesc noIndent>
          案例：<a href={"https://jimeng.jianying.com/"}>即梦</a>、
          <a href={"https://yuanbao.tencent.com/"}>腾讯元宝小程序</a>
        </ArticleDesc>
        <ArticleDesc>
          既然对话式布局与常规布局相反，自然而然就想到了旋转，将常规列表旋转
          180度，将常规布局的顶部作为旋转后的底部，即可做到始终定位到底部。
        </ArticleDesc>
        <ArticleTitle type="h3" title="实现步骤" />
        <ArticleDesc>
          这种方案实现起来很简单，仅需要设置样式旋转滚动容器和其中内容即可，不需要额外的
          js 计算
        </ArticleDesc>
        <ArticleTitle
          type="h4"
          title="step1. 旋转滚动容器和容器内的所有节点："
        />
        <div className="flex gap-24 text-12 color-gray-4">
          <div
            className="flex-1 bg-gray overflow-auto"
            style={{ height: "220px" }}
          >
            <div
              className="width-50 mx-auto"
              style={{ height: "320px", background: "rgba(0,0,0,0.1)" }}
            >
              <p>测试文字...测试文字..测试文字...测试文字..</p>
            </div>
          </div>
          <div
            className="flex-1 bg-gray overflow-auto rotate-180"
            style={{ height: "220px" }}
          >
            <div
              className="width-50 mx-auto"
              style={{ height: "320px", background: "rgba(0,0,0,0.1)" }}
            >
              <p>测试文字...测试文字..测试文字...测试文字..</p>
            </div>
          </div>
          <div
            className="flex-1 bg-gray overflow-auto rotate-180"
            style={{ height: "220px" }}
          >
            <div
              className="width-50 mx-auto"
              style={{ height: "320px", background: "rgba(0,0,0,0.1)" }}
            >
              <p className="rotate-180">
                测试文字...测试文字..测试文字...测试文字..
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-24 text-12 color-gray-3">
          <div className="flex-1 text-center">常规布局</div>
          <div className="flex-1 text-center">旋转滚动容器</div>
          <div className="flex-1 text-center">旋转滚动容器内部内容</div>
        </div>
        <ArticleCode language="css" codeStr={codeString1}></ArticleCode>
        <ArticleDesc>结合实际的 Agent 生成来看看效果：</ArticleDesc>
        <AgentScroller4 />
        <ArticleDesc>
          可以看到，将滚动容器翻转后，顶部成为了底部，内容从上往下展示变成了从下往上，大致是我们想要的效果了。但是明显还存在一些问题：(第1条可解决)
        </ArticleDesc>
        <ArticleDesc>
          <ol>
            <li>
              对话已开始就是从底部开始显示——而我们期望的
              Agent对话式布局是对话初始时依然是从顶部开始，只是对话到达底部时向上展开滚动。
            </li>
            <li>
              滚动方向与常规操作反向、滚动条位于容器左侧——翻转后滚动条也被旋转到了左侧，容器的滚动方向也与常规相反，鼠标向上滚动时，内容才会向上滚动。
            </li>
          </ol>
        </ArticleDesc>
        <ArticleTitle
          type="h4"
          title="step2. 问题 1 解决——营造视觉上对话从顶部开始，到达底部后向上展开滚动。"
        />
        <ArticleDesc>
          第1个问题解决起来也相对简单，只需要设置滚动容器的高度即可，在内容未到达底部时，高度始终与内容相同，内容到达底部时通过最大高度使容器开始滚动。
        </ArticleDesc>
        <ArticleCode language="css" codeStr={codeString}></ArticleCode>
        <AgentScroller4 fix />
        <ArticleTitle
          type="h4"
          title="step3. 问题 2 解决——修复滚动条同时被旋转到左侧的问题。"
        />
        <ArticleDesc>
          实现这种方案用到了 css 的变换属性 transform 的 rotate 函数，transform
          还有一个函数 scale —— 用于缩放元素，将 scale 的值设置为 "-1"
          时可实现镜像翻转，所以这里完全可以通过
          <span className="bold">竖直方向的镜像翻转</span>来将滚动条复位。
        </ArticleDesc>
        <ArticleCode language="css" codeStr={codeString2}></ArticleCode>
        <ArticleDesc>
          当然，还有另外一种方法可以修复这个问题——css 的{" "}
          <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/direction">
            direction
          </a>{" "}
          属性。这个属性可以设置容器内元素的排列方向，这里我们就可以把滚动容器内的内容和滚动条看作是容器内的两个元素，direction
          的默认值是 "ltr"
          即从左到右，滚动条的占位可以看作在元素的最后面，翻转后右边的滚动条来到了左边，所以这里只需要将初始的
          direction 设置成从右到左
          "rtl"，这样翻转后的排列方向就是我们预期的方向了。
        </ArticleDesc>
        <ArticleDesc>
          最后还有一个提示，当我在对滚动容器的 direction 设置成 "rtl"
          时，需要将容器内子元素的 direction 重置回 "ltr" 的默认值。
        </ArticleDesc>
        <ArticleCode language="css" codeStr={codeString3}></ArticleCode>
        <ArticleDesc>看看优化后的效果吧：</ArticleDesc>
        <AgentScroller4 fix scale />

        <ArticleDesc>
          至此，第二种方案也完成了，这种方案的优缺点也逐渐明了：
        </ArticleDesc>
        <ArticleTitle type="h3" title="优点" />
        <ArticleDesc>
          仅用样式就可以实现，自动定位到底部，无需计算，相对简单。
        </ArticleDesc>
        <ArticleTitle type="h3" title="缺点" />
        <ArticleDesc>
          滚动方向需要额外处理、对话节点需要逆序、影响了默认的布局，后期复杂功能实现成本大。
        </ArticleDesc>
      </ArticlePartLayout>

      <ArticlePartLayout>
        <ArticleTitle type={"h2"} title={"方案三：column-reverse 翻转内容"} />
        <ArticleDesc>
          这种方案与第二种方案思路类似，通过另外一种 css 属性 —— flex-direction:
          column-reverse
          实现，实现后的对话式布局与第二种方案大体一致，有一个最主要的差别：column-reverse
          是将滚动容器里面的内容进行旋转，而不是将整个滚动容器进行旋转。
        </ArticleDesc>
        <ArticleTitle type="h3" title="实现步骤" />
        <div className="flex gap-24 text-12 color-gray-4">
          <div
            className="flex-1 flex flex-col p-24 gap-16 bg-gray overflow-auto border-box"
            style={{ height: "220px" }}
          >
            {Array.from({ length: 3 }).map((_i, idx1) => (
              <div
                key={idx1}
                className="bg-gray-3 shrink-0"
                style={{ height: "120px" }}
              >
                对话{idx1 + 1}
              </div>
            ))}
          </div>
          <div
            className="flex-1 flex gap-16 p-24 bg-gray overflow-auto border-box flex-col-reverse"
            style={{ height: "220px" }}
          >
            {Array.from({ length: 3 }).map((_i, idx1) => (
              <div
                key={idx1}
                className="bg-gray-3 shrink-0"
                style={{ height: "120px" }}
              >
                对话{idx1 + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-24 text-12 color-gray-3">
          <div className="flex-1 text-center">常规布局</div>
          <div className="flex-1 text-center">纵轴反方向排列</div>
        </div>
        <ArticleCode language="css" codeStr={codeString4}></ArticleCode>
        <ArticleDesc>接下来还是结合模拟的 Agent 对话来看看效果：</ArticleDesc>
        <AgentScroller5 fix />
        <ArticleDesc>
          其实到这里已经基本实现了想要的效果！实际上只在常规布局的基础上加了一行代码。同样，总结下这种方案的优缺点。
        </ArticleDesc>
        <ArticleTitle type="h3" title="优点" />
        <ArticleDesc>仅加一行样式就可以实现，不需要额外处理。</ArticleDesc>
        <ArticleTitle type="h3" title="缺点" />
        <ArticleDesc>
          对话节点需要逆序、影响了默认的布局，后期复杂功能实现成本大。
        </ArticleDesc>
      </ArticlePartLayout>

      <ArticlePartLayout>
        <ArticleTitle type={"h2"} title={"方案总结"} />
        <ArticleDesc>
          最后，对上述三种方案先进行第一轮简单总结：（为什么是第一轮呢？因为上述方案只是实现了简单的
          Agent
          对话式布局，一些更加复杂的功能还没有实现,如果是一个不需要分页加载历史会话、对话内容高度固定的简单
          Agent，上述方案完全够用了。）
        </ArticleDesc>
        <ArticleTable>
          <thead>
            <tr>
              <th>方案</th>
              <th>实现方式</th>
              <th>实现难度</th>
              <th>优点</th>
              <th>缺点</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>方案一：实时滚动</td>
              <td>对话时 js 实现滚动到底部</td>
              <td>中等</td>
              <td>未改变布局</td>
              <td>实时监听、计算</td>
            </tr>
            <tr>
              <td>方案二：rotate</td>
              <td>css 旋转滚动容器与对话内容</td>
              <td>简单</td>
              <td>实现简单</td>
              <td>节点逆序、滚动条需额外处理</td>
            </tr>
            <tr>
              <td>方案三：column-reverse</td>
              <td>css 纵轴反方向排列对话</td>
              <td>最简单</td>
              <td>实现简单</td>
              <td>节点逆序</td>
            </tr>
          </tbody>
        </ArticleTable>
      </ArticlePartLayout>
    </ArticleSectionLayout>

    <ArticleSectionLayout>
      <ArticleTitle type={"h1"} title={"二. 上下文分页加载"} />
      <ArticlePartLayout>
        <ArticleDesc>
          历史会话是 Agent 应用中一个非常常见的功能，现在的主流做法有两种——
          <span className="bold">单独的历史会话列表</span>
          （大部分Agent应用的方案）、
          <span className="bold">上滑分页加载历史会话</span>。
        </ArticleDesc>
        <ArticleDesc>
          单独的历史会话列表在实现上没有太大难度，因为历史会话列表已经和生成会话流没有直接的联系了。所以本文主要探索上下文分页加载的场景。与常规的分页加载不同，Agent
          应用中由于滚动布局（见上部分内容）的特殊性，分页加载也需要进行特殊处理。上部分内容提到的三种方案对应的分页加载也需要进行不同程度上的处理，才能达到我们预期的效果。
        </ArticleDesc>
        <ArticleDesc>常规分页加载与Agent上下文分页加载的效果预览：</ArticleDesc>
        <div className="flex gap-24 text-12 color-gray-4">
          <HistoryScrollerDemo1 />
          <HistoryScrollerDemo2 />
        </div>
        <div className="flex gap-24 text-12 color-gray-3">
          <div className="flex-1 text-center">常规列表（滚动到底部）</div>
          <div className="flex-1 text-center">对话式（滚动到顶部）</div>
        </div>
        <ArticleDesc>
          可以看到，常规的分页加载在滚动到底部时会触发加载下一页的动作，而纵轴反方向排列的分页加载在滚动到顶部时会触发加载上一页的动作。
        </ArticleDesc>
        <ArticleTitle type="h4" title="实现步骤" />
        <ArticleDesc>接下来，我们就来看看这两种方案是怎么实现的。</ArticleDesc>
        <ArticleDesc noIndent>
          step 1:
          触发加载：这里我们将【滚动到顶部】转换成【顶部的加载元素全部可见】
        </ArticleDesc>
        <ArticleCode language="javascript" codeStr={codeString5}></ArticleCode>
        <ArticleDesc noIndent>这一步还有两个可以思考的空间：</ArticleDesc>
        <ArticleDesc>
          <ol>
            <li>
              🤔是否需要提前加载？通常在常规的列表加载和类似微信的聊天对话页面中，我们可以提前加载数据，弱化用户对加载历史数据的感知，无缝流畅地浏览提前加载好的分页数据。但在Agent对话式布局中，通常会给用户营造更加沉浸的对话环境，等待用户主动触发历史会话的加载。
            </li>
            <li>
              触发加载的交互细节——若需要强调用户主动触发加载的操作，可以增加更加细节的交互形式，如下拉回弹加载。
            </li>
          </ol>
        </ArticleDesc>
        <ArticleDesc noIndent>
          step 2: 插入数据：这就涉及到我们的布局是用上面哪种方案实现的。
        </ArticleDesc>
        <ArticleDesc>
          <ul>
            <li>
              <span className="bold">JS 定位底部</span>
              ：因为没有影响常规布局，所以新的对话项正常插入在数据的最后，而历史对话项则需要插入到数据的开头位置，而且，需要逆序插入。
            </li>
          </ul>
          <ArticleImage url="./images/articles2025/articles2025-3-3-1.png" />
          <ul>
            <li>
              <span className="bold">rotate or column-reverse</span>
              ：因为影响了常规布局，所以新的对话项需要插入到数据的开头位置，而历史对话项则需要插入到数据的最后位置。
            </li>
          </ul>
          <ArticleImage url="./images/articles2025/articles2025-3-3-2.png" />
        </ArticleDesc>
        <ArticleDesc noIndent>
          接下来还是结合模拟的 Agent 对话来看看效果：
        </ArticleDesc>
        <ul>
          <li>column-reverse</li>
        </ul>
        <HistoryScroller2 fix />
        <ul>
          <li>rotate</li>
        </ul>
        <HistoryScroller3 />
        <ArticleDesc>step 4: JS 定位底部方案的特殊处理</ArticleDesc>
        <ArticleDesc>
          这种方案通过上述简单的逻辑是没办法实现滚动到顶部加载历史会话的，前面说到，这种方案是在常规布局的基础上，通过
          JS
          在发消息和回答时实时定位到底部，使滚动容器内的所有元素不断向上推。然而在加载历史会话的场景中，可以先忽略新的对话，就相当于一个常规的布局，当我们滚动到顶部触发历史加载时，历史项加入滚动容器中会将原本的内容的内容自动往下顶，这样一来，一方面顶部的加载元素会一直可见，即不断触发历史加载事件，另一方面，加载出来的历史会话位置会自动变动，几乎无法浏览（上述提到使用这种方案的几款产品也都没有上滑加载历史的功能）。
        </ArticleDesc>
        <ArticleDesc>
          我们想要的效果是，历史数据加载出来后当前内容不滚动，历史项实际上在之前加载元素的位置。
        </ArticleDesc>
        <ArticleDesc>
          先拆解下实现思路——对于一个滚动容器而言，scrollTop是决定其当前位置的关键，要实现视觉上的不滚动，相当于在加载历史数据的瞬间，在页面还没来得及自动往下推之前，计算加上历史数据后页面不滚动对应的新的scrollTop并赋值。
        </ArticleDesc>
        {/* <ArticleDesc>这里的卡点在于，暂且不论计算的难度（每次加载的内容高度是动态的），理论上计算的速度是一定会比元素自动向下顶的速度慢！这就意味着，元素自动向下滚顶顶效果（图中第 2 项）是一定会出现的，即使是很短的时间也会使页面出现闪动的现象。</ArticleDesc> */}
        <ArticleImage
          url="./images/articles2025/articles2025-3-3-3.png"
          imgStyle={{ width: "100%" }}
        />
        <HistoryScroller1 />
        <ArticleDesc>
          至此，一个基础的 Agent
          布局基本上可以实现了，上述三种方案基本满足大部分 Agent
          应用（当然也包括聊天应用）。
        </ArticleDesc>
      </ArticlePartLayout>
    </ArticleSectionLayout>

    <ArticleSectionLayout>
      <ArticleTitle type={"h1"} title={"三. 代表性 Agent 交互的实现"} />
      <ArticlePartLayout>
        <ArticleTitle type={"h2"} title={"1. 深度思考的展开收起"} />
        <ArticleDesc>
          这里需要特别说明的是两种 CSS
          方案实现的布局，因为翻转了常规布局，内容的默认行为变成了向上顶，对于展开收起操作而言，这是不符合预期的。
        </ArticleDesc>
        <ArticleDesc>
          这里我们以 column-reverse 为例，对比下处理前后展开收起的效果预览：
        </ArticleDesc>
        <div className="flex gap-24 text-12 color-gray-4">
          <FixScroller1 />
          <FixScroller1 fix />
        </div>
        <ArticleDesc>
          其实这个场景与刚刚讲到的对于JS定位加载历史的特殊处理类似，都是在内容变化时，将因为布局影响导致的不符合预期的布局变动，手动复位。
        </ArticleDesc>
        <ArticleDesc>
          区别在于，前者是在默认向下滚动的布局里通过计算实现向上滚动，后者则反之。
        </ArticleDesc>
        <ArticleCode codeStr={codeString6} language="javascript" />
        <ArticleDesc>
          可以发现，这种对话式布局其实是将最新消息定位底部（默认不支持）的同时，保持用户熟悉的网页操作习惯（浏览器默认行为）。这样一来，不管是用哪种方案实现的对话式布局，都可能存在需要特殊处理的地方。
        </ArticleDesc>
      </ArticlePartLayout>
      <ArticlePartLayout>
        <ArticleTitle type={"h2"} title={"2. 逐字输出"} />
        {/* <AgentScroller5 autoOutPut customContent={customContent}/> */}
        <ArticleDesc>
          逐字输出是 Agent 应用中一个非常常见的表现形式，用于展示 Agent
          的思考过程。用户对于逐字输出的理解似乎是 Agent
          逐字思考、逐字回答，但实际情况下，后台返回的 Agent
          回答通常是不定的，可能是一个字，也可能是一句话。如果不做任何处理把回答数据展示给用户，就会出现忽长忽短的“逐字回答”，看上去会有卡顿感。所以，最后展现在用户眼前的逐字回答实际上是前端加工后的效果。
        </ArticleDesc>
        <ArticleDesc>这里很容易想到实现思路:</ArticleDesc>
        <ArticleDesc>
          <ol>
            <li>将 Agent 实际返回的忽长忽短的数据一次拼接成一个长字符串</li>
          </ol>
        </ArticleDesc>
        <ArticleDesc>
          <ol>
            <li>再将这个长字符串逐字返回</li>
          </ol>
        </ArticleDesc>
        <ArticleCode language="javascript" codeStr={codeString7} />
        <ArticleDesc>
          <ol>
            <li>配合上逐字返回的动效即可</li>
          </ol>
        </ArticleDesc>
        <ArticleCode language="javascript" codeStr={codeString8} />
        <ArticleCode language="css" codeStr={codeString9} />
        <ArticleDesc>看看实现的效果吧：</ArticleDesc>
        <BlinkOutput />
      </ArticlePartLayout>
    </ArticleSectionLayout>
    <ArticleEndText />
  </ArticleLayout>
);  
