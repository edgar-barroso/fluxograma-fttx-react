import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import { NodeToolbar } from "reactflow";

export const Overlay = styled(Dialog.Overlay)`
    position: fixed;
    width: 100vw;
    height: 100vh;
    inset: 0;
    background: rgba(0, 0, 0, 0.25);
`;
export const Title = styled(Dialog.Title)`
    color: ${(props) => props.theme["green-300"]};
    text-align: center;
`;

export const Content = styled(Dialog.Content)`
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid ${(props) => props.theme["green-300"]};
    border-radius: 10px;
    background: ${(props) => props.theme["white"]};

    div {
        margin-top: 2rem;

        display: flex;
        flex-direction: column;
        gap: 1rem;
        input {
            border-radius: 6px;
            border: 0;
            border: 2px solid ${(props) => props.theme["green-300"]};
            padding: 0.5rem;
            color: ${(props) => props.theme["green-300"]};

            &::placeholder {
                color: ${(props) => props.theme["gray-100"]};
            }
        }
    }
`;

export const Ports = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(4, 1fr);
    input {
        width: 110px;
    }
`;

export const ButtonCreate = styled(Dialog.Close)`
    height: 58px;
    border: 0;
    background: ${(props) => props.theme["green-300"]};
    color: ${(props) => props.theme.white};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
    margin-top: 1.5rem;
    cursor: pointer;

    &disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &:not(:disabled):hover {
        background: ${(props) => props.theme["green-700"]};
        transition: background-color 0.2s;
    }
`;
