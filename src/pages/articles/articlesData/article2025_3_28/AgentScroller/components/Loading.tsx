import "../../index.scss";

type Props = {
  loadingText?: string;
};
const Loading: React.FC<Props> = ({ loadingText }) => {
  return (
    <div className={"flex flex-col gap-12"}>
      <div className="article-loading-dots"></div>
      {loadingText}
    </div>
  );
};
export default Loading;
