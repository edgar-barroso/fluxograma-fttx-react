import styled from "styled-components";

export const SplitterStyled = styled.div`
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
    label {
        cursor: grab;
        font-size: 0.8rem;
    }
    background-image: url(&{triangleSVG});
`;
