type Props = {
 children?: React.ReactNode;
}
const ArticleLayout: React.FC<Props> = ({ children }) => (
  <div className="flex flex-col gap-12 mt-8">{children}</div>
);
export default ArticleLayout;
