type Props = {
 children?: React.ReactNode;
}
const ArticleContentLayout:React.FC<Props> = ({
                                               children
                                      }) => <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>{children}</div>
export default ArticleContentLayout;