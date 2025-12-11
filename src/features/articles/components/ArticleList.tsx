import React from "react";

type Props = {
    ordered?:boolean;
    list: (string|React.ReactNode)[]
}
const ArticleList:React.FC<Props> = ({
                                         list,
                                         ordered
                                     }) => {
    return ordered ? <ol className="flex flex-col gap-12 mt-12">
        {list.map((item) => <li>{item}</li>)}
    </ol> : <ul className="flex flex-col gap-12 mt-12">
        {list.map((item) => <li>{item}</li>)}
    </ul>
}
export default ArticleList;
