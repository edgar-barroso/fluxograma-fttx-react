import styled from "styled-components";

export const DistanceStyled = styled.div`
    border:1px solid black;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 30px;
    input {
        position: absolute;
        left: 25px;
        top: 5px;
        text-align: center;
        border: 1px solid #00b37e;
        border-radius: 5px;
        width: 70px;
        color: #000;
        font-size: 12px;
        ::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    }
`;
