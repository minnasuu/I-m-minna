import ArticleLayout from "../components/ArticleLayout.tsx";
import ArticleSectionLayout from "../components/ArticleSectionLayout.tsx";
import ArticlePartLayout from "../components/ArticlePartLayout.tsx";
import ArticleTitle from "../components/ArticleTitle.tsx";
import ArticleContentLayout from "../components/ArticleContentLayout.tsx";
import ArticleDesc from "../components/ArticleDesc.tsx";
import ArticleTable from "../components/ArticleTable.tsx";

export const article2025_1_20 =<ArticleLayout>
    <ArticleSectionLayout>
        <ArticlePartLayout>
            <ArticleTitle type={'h2'} title={'一. 图片类型'}/>
            <ArticleContentLayout>
                <ArticleTitle type={'h3'} title={'1. 位图'}/>
                <ArticleDesc>位图，也叫做点阵图，像素图。构成点阵图的最小单位是像素，位图就是由像素阵列的排列来实现其显示效果的，每个像素有自己的颜色信息，在对位图图像进行编辑操作的时候，可操作的对象是每个像素，我们可以改变图像的色相、饱和度、透明度，从而改变图像的显示效果。</ArticleDesc>
                <ArticleDesc>常见的比如：jpg、png、webp等</ArticleDesc>
                <ArticleTitle type={'h3'} title={'2. 矢量图'}/>
                <ArticleDesc>矢量图，也叫做向量图。矢量图并不记录画面上每一点的信息，而是记录了元素形状及颜色的算法，当你打开一幅矢量图的时候，软件对图形对应的函数进行运算，将运算结果图形的形状和颜色显示出来。</ArticleDesc>
                <ArticleDesc>常见的就是 svg 格式的</ArticleDesc>
            </ArticleContentLayout>
        </ArticlePartLayout>

        <ArticlePartLayout>
            <ArticleTitle type={'h2'} title={'二. 图片的压缩类型'}/>
            <ArticleContentLayout>
                <ArticleTitle type={'h3'} title={'1. 无压缩'}/>
                <ArticleDesc>无压缩的图片格式不对图片数据进行压缩处理，能准确地呈现原图片，例如BMP 格式。</ArticleDesc>
                <ArticleTitle type={'h3'} title={'2. 有损压缩'}/>
                <ArticleDesc>在压缩图片时损失了一部分图片信息（删掉某些像素数据），图片质量也会随之降低。有损压缩造成的图片损失是不可逆的，即不可能将一张有损压缩过的图片恢复成完整的原图。</ArticleDesc>
                <ArticleDesc>有损压缩的代表是 jpg。</ArticleDesc>
                <ArticleTitle type={'h3'} title={'3. 无损压缩'}/>
                <ArticleDesc>对图片的所有数据信息进行编码压缩，这种方式能在保证图片质量的同时降低图片的大小。无损压缩处理后的图片，图片质量不受损耗，可以恢复出原来的图片信息（解压）。</ArticleDesc>
                <ArticleDesc>有损压缩的代表是 png。</ArticleDesc>
            </ArticleContentLayout>
        </ArticlePartLayout>

        <ArticlePartLayout>
            <ArticleTitle type={'h2'} title={'三. 像素'}/>
            <ArticleDesc>一张位图图片放大后可以看到一个个小格子，这些小格子就是像素。</ArticleDesc>
            <ArticleDesc>像素在计算机中用二进制（0、1）表示，使用的二进制位数越多，像素的色彩就更多。举个🌰，一个像素如果只用一位二进制数表示，只能为0（黑色）或1（白色）。</ArticleDesc>
            <ArticleDesc>下面是一些常见图片格式所使用的二进制位数：</ArticleDesc>
            <ArticleTable>
                <thead>
                <tr>
                    <th>二进制位数(位)</th>
                    <th>颜色数量（种）</th>
                    <th>代表格式</th>
                </tr>
                </thead>
                <tbody>
                {[
                    {num1: 1,num2:2},
                    {num1: 2,num2:4},
                    {num1: 3,num2:8},
                    {num1: 4,num2:16},
                    {num1: 5,num2:32},
                    {num1: 6,num2:64},
                    {num1: 7,num2:128},
                    {num1: 8,num2:256,example:"GIF"},
                    {num1: 12,num2:4096},
                    {num1: 16,num2:65536},
                    {num1: 24,num2:16777216,example:'JPG/PNG'}
                ].map((item: {num1:number,num2:number,example?:string},index) => <tr key={index}>
                    <td>{item.num1}</td>
                    <td>{item.num2}</td>
                    <td>{item.example || '-'}</td>
                </tr>)}
                </tbody>
            </ArticleTable>

        </ArticlePartLayout>

        <ArticlePartLayout>
            <ArticleTitle type={'h2'} title={'四. 图片的常见格式'}/>
            <ArticleContentLayout>
                <ArticleTitle type={'h3'} title={'1. GIF'}/>
                <ArticleDesc><span className={'fw-600'}>关键词：</span>无损压缩、索引色、透明、动画</ArticleDesc>
                <ArticleDesc>GIF格式的图片尺寸较小，支持透明和动画（不支持半透明效果，不支持 Alpha 通道）。</ArticleDesc>
            </ArticleContentLayout>
            <ArticleContentLayout>
                <ArticleTitle type={'h4'} title={'😊 优点'}/>
                <ArticleDesc>
                    <ol>
                        <li>优秀的压缩算法使其在一定程度上保证图像质量的同时将体积变得很小。</li>
                        <li>可插入多帧，从而实现动画效果。</li>
                        <li>可设置透明色以产生对象浮现于背景之上的效果。</li>
                    </ol>
                </ArticleDesc>
            </ArticleContentLayout>
            <ArticleContentLayout>
                <ArticleTitle type={'h4'} title={'😑 缺点'}/>
                <ArticleDesc>
                    由于采用了 8 位压缩，最多只能处理 256 种颜色，故不宜应用于真彩色(文末的附录有解释)图片。
                </ArticleDesc>
            </ArticleContentLayout>
            <ArticleContentLayout>
                <ArticleTitle type={'h3'} title={'2. JPG/JPEG'}/>
                <ArticleDesc><span className={'fw-600'}>关键词：</span>有损压缩、直接色、适合大图、体积小</ArticleDesc>
                <ArticleDesc>JPEG 格式是最常见的一种图像格式，文件后辍名为“.JPEG”或“.jpg”，JPEG 可以说是人们最熟悉的图档格式，相信在数字相机普及的现在，几乎每台数字相机、照相手机都可以（甚至只能）输出 JPEG 格式的图档。</ArticleDesc>
                <ArticleDesc>JPEG 是一种很典型的使用有损压缩图像格式，也就是说使用者每次进行 JPEG 的存档动作后，图档的一些内容细节都会遭到永久性的破坏，尤其是使用过高的压缩比例，将使最终解压缩后恢复的图像质量明显降低，如果追求高品质图像，不宜采用过高压缩比例。</ArticleDesc>
                <ArticleDesc>JPEG 图片格式的设计目标，是在不影响人类可分辨的图片质量的前提下，尽可能的压缩文件大小。</ArticleDesc>
            </ArticleContentLayout>
            <ArticleContentLayout>
                <ArticleTitle type={'h4'} title={'两种JPEG'}/>
                <ArticleDesc><span className={'fw-600'}>Baseline JPEG（标准型）：</span>按从上到下的扫描方式，把每一行顺序的保存在 JPEG 文件中。打开这个文件显示它的内容时，数据将按照存储时的顺序从上到下一行一行的被显示出来，直到所有的数据都被读完，就完成了整张图片的显示。</ArticleDesc>
                <ArticleDesc><span className={'fw-600'}>Progressive JPEG（渐进式）</span>多次扫描，这些扫描顺寻的存储在 JPEG 文件中。打开文件过程中，会先显示整个图片的模糊轮廓，随着扫描次数的增加，图片变得越来越清晰。</ArticleDesc>
            </ArticleContentLayout>
            <ArticleContentLayout>
                <ArticleTitle type={'h4'} title={'😊 优点'}/>
                <ArticleDesc>
                    <ul>
                        <li>可以支持 24bit 真彩色，普遍应用于需要连续色调的图像如色彩丰富的图片、照片等；</li>
                        <li>可利用可变的压缩比以控制文件大小；</li>
                        <li>渐进式 JPEG 文件支持交错；</li>
                    </ul>
                </ArticleDesc>
            </ArticleContentLayout>
            <ArticleContentLayout>
                <ArticleTitle type={'h4'} title={'😑 缺点'}/>
                <ArticleDesc>
                    <ul>
                        <li>JPEG 不适合用来存储企业 Logo、线框类的图。因为有损压缩会导致图片模糊，而直接色的选用，又会导致图片文件较GIF更大。</li>
                        <li>有损耗压缩会使原始图片数据质量下降。</li>
                        <li>JPEG 图像不支持透明度处理。</li>
                    </ul>
                    </ArticleDesc>
            </ArticleContentLayout>
            <ArticleContentLayout>
                <ArticleTitle type={'h3'} title={'3. PNG'}/>
                <ArticleDesc><span className={'fw-600'}>关键词：</span>无损压缩、索引色、支持透明、体积大</ArticleDesc>
                <ArticleDesc>便携式网络图形（简称 PNG，英语全称：Portable Network Graphics）。PNG 能够提供长度比 GIF 小30%的无损压缩图像文件。它同时提供 24 位和 32 位真彩色图像支持以及其他诸多技术性支持。由于PNG 优秀的特点，PNG 格式图片可以称为“网页设计专用格式”。PNG 最初的开发目的是为了作为 GIF 的替代方案的，作为做新开发的影像传输文件格式，PNG 同样使用了无损压缩格式，事实上 PNG 的开发就是因为 GIF 所使用的无损压缩格式专利问题而诞生的。</ArticleDesc>
               <ArticleTable>
                   <thead>
                   <tr>
                       <th></th>
                       <th>PNG-8</th>
                       <th>PNG-24</th>
                       <th>PNG-32</th>
                   </tr>
                   </thead>
                   <tbody>
                    <tr>
                        <td>简介</td>
                        <td>PNG 的索引色版本</td>
                        <td>PNG 的直接色版本</td>
                        <td rowSpan={3}>比PNG-24多了一个 Alpha 通道</td>
                    </tr>
                    <tr>
                        <td>特点</td>
                        <td>无损的、使用索引色的、点阵图</td>
                        <td>无损的、使用直接色的、点阵图</td>
                    </tr>
                   </tbody>
               </ArticleTable>
                <ArticleDesc noIndent>区分索引色与直接色：例如，一张 2px*2px 的超级小图，从左往右从上往下依次的颜色是红，白，白，红。
                </ArticleDesc>
                <ArticleDesc>
                    <ul>
                        <li>索引色：记录同一种颜色的值和出现的位置（"红-1,4；白-2,3"）</li>
                        <li>直接色：把所有像素的色值依次记录下来（"红，白，白红"）</li>
                    </ul>
                </ArticleDesc>
            </ArticleContentLayout>
            <ArticleContentLayout>
                <ArticleTitle type={'h4'} title={'😊 优点'}/>
                <ArticleDesc>
                    <ul>
                        <li>支持高级别无损耗压缩；</li>
                        <li>支持 alpha 通道透明度；</li>
                        <li>支持 256 色调色板技术以产生小体积文件</li>
                        <li>最高支持 24 位真彩色图像以及 8 位灰度图像。</li>
                        <li>支持图像亮度的 Gamma 校准信息。</li>
                        <li>支持存储附加文本信息，以保留图像名称、作者、著作权、创作时间、注释等信息。</li>
                        <li>渐近显示和流式读写，适合在网络传输中快速显示预览效果后再展示全貌。</li>
                    </ul>
                </ArticleDesc>
            </ArticleContentLayout>
            <ArticleContentLayout>
                <ArticleTitle type={'h4'} title={'😑 缺点'}/>
                <ArticleDesc>
                    <ul>
                        <li>较旧的浏览器 IE6- 和程序可能不支持 PNG 文件；</li>
                        <li>与 JPEG 的有损耗压缩相比，PNG 提供的压缩量较少，文件较大；</li>
                        <li>与 GIF 格式相比，对多图像文件或动画文件不提供任何支持</li>
                    </ul>
                </ArticleDesc>
            </ArticleContentLayout>
            <ArticleContentLayout>
                <ArticleTitle type={'h3'} title={'4. Webp'}/>
                <ArticleDesc><span className={'fw-600'}>关键词：</span>新格式、有损、无损、兼容性</ArticleDesc>
                <ArticleDesc>WebP 是谷歌开发的一种新图片格式，WebP 是同时支持有损和无损压缩的、使用直接色的、点阵图，集多种图片文件格式的优点于一身。</ArticleDesc>
                <ArticleDesc>
                    <ul>
                        <li>在无损压缩的情况下，相同质量的 WebP 图片，文件大小要比 PNG 小26%；</li>
                        <li>在有损压缩的情况下，具有相同图片精度的 WebP 图片，文件大小要比 JPEG 小 25%~34%；</li>
                        <li>WebP 图片格式支持图片透明度，一个无损压缩的 WebP 图片，如果要支持透明度只需要 22% 的格外文件大小。</li>
                    </ul>
                </ArticleDesc>
            </ArticleContentLayout>
        </ArticlePartLayout>
    </ArticleSectionLayout>
</ArticleLayout>
