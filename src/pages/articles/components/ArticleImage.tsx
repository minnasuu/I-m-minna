import {type CSSProperties} from "react";

type Props = {
    url?: string;
    alt?: string;
    style?: CSSProperties;
    imgStyle?: CSSProperties;
}
const ArticleImage: React.FC<Props> = ({
                                           url = '正文内容...',
                                           alt,
                                           style,
                                           imgStyle
                                      }) => <div className="flex justify-center w-full mt-20" style={style}>
    <img src={url} alt={alt} className="max-h-[400px] rounded-lg" style={imgStyle} />
</div>
export default ArticleImage;