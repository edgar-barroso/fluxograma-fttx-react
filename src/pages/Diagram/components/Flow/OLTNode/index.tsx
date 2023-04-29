import { useCallback, useContext } from "react";
import { Handle, NodeFttx, NodeToolbar, Position } from "reactflow";
import "./../styles-nodes.css";
import { DiagramContext } from "../../../../../contexts/DiagramContext";
import { ButtonNode, NodeToolbarStyled } from "../style";
import { SlOptions } from "react-icons/sl";
import { Project } from "../../../../../utils/Project";
import { OLTStyled } from "./style";
import { BsTrash3 } from "react-icons/bs";

interface OLTNodeProps {
    data: { label: string };
    id: string;
}

export function OLTNode({ data, id }: OLTNodeProps) {
    const { nodes, edges, handleSetNodes, handleSetEdges } =
        useContext(DiagramContext);

    const handleButtonClick = () => {};

    const handleButtonDeleteClick = () => {
        Project.deleteNodeBy(id, nodes, edges, handleSetNodes, handleSetEdges);
    };

    return (
        <OLTStyled>
            <NodeToolbarStyled>
                <ButtonNode onClick={handleButtonDeleteClick}>
                    <BsTrash3 />
                </ButtonNode>
            </NodeToolbarStyled>
            {data.label}
            <Handle type="source" position={Position.Bottom} isConnectable />
        </OLTStyled>
    );
}
