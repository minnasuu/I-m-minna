type Props = {
  children?: React.ReactNode;
}
const ArticleSectionLayout: React.FC<Props> = ({
  children
}) => <div className="flex flex-col gap-4">{children}</div>
export default ArticleSectionLayout;