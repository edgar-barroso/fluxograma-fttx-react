import { useContext, useState } from "react";
import { Handle, Position } from "reactflow";
import "./../styles-nodes.css";
import { DiagramContext } from "../../../../../contexts/DiagramContext";
import {
    BsHouseCheckFill,
    BsHouseSlashFill,
    BsHouseUpFill,
    BsTrash3,
} from "react-icons/bs";
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

    const handleButtonDeleteClick = () => {
        Project.deleteNodeById(id, nodes, edges, handleSetNodes, handleSetEdges);
    };

    const handleButtonClientClick = () => {
        data.client = !data.client;
        setActivate(!activate);
    };

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
