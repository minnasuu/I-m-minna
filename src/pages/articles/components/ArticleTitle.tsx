type Props = {
  type?: "h1" | "h2" | "h3" | "h4" | "h5";
  title?: string;
}
const ArticleTitle: React.FC<Props> = ({
  type = "h2",
  title = '标题',
}) => {
  switch (type) {
    case "h1": return <h1 style={{fontSize:'24px',fontWeight:'600',color:'#202020'}}>{title}</h1>; break;
    case "h2": return <h2 style={{fontSize:'20px',fontWeight:'600',color:'#202020'}}>{title}</h2>; break;
    case "h3": return <h3 style={{fontSize:'16px',fontWeight:'600',color:'#202020'}}>{title}</h3>; break;
    case "h4": return <h4 style={{fontSize:'14px',fontWeight:'600',color:'#202020'}}>{title}</h4>; break;
    case "h5": return <h5 style={{fontSize:'12px',fontWeight:'600',color:'#202020'}}>{title}</h5>; break;
    default: return null;
  }
}
export default ArticleTitle;