import { useCallback, useContext, useEffect, useState } from "react";
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

    const [powerOLT, setPowerOLT] = useState(
        nodes.find((node) => node.id === id)?.fttx.power ?? 0
    );

    useEffect(() => {
        Project.setPowerOLT(id,powerOLT,nodes,handleSetNodes)
    }, [powerOLT]);

    const handleInputPowerOLTChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPowerOLT(Number(event.target.value));
    };

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
            <label>{data.label}</label>
            <input
                autoComplete="off"
                type="number"
                placeholder="potencia"
                step={0.01}
                minLength={3}
                className="nodrag"
                value={powerOLT}
                onChange={handleInputPowerOLTChange}
            />
            <Handle type="source" position={Position.Bottom} isConnectable />
        </OLTStyled>
    );
}
