import ArticleTitle from "./ArticleTitle";

type Props = {
  title?: string;
  children?: React.ReactNode;
};
const ArticlePartLayout: React.FC<Props> = ({ title, children }) => (
  <div className="flex flex-col gap-4">
    {title && <ArticleTitle type="h2" title={title} />}
    {children}
  </div>
);
export default ArticlePartLayout;
