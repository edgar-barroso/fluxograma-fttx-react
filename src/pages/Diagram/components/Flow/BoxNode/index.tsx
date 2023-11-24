import {  useContext ,useCallback, useState} from "react";
import { DiagramContext } from "../../../../../contexts/DiagramContext";
import { BsTrash3 } from "react-icons/bs";
import { ButtonNode, ButtonNodeDelete, NodeToolbarStyled } from "../style";
import { Project } from "../../../../../utils/Project";
import { BoxStyled } from "./style";
import { CiLock,CiUnlock } from "react-icons/ci";

interface BoxNodeProps {
    data: { label: string };
    id: string;
}

export function BoxNode({ data, id }: BoxNodeProps) {
    const { nodes, edges,handleSetNodes,handleSetEdges} = useContext(DiagramContext);
    const [lock,setLock] = useState(true)

    const handleButtonDeleteClick = useCallback(() => {
        Project.deleteNodesById([id], nodes, edges, handleSetNodes, handleSetEdges);
    }, [id, nodes, edges, handleSetNodes, handleSetEdges]);
    

    return (
        <BoxStyled>
            <NodeToolbarStyled>
                <ButtonNodeDelete onClick={handleButtonDeleteClick}>
                    <BsTrash3 />
                </ButtonNodeDelete>
                <ButtonNode
                    onClick={() => {
                        setLock(!lock)
                    }}>
                    {lock ? <CiUnlock /> : <CiLock/>}
                </ButtonNode>
            </NodeToolbarStyled>
            {data.label}
            <NodeToolbarStyled >
                <ButtonNodeDelete onClick={handleButtonDeleteClick}>
                    <BsTrash3 />
                </ButtonNodeDelete>
            </NodeToolbarStyled>
        </BoxStyled>
    );
}
