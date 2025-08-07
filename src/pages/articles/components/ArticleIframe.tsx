import React, {type CSSProperties, useEffect} from "react";

type Props = {
    url?: string;
    top?:number;
    style?: CSSProperties;
    className?: string;
}
const ArticleIframe: React.FC<Props> = ({
    url = '正文内容...',
    top=0,
    style,
    className=''
}) => {
    const iframeRef = React.useRef<HTMLIFrameElement>(null);
    useEffect(() => {
        iframeRef.current?.scrollTo({
            top:top,
            behavior: 'smooth'
        })
    },[top])
    return <iframe ref={iframeRef} src={url} className={`flex justify-center width-100 ${className}`} style={{border:'none',minHeight:'400px',...style}}></iframe>
}
export default ArticleIframe;