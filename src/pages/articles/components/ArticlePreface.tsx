import React from "react";

type Props = {
    children?: React.ReactNode;
}
const ArticlePreface: React.FC<Props> = ({
                                          children = '前言内容...',
                                      }) => <div style={{padding:'16px',fontSize:'14px',color:'#888',borderRadius:'8px',backgroundColor:'#f0f0f0',textIndent:'2px'}}>{children}</div>

export default ArticlePreface;