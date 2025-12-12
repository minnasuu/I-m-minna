import ArticleLayout from "../../components/ArticleLayout.tsx";
import ArticleMarkdown from "../../components/ArticleMarkdown.tsx";
import ArticleEndText from "../../components/ArticleEndText.tsx";
import markdownContent from "./data.md?raw";

export const web_shortcut_key_md = markdownContent;

export const web_shortcut_key = (
  <ArticleLayout>
    <ArticleMarkdown>{markdownContent}</ArticleMarkdown>
    <ArticleEndText />
  </ArticleLayout>
);
