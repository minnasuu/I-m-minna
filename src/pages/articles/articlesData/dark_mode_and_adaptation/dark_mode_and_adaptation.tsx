import ArticleLayout from "../../components/ArticleLayout.tsx";
import ArticleMarkdown from "../../components/ArticleMarkdown.tsx";
import ArticleEndText from "../../components/ArticleEndText.tsx";
import markdownContent from "./data.md?raw";

export const dark_mode_and_adaptation = (
  <ArticleLayout>
    <ArticleMarkdown>{markdownContent}</ArticleMarkdown>
    <ArticleEndText />
  </ArticleLayout>
);
