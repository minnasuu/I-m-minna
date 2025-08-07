import styled from "styled-components"

const Animation4 = () => <StyledAnimationDemo4></StyledAnimationDemo4>
const StyledAnimationDemo4 = styled.div`
    width: 100px;
    height: 100px;
    background-color: var(--color-primary-2);
    animation: morph4 2s linear infinite alternate;
    @keyframes morph4 {
        0%{
            clip-path: path('M49.5528 5L60.7785 39.5491L97.1057 39.5491L67.7164 60.9017L78.9421 95.4509L49.5528 74.0983L20.1636 95.4509L31.3893 60.9017L2 39.5491L38.3271 39.5491L49.5528 5Z');
        }
        100%{
            clip-path: path('M49.5528 5L73.3292 22.2746L97.1057 39.5491L88.0239 67.5L78.9421 95.4509L49.5528 95.4509L20.1636 95.4509L11.0818 67.5L2 39.5491L25.7764 22.2746L49.5528 5Z')
        }
    }
`
export default Animation4;
