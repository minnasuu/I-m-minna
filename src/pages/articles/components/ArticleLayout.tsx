type Props = {
 children?: React.ReactNode;
}
const ArticleLayout:React.FC<Props> = ({
                                               children
                                      }) => <div style={{display:'flex',flexDirection:'column',gap:'24px',marginTop:'20px'}}>{children}</div>
export default ArticleLayout;
