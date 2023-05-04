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
import { DBmMeasureContainer} from "./style";

interface DistanceNodeProps {
    id: string;
    data: { label: string; client: boolean };
}

export function DBmMeasureNode({ id, data }: DistanceNodeProps) {
    const { nodes, edges, handleSetNodes, handleSetEdges } =
        useContext(DiagramContext);

    const [activate, setActivate] = useState(data.client);

    const handleButtonDeleteClick = () => {
        Project.deleteNodeBy(id, nodes, edges, handleSetNodes, handleSetEdges);
    };

    return (
        <DBmMeasureContainer>
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
                    onClick={() => {
                        data.client = !data.client;
                        setActivate(!activate);
                    }}>
                    {!activate ? <BsHouseSlashFill /> : <BsHouseCheckFill />}
                </ButtonNode>
            </NodeToolbarStyled>
        </DBmMeasureContainer>
    );
}
