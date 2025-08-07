import styled from "styled-components"

const Animation1 = () => <StyledAnimationDemo1></StyledAnimationDemo1>
const StyledAnimationDemo1 = styled.div`
    width: 80px;
    height: 80px;
    background-color: var(--color-primary-2);
    animation: morph1 2s linear infinite alternate;
    @keyframes morph1 {
        0%{
            border-radius: 2px;
        }
        100%{
            border-radius: 100px;
        }
    }
`
export default Animation1;
