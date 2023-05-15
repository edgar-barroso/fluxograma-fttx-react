import styled from "styled-components";

export const OLTStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin:5px 10px ;
    input[type="number"] {
        text-align: center;
        font-size: 1.2rem;
        width: 60px;
        border-radius: 4px;
        border: 1px solid ${(props) => props.theme["green-300"]};
        margin: 5px;
    }
    label{
        cursor: grab;

    }
`;
