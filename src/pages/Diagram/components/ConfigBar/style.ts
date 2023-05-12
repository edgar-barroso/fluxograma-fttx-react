import styled from "styled-components";

export const ConfigBarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 20px;
    right: 20px;
    gap: 10px;
    border: 1px solid ${(props) => props.theme["green-300"]};
    padding: 10px;
    border-radius: 10px;
    label {
        text-align: center;
        font-weight: 700;
        color: ${(props) => props.theme["green-300"]};
    }
    input {
        text-align: center;
        font-size: 1.2rem;
        width: 60px;
        height: 40px;
        border-radius: 5px;
        border: 1px solid ${(props) => props.theme["green-300"]};
        color: ${(props) => props.theme["green-300"]};

        -webkit-appearance: textfield !important;
        -moz-appearance: textfield !important;
        appearance: textfield !important;
    }
`;
