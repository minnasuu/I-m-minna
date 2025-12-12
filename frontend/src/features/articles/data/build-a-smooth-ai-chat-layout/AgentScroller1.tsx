import { useEffect, useRef } from "react";

const AgentScroller1: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef?.current?.scrollTo({
      top: scrollRef?.current?.scrollHeight,
    })
  }, []);
  return (
    <div
      ref={scrollRef}
      className={
        "px-12 py-24 w-full border border-gray-2 rounded-[8px] border-box"
      }
      style={{ height: "240px", overflow: "auto" }}
    >
      <div
        className={"flex items-center justify-center text-12 color-gray-4"}
        style={{ height: "400px", backgroundColor: "var(--color-border-1)" }}
      >
        历史会话...
      </div>
    </div>
  );
}
export default AgentScroller1;