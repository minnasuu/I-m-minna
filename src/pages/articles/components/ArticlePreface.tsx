import React from "react";

type Props = {
    children?: React.ReactNode;
}
const ArticlePreface: React.FC<Props> = ({ children = "前言内容..." }) => (
  <div className="article-preface text-14 text-gray-2 rounded-lg text-indent-2">
    {children}
  </div>
);

export default ArticlePreface;