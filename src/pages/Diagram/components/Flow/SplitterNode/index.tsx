import { useContext,useState,useEffect } from "react";
import { Handle, Position } from "reactflow";
import "./../styles-nodes.css";
import { DiagramContext } from "../../../../../contexts/DiagramContext";
import { BsTrash3 } from "react-icons/bs";

import { ButtonNode, NodeToolbarStyled } from "../style";
import { SplitterStyled } from "./style";
import {  Project } from "../../../../../utils/Project";

interface SplitterNodeProps {
    data: { label: string ,title:string};
    id: string;
    
}

export function SplitterNode({ data, id }: SplitterNodeProps) {
    const { nodes, edges, handleSetNodes, handleSetEdges } =
        useContext(DiagramContext);

    const handleButtonDeleteClick = () => {
        Project.deleteNodeBy(id, nodes, edges, handleSetNodes, handleSetEdges);
    };
    
    return (
        <SplitterStyled title={data.title}>
            <NodeToolbarStyled>
                <ButtonNode onClick={handleButtonDeleteClick}>
                    <BsTrash3 />
                </ButtonNode>
            </NodeToolbarStyled>
            <Handle type="target" position={Position.Top} isConnectable  />
            <label>{data.label}</label>
            <Handle type="source" position={Position.Bottom} isConnectable />
        </SplitterStyled>
    );
}
