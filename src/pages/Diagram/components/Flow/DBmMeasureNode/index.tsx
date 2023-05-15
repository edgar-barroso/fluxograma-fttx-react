import { useContext, useState, useCallback } from "react";
import { Handle, Position } from "reactflow";
import { DiagramContext } from "../../../../../contexts/DiagramContext";
import { BsHouseCheckFill, BsHouseSlashFill, BsTrash3 } from "react-icons/bs";
import { ButtonNode, NodeToolbarStyled } from "../style";
import { Project } from "../../../../../utils/Project";
import { DBmMeasureContainer } from "./style";

interface DistanceNodeProps {
    id: string;
    data: { label: string; client: boolean; withinRange: boolean };
}

export function DBmMeasureNode({ id, data }: DistanceNodeProps) {
    const { nodes, edges, handleSetNodes, handleSetEdges } =
        useContext(DiagramContext);
    const [activate, setActivate] = useState(data.client);

    const handleButtonDeleteClick = useCallback(() => {
        Project.deleteNodesById(
            [id],
            nodes,
            edges,
            handleSetNodes,
            handleSetEdges
        );
    }, [id, nodes, edges, handleSetNodes, handleSetEdges]);

    const handleButtonClientClick = useCallback(() => {
        data.client = !data.client;
        setActivate((prevActivate) => !prevActivate);
    }, []);

    return (
        <DBmMeasureContainer
            withinRange={data.withinRange}
            client={data.client}>
            <Handle type="target" position={Position.Top} isConnectable />
            <label>{data.label}</label>
            {!data.client && (
                <Handle
                    type="source"
                    position={Position.Bottom}
                    isConnectable
                />
            )}
            <NodeToolbarStyled>
                <ButtonNode onClick={handleButtonDeleteClick}>
                    <BsTrash3 />
                </ButtonNode>
                <ButtonNode
                    color={activate ? "#00B37E" : "black"}
                    onClick={handleButtonClientClick}>
                    {!activate ? <BsHouseSlashFill /> : <BsHouseCheckFill />}
                </ButtonNode>
            </NodeToolbarStyled>
        </DBmMeasureContainer>
    );
}
