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
                                      }) => <div style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'20px',...style}}>
    <img src={url} alt={alt} style={{maxHeight: '400px',borderRadius:'8px',...imgStyle}} />
</div>
export default ArticleImage;