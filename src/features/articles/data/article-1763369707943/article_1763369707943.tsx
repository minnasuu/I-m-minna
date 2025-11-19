import ArticleLayout from "../../components/ArticleLayout.tsx";
import ArticleMarkdown from "../../components/ArticleMarkdown.tsx";
import ArticleEndText from "../../components/ArticleEndText.tsx";
import markdownContent from "./data.md?raw";

export const article_1763369707943 = (
  <ArticleLayout>
    <ArticleMarkdown>{markdownContent}</ArticleMarkdown>
    <ArticleEndText />
  </ArticleLayout>
);
