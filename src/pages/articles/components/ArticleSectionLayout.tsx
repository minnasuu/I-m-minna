type Props = {
  children?: React.ReactNode;
}
const ArticleSectionLayout: React.FC<Props> = ({
  children
}) => <div style={{display:'flex',flexDirection:'column',gap:'32px'}}>{children}</div>
export default ArticleSectionLayout;