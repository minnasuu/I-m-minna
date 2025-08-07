import styled from "styled-components";   

type Props = {
  onSend?: (e: any) => void;
};
const AgentTextarea: React.FC<Props> = ({
  onSend

}) => {
  return <div className={'flex column gap-8 p-12 mt-auto width-100 bg-gray radius-12'}>
    <StyledAgentTextarea className={'width-100'}></StyledAgentTextarea>
    <div className="flex justify-end">
      {/*<LandButton text={'添加'}></LandButton>*/}
      <button onClick={onSend}>发送</button>
    </div>
  </div>
}
const StyledAgentTextarea = styled.textarea`
    appearance: none;
    border: none;
    outline: none;
    resize: none;
    background-color: transparent;
    max-height: 400px;
    caret-color: var(--color-primary-6);
    &:focus,
    &:focus-within{
        background-color: transparent;
        border: none;
    }
`
export default AgentTextarea;
