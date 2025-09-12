import React from "react";
import '../styles/components/index.css'

type Props = {
 children?: React.ReactNode;
}
const ArticleTable:React.FC<Props> = ({
                                               children
                                      }) => <table className="article-table">{children}</table>

export default ArticleTable;
