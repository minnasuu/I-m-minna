import React, { useEffect, useState } from "react";
import UserItem from "../AgentScroller/components/UserItem.tsx";
import AgentScrollLayout from "../AgentScroller/components/AgentScrollLayout.tsx";
import TypewriterMarkdown from "../AgentScroller/components/TypewriterMarkdown.tsx";
import ServerItem from "../AgentScroller/components/ServerItem.tsx";
import { MDcontent } from "../mock.ts";

type Props = {
  fix?: boolean;
}
const HistoryScroller3: React.FC<Props> = ({
  fix = false,
}) => {
 const [data, setData] = useState<React.ReactNode[]>([
  <ServerItem className="rotate-180">回答5</ServerItem>,
  <UserItem className="rotate-180 mr-auto" message={'问题5'} />,
  <ServerItem className="rotate-180">回答6</ServerItem>,
  <UserItem className="rotate-180 mr-auto" message={'问题6'} />,
  <ServerItem className="rotate-180">回答7</ServerItem>,
  <UserItem className="rotate-180 mr-auto" message={'问题7'} />,
 ])
  const [loading, setLoading] = useState<boolean>(false);
  const agentAnswerItem = <ServerItem className="rotate-180">
  <TypewriterMarkdown
    content={MDcontent}
    speed={20}
  onComplete={() => setLoading(false)}
  />
</ServerItem>;

useEffect(() => {
if(loading){
  setTimeout(() => {
    setData([agentAnswerItem,...data]);
   }, 1000);
  }
},[loading])
const loadingMoreRef = React.useRef<HTMLDivElement>(null);
const loadMore = () => {
  setData([...data,[
    <ServerItem className="rotate-180">回答8</ServerItem>,
  <UserItem className="rotate-180 mr-auto" message={'问题8'} />,
  <ServerItem className="rotate-180">回答9</ServerItem>,
  <UserItem className="rotate-180 mr-auto" message={'问题9'} />,
  <ServerItem className="rotate-180">回答10</ServerItem>,
  <UserItem className="rotate-180 mr-auto" message={'问题10'} />,
  ]])
  setIsEnd(true);
}
const [isEnd,setIsEnd] = useState<boolean>(false);
useEffect(() => {
  if (!loadingMoreRef.current) return;
  const observer = new IntersectionObserver(
      (entries) => {
          if (entries[0].isIntersecting) {
              loadMore();
          }
      },
      { threshold: 1.0 } // 当目标元素完全可见时触发
  );
  
  if (loadingMoreRef.current) {
      observer.observe(loadingMoreRef.current);
  }
  
  return () => {
          observer.disconnect();
  };
}, [ data]);
  return <div className={`width-100 flex column border radius-8 ${fix ? 'justify-between' : ''}`} style={{ height: '320px' }}>
    <AgentScrollLayout 
    isEnd
    className={`px-12 border-box ${fix ? '' : 'flex-1 height-1'}`} style={fix ? { height: 'fit-content', maxHeight: '100%' } : {overflow:'auto'}} contentStyle={{direction:'rtl'}}
    contentClassName="rotate-180"
    >
      {data?.map(item=>item)}
      {!isEnd &&<div ref={loadingMoreRef} className="width-100 flex justify-center py-12">加载中...</div>}
    </AgentScrollLayout>
    <div className={'flex justify-end px-12 py-12'}>
    <button style={{width: '100px'}} disabled={loading} onClick={() => {
      setLoading(true);
        setData([<UserItem className="rotate-180 mr-auto" message={'问了一个新的问题4'} />,...data]);
      }}>
        {loading?'生成中':'开始'}
      </button>
    </div>
  </div>
}

export default HistoryScroller3;
