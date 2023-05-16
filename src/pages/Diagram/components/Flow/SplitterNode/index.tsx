import { useContext, useCallback, useState, useEffect } from "react";
import { Handle, Position } from "reactflow";
import { DiagramContext } from "../../../../../contexts/DiagramContext";
import { BsTrash3 } from "react-icons/bs";
import { GrLink } from "react-icons/gr";
import { ButtonNode, ButtonNodeDelete, NodeToolbarStyled } from "../style";
import { SplitterStyled } from "./style";
import { Project } from "../../../../../utils/Project";

interface SplitterNodeProps {
    data: { label: string; title: string; fusion?: boolean };
    id: string;
}

export function SplitterNode({ data, id }: SplitterNodeProps) {
    const { nodes, edges, handleSetNodes, handleSetEdges } =
        useContext(DiagramContext);
    const [fusion, setFusion] = useState(data.fusion);

    useEffect(() => {
        data.fusion = fusion;
    }, [fusion]);

    const handleButtonDeleteClick = useCallback(() => {
        Project.deleteNodesById(
            [id],
            nodes,
            edges,
            handleSetNodes,
            handleSetEdges
        );
    }, [id, nodes, edges, handleSetNodes, handleSetEdges]);

    return (
        <SplitterStyled title={data.title}>
            <NodeToolbarStyled>
                <ButtonNodeDelete onClick={handleButtonDeleteClick}>
                    <BsTrash3 />
                </ButtonNodeDelete>
                <ButtonNode
                    onClick={() => {
                        setFusion(!fusion);
                    }}
                    color={"#00B37E"}>
                    {fusion ? 'fusionado' : 'conectorizado'}
                </ButtonNode>
            </NodeToolbarStyled>
            <Handle type="target" position={Position.Top} isConnectable />
            <label>{data.label}</label>
            <Handle type="source" position={Position.Bottom} isConnectable />
        </SplitterStyled>
    );
}
