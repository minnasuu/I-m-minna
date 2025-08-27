type Props = {
 children?: React.ReactNode;
}
const ArticlePartLayout:React.FC<Props> = ({
                                               children
                                      }) => <div className="flex flex-col gap-2">{children}</div>
export default ArticlePartLayout;