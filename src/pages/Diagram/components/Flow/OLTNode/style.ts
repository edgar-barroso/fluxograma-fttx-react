import styled from "styled-components";

export const OLTStyled = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    word-wrap: break-word;
    gap: 20px;
    input[type="number"] {
        text-align: center;
        font-size: 20px;
        width: 60px;
        border-radius: 6px;
        border: 0;
        border: 1px solid ${(props) => props.theme["green-300"]};

        &::placeholder {
            color: ${(props) => props.theme["gray-100"]};
        }

    }
`;
