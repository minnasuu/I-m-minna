import ArticleTitle from "./ArticleTitle";

type Props = {
  title?: string;
  children?: React.ReactNode;
};
const ArticleContentLayout: React.FC<Props> = ({ title, children }) => (
  <div className="flex flex-col gap-1">
    {title && <ArticleTitle type="h3" title={title} />}
    {children}
  </div>
);
export default ArticleContentLayout;
