type Props = {
 children?: React.ReactNode;
}
const ArticleContentLayout:React.FC<Props> = ({
                                               children
                                      }) => <div className="flex flex-col gap-1">{children}</div>
export default ArticleContentLayout;