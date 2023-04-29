import { NodeToolbar } from "reactflow";
import styled from "styled-components";

interface ButtonContainerProps {
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    display: flex;
    padding: 1rem;
    font-size: 1.5rem;
    align-items: center;
    justify-content: center;
    border: 0;
    z-index: 10;
    background: transparent;
    border: 1px solid ${(props) => props.theme["green-300"]};
    color: ${(props) => props.theme["green-300"]};
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;


    :hover{
        background-color: ${(props) => props.theme["green-300"]};
        color:white;
    }
`;


export const ButtonNode = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
    border: none;
    border: 1px solid #00b37e;
    transition: 0.25s;
    :hover {
        color: white;
        background-color: #00b37e;
        cursor:pointer;
    }

`

export const NodeToolbarStyled = styled(NodeToolbar)`
    display: flex;
    flex-direction: row;
`

