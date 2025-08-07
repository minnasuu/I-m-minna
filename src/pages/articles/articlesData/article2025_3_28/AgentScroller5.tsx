import { useEffect, useState } from "react";
import UserItem from "./AgentScroller/components/UserItem.tsx";
import AgentScrollLayout from "./AgentScroller/components/AgentScrollLayout.tsx";
import TypewriterMarkdown from "./AgentScroller/components/TypewriterMarkdown.tsx";
import ServerItem from "./AgentScroller/components/ServerItem.tsx";
import { MDcontent } from "./mock.ts";

type Props = {
  fix?: boolean;
  autoOutPut?: boolean;
  customContent?:string;
}
const AgentScroller5: React.FC<Props> = ({
  fix = false,
  autoOutPut,
  customContent,
}) => {
  useEffect(() => {
    setLoading(true);
        setShow1(true)
        setTimeout(() => {
          setShow2(true)
        }, 1000);
  },[autoOutPut])
  const [show1, setShow1] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  return <div className={`width-100 flex column border radius-8 ${fix ? 'justify-between' : ''}`} style={{ height: '320px' }}>
    <AgentScrollLayout isEnd className={`px-12 border-box ${fix ? '' : 'flex-1 height-1'}`} style={fix ? { height: 'fit-content', maxHeight: '100%' } : undefined} contentStyle={{ flexDirection: 'column-reverse' }}>
      {show2 &&
        <ServerItem>
          <TypewriterMarkdown
            content={customContent||MDcontent}
            speed={20}
          onComplete={() => setLoading(false)}
          />
        </ServerItem>
      }
      {show1 && <UserItem message={'问了一个问题'} />}
    </AgentScrollLayout>
    {!autoOutPut&&<div className={'flex justify-end px-12 py-12'}>
    <button style={{width: '100px'}} disabled={loading} onClick={() => {
      setLoading(true);
        setShow1(true)
        setTimeout(() => {
          setShow2(true)
        }, 1000);
      }}>
        {loading?'生成中':'开始'}
      </button>
    </div>}
  </div>
}

export default AgentScroller5;
