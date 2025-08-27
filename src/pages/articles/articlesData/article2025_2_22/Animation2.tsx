import styled from "styled-components"

const Animation2 = () => <StyledAnimationDemo2></StyledAnimationDemo2>
const StyledAnimationDemo2 = styled.div`
    width: 100px;
    height: 100px;
    background-color: var(--color-primary-2);
    animation: morph2 1s linear infinite alternate;
    @keyframes morph2 {
        0%{
            clip-path: polygon(
                    0% 20%,
                    60% 20%,
                    60% 0%,
                    100% 50%,
                    60% 100%,
                    60% 80%,
                    0% 80%
            );
        }
        100%{
            clip-path: polygon( 
                    0% 20%,
            40% 20%,
            80% 20%,
            80% 50%,
            80% 80%,
            40% 80%,
            0% 80%)
        }
    }
`
export default Animation2;
