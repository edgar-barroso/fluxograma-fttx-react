import styled from "styled-components";

export const ContainerLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    padding: 20px;
    gap: 10px;
    background: white;
    border-radius: 10px;
    label {
        align-self: flex-start;
        color: ${(props) => props.theme["green-500"]};
    }
    p{
        color: #cc1111;
        font-size: 0.8rem;
    }
    a{
        font-size: 0.8rem;
    }
`;

export const Input = styled.input`
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme["green-500"]};
    margin-bottom: 10px;
    padding-bottom: 5px;
    outline: none;
    font-size: 1rem;

    font-weight: 500;

    :focus{
        border-bottom: 2px solid ${(props) => props.theme["green-500"]};
        margin: none;
    }
`;

export const Button = styled.button`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.25s;
    color: ${(props) => props.theme["green-500"]};
    background-color: white;
    border: 1px solid ${(props) => props.theme["green-500"]};
    margin: 10px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme["green-500"]};
        color: white;
        transition: 0s;
    }
`;
