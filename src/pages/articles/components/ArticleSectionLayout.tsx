import ArticleTitle from "./ArticleTitle";

type Props = {
  // 一级标题
  title?: string;
  children?: React.ReactNode;
};
const ArticleSectionLayout: React.FC<Props> = ({ title, children }) => (
  <div className="flex flex-col gap-8">
    {title && <ArticleTitle type="h1" title={title} />}
    {children}
  </div>
);
export default ArticleSectionLayout;
