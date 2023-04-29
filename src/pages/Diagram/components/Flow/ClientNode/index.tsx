import { useContext, useState } from "react";
import { Handle, NodeToolbar, Position } from "reactflow";
import "./../styles-nodes.css";
import { DiagramContext } from "../../../../../contexts/DiagramContext";
import { BsTrash3 } from "react-icons/bs";
import { ButtonNode, NodeToolbarStyled } from "../style";
import { ClientContainer } from "./style";
import { Project } from "../../../../../utils/Project";
import { AiOutlineHome } from "react-icons/ai";

interface DistanceNodeProps {
    id: string;
    data: { label: string };
}

export function ClientNode({ id, data }: DistanceNodeProps) {
    const { nodes, edges, handleSetNodes, handleSetEdges } =
        useContext(DiagramContext);

    const handleButtonDeleteClick = () => {
        Project.deleteNodeBy(id, nodes, edges, handleSetNodes, handleSetEdges);
    };

    return (
        <ClientContainer>
            <Handle type="target" position={Position.Top} isConnectable />
            <label htmlFor={id}>{data.label}</label>
            <Handle type="source" position={Position.Bottom} isConnectable />
            
            <NodeToolbarStyled>
                <ButtonNode onClick={handleButtonDeleteClick}>
                    <BsTrash3 />
                </ButtonNode>
            </NodeToolbarStyled>
        </ClientContainer>
    );
}
