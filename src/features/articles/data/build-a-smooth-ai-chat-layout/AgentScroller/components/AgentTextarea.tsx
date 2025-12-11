import "../../index.scss";

type Props = {
  onSend?: (e: any) => void;
};
const AgentTextarea: React.FC<Props> = ({ onSend }) => {
  return (
    <div
      className={"flex flex-col gap-8 p-12 mt-auto w-full bg-gray rounded-12"}
    >
      <div className={"article-agent-textarea w-full"}></div>
      <div className="flex justify-end">
        {/*<LandButton text={'添加'}></LandButton>*/}
        <button onClick={onSend}>发送</button>
      </div>
    </div>
  );
};

export default AgentTextarea;
