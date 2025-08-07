type Props = {
 children?: React.ReactNode;
}
const ArticlePartLayout:React.FC<Props> = ({
                                               children
                                      }) => <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>{children}</div>
export default ArticlePartLayout;