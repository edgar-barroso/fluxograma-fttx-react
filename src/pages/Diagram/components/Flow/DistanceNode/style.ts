import styled from "styled-components";

export const DistanceStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 10px;
    cursor: grab;
    input {
        position: absolute;
        left: 10px;
        text-align: center;
        margin: 5px;
        border: 1px solid #00b37e;
        border-radius: 5px;
        color: #000;
        font-size: 12px;
        ::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    }
`;
