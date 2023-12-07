import styled from "styled-components";

export const BoxStyled = styled.div`
    margin: 10px;
    text-align: left;
    word-wrap: break-word;
    height: 350px;
    width: 600px;
    border-radius: 10px;
    background-color: white;
    border: 2px solid ${props=>props.theme["green-300"]};
`;
