import { NodeToolbar, ReactFlow } from "reactflow";
import styled from "styled-components";

export const ReactFlowContainer = styled(ReactFlow)`

    background: white;


    .react-flow__node {
        border: none;
        background: transparent;
    }

    .react-flow__node:focus {
    }

    .react-flow__controls-button {
        border: none;
        border: 1px solid ${(props) => props.theme["green-300"]};
        border-radius: 5px;
        margin-bottom: 10px;
        padding: 1rem;
        background: transparent;
    }
    .react-flow__controls-button:hover {
        background: ${(props) => props.theme["green-300"]};
    }

    .react-flow__controls-button:hover svg path {
        fill: white;
    }

    .react-flow__controls-button svg path {
        fill: ${(props) => props.theme["green-300"]};
    }

    .react-flow__controls-button svg {
        max-width: none;
        max-height: none;
    }

    .react-flow__controls {
        box-shadow: none;
    }
    .react-flow__handle {
        width: 5px;
        height: 10px;
        border-radius: 0;
        background-color: ${(props) => props.theme["green-300"]};
        border: 1px solid black;
    }
    .react-flow__connection-path {
        stroke: ${(props) => props.theme["green-300"]};
    }
    .react-flow__handle-top {
    }
    .react-flow__handle-bottom {
    }
    .react-flow__edgeupdater {
        r: 15px;
    }
    @media (max-width: 767px) {
        .react-flow__minimap,
        .react-flow__controls-zoomin,
        .react-flow__controls-zoomout {
            display: none;
        }
        .react-flow__controls {
            padding-bottom: 50px;
        }
        .react-flow__handle {
            width: 12px;
            height: 12px;
            border-radius: 100%;
            border: 1px solid ${(props) => props.theme["green-300"]};
        }
        .react-flow__handle-top {
            /* top: -16px; */
        }
        .react-flow__handle-bottom {
            bottom: -16px;
        }
    }
`;

export const ButtonContainer = styled.button`
    width: 70px;
    display: flex;
    padding: .5rem;
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

`;

interface ButtonNodeProps {
    color?: string;
}

export const ButtonNode = styled.div<ButtonNodeProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
    border: none;
    border: 1px solid #00b37e;
    transition: 0.25s;
    background-color: white;
    :hover {
        color: white;
        background-color: #00b37e;
        cursor: pointer;
    }
    color: ${(props) => props.color};
`;

export const ButtonNodeDelete = styled(ButtonNode)`
    @media (min-width: 767px) {
        display: none;
    }
`;

export const NodeToolbarStyled = styled(NodeToolbar)`
    gap: 5px;
    display: flex;
    flex-direction: column;
`;
