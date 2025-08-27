type Props = {
  type?: "h1" | "h2" | "h3" | "h4" | "h5";
  title?: string;
}
const ArticleTitle: React.FC<Props> = ({
  type = "h2",
  title = '标题',
}) => {
  switch (type) {
    case "h1": return <h1 className="text-24 font-bold text-gray-1">{title}</h1>; break;
    case "h2": return <h2 className="text-20 font-bold text-gray-1">{title}</h2>; break;
    case "h3": return <h3 className="text-16 font-bold text-gray-1">{title}</h3>; break;
    case "h4": return <h4 className="text-14 font-bold text-gray-1">{title}</h4>; break;
    case "h5": return <h5 className="text-12 font-bold text-gray-1">{title}</h5>; break;
    default: return null;
  }
}
export default ArticleTitle;