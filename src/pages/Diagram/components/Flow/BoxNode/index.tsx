import {  useContext ,useCallback} from "react";
import { DiagramContext } from "../../../../../contexts/DiagramContext";
import { BsTrash3 } from "react-icons/bs";
import { ButtonNode, ButtonNodeDelete, NodeToolbarStyled } from "../style";
import { Project } from "../../../../../utils/Project";
import { BoxStyled } from "./style";

interface BoxNodeProps {
    data: { label: string };
    id: string;
}

export function BoxNode({ data, id }: BoxNodeProps) {
    const { nodes, edges,handleSetNodes,handleSetEdges} = useContext(DiagramContext);

    const handleButtonDeleteClick = useCallback(() => {
        Project.deleteNodesById([id], nodes, edges, handleSetNodes, handleSetEdges);
    }, [id, nodes, edges, handleSetNodes, handleSetEdges]);
    

    return (
        <BoxStyled>
            {data.label}
            <NodeToolbarStyled >
                <ButtonNodeDelete onClick={handleButtonDeleteClick}>
                    <BsTrash3 />
                </ButtonNodeDelete>
            </NodeToolbarStyled>
        </BoxStyled>
    );
}
