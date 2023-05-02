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
    padding: 20px;
    border-radius: 10px;
    label {
        text-align: center;
        font-weight: 700;
        color: ${(props) => props.theme["green-300"]};
    }
    input[type="range"] {
        -webkit-appearance: none;
        width: 100%;
        height: 10px;
        border-radius: 5px;
        background-color: #eee;
        outline: none;
        ::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #333;
            cursor: pointer;
        }
        ::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #333;
            cursor: pointer;
        }
        ::-webkit-slider-thumb {
            background-color:white;
            border: 2px solid  ${(props) => props.theme["green-300"]};;
        }
    }
`;
