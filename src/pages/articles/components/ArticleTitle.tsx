type Props = {
  type?: "h1" | "h2" | "h3" | "h4" | "h5";
  title?: string;
}
const ArticleTitle: React.FC<Props> = ({
  type = "h2",
  title = '标题',
}) => {
  switch (type) {
    case "h1":
      return (
        <h1 className="article-title-h1 font-bold color-gray-1 pt-16">{title}</h1>
      );
      break;
    case "h2":
      return (
        <h2 className="article-title-h2 font-bold color-gray-1 pt-8">{title}</h2>
      );
      break;
    case "h3":
      return (
        <h3 className="article-title-h3 font-bold color-gray-1 pt-8">{title}</h3>
      );
      break;
    case "h4":
      return (
        <h4 className="article-title-h4 font-bold color-gray-1 pt-4">{title}</h4>
      );
      break;
    case "h5":
      return (
        <h5 className="article-title-h5 font-bold color-gray-1 pt-4">{title}</h5>
      );
      break;
    default:
      return null;
  }
}
export default ArticleTitle;