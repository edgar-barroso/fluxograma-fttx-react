import styled from "styled-components";

export const OLTStyled = styled.div`
    background-color: white;
    width: auto;
    padding: 10px 20px;
    border:1px solid black;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:5px 10px ;
    input[type="number"] {
        text-align: center;
        font-size: 1.2rem;
        width: 80px;
        border-radius: 4px;
        border: 1px solid ${(props) => props.theme["green-300"]};
        margin: 5px;
    }
    label{
        cursor: grab;
        padding: 10px;

    }
`;
