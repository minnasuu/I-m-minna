import {  useEffect, useState } from "react";
import UserItem from "./AgentScroller/components/UserItem.tsx";
import AgentScrollLayout from "./AgentScroller/components/AgentScrollLayout.tsx";
import TypewriterMarkdown from "./AgentScroller/components/TypewriterMarkdown.tsx";
import ServerItem from "./AgentScroller/components/ServerItem.tsx";
import { MDcontent } from "./mock.ts";

const AgentScroller2: React.FC = () => {
  useEffect(() => {
    const scroller = document.querySelector('.ckt-agent-scroll-layout-1-1');
    scroller?.scrollTo({
      top: scroller?.scrollHeight,
    })
  }, []);

  const scrollToBottom = () => {
    const scroller = document.querySelector('.ckt-agent-scroll-layout-1-1');
    scroller?.scrollTo({
      top: scroller?.scrollHeight,
      behavior: 'smooth',
    })
  };

  const [show1, setShow1] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div
      className="w-full flex flex-col border border-gray-2 rounded-[8px]"
      style={{ height: "320px" }}
    >
      <AgentScrollLayout
        isEnd
        className={"px-12 border-box flex-1 h-full"}
        contentClassName="ckt-agent-scroll-layout-1-1"
      >
        {show1 && <UserItem message={"问了一个问题"} />}
        {show2 && (
          <ServerItem>
            <TypewriterMarkdown
              onBlinkComplete={() => scrollToBottom()}
              content={MDcontent}
              speed={20}
              onComplete={() => setLoading(false)}
            />
          </ServerItem>
        )}
      </AgentScrollLayout>
      <div className={"flex justify-end px-12 py-12"}>
        <button
          style={{ width: "100px" }}
          disabled={loading}
          onClick={() => {
            setLoading(true);
            setShow1(true);
            setTimeout(() => {
              setShow2(true);
            }, 1000);
          }}
        >
          {loading ? "生成中" : "开始"}
        </button>
      </div>
    </div>
  );
}

export default AgentScroller2;
