import ArticleLayout from "../../components/ArticleLayout.tsx";
import ArticleMarkdown from "../../components/ArticleMarkdown.tsx";
import ArticleEndText from "../../components/ArticleEndText.tsx";
import markdownContent from "./data.md?raw";

export const deep_understanding_of_images = (
  <ArticleLayout>
    <ArticleMarkdown>{markdownContent}</ArticleMarkdown>
    <ArticleEndText />
  </ArticleLayout>
);
