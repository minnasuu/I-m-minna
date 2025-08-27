type Props = {
 children?: React.ReactNode;
}
const ArticleLayout:React.FC<Props> = ({
                                               children
                                      }) => <div className="flex flex-col gap-24 mt-20">{children}</div>
export default ArticleLayout;
