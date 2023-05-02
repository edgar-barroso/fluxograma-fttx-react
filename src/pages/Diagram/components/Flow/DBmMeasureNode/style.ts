import styled from "styled-components";

export const DBmMeasureContainer = styled.div`
    text-align: center;
    * {
        cursor: grab;
    }
    label {
        font-size: 8px;
    }
`;

export const CheckBoxClientContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 3px;
    padding-top: 10px;
    justify-content: center;
    label{
        color:black;
        font-size:12px;
    }
    input{
        width: 10px;
    }
`;
