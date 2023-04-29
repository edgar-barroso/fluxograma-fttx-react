import { useCallback, useContext } from "react";
import { Handle, NodeFttx, NodeToolbar, Position } from "reactflow";
import "./../styles-nodes.css";
import { DiagramContext } from "../../../../../contexts/DiagramContext";
import { BsTrash3 } from "react-icons/bs";
import { ButtonNode, NodeToolbarStyled } from "../style";
import { Project } from "../../../../../utils/Project";
import { SlOptions } from "react-icons/sl";
import { BoxStyled } from "./style";

interface BoxNodeProps {
    data: { label: string };
    id: string;
}

export function BoxNode({ data, id }: BoxNodeProps) {
    const { nodes, edges,handleSetNodes,handleSetEdges} = useContext(DiagramContext);

    const handleButtonDeleteClick = () => {
        Project.deleteNodeBy(id,nodes,edges,handleSetNodes,handleSetEdges);
    };

    return (
        <BoxStyled>
            {data.label}
            <NodeToolbarStyled >
                <ButtonNode onClick={handleButtonDeleteClick}>
                    <BsTrash3 />
                </ButtonNode>
            </NodeToolbarStyled>
        </BoxStyled>
    );
}
