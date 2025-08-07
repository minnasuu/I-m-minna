import React from "react";

type Props = {
    ordered?:boolean;
    list: (string|React.ReactNode)[]
}
const ArticleList:React.FC<Props> = ({
                                         list,
                                         ordered
                                     }) => {
    return ordered ? <ol style={{display:'flex',flexDirection:'column',gap:'12px',marginTop:'12px'}}>
        {list.map((item) => <li>{item}</li>)}
    </ol> : <ul style={{display:'flex',flexDirection:'column',gap:'12px',marginTop:'12px'}}>
        {list.map((item) => <li>{item}</li>)}
    </ul>
}
export default ArticleList;
