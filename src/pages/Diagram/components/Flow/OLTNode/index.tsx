import { useContext, useEffect, useState,useCallback } from "react";
import { Handle, Position } from "reactflow";
import { DiagramContext } from "../../../../../contexts/DiagramContext";
import { ButtonNode, ButtonNodeDelete, NodeToolbarStyled } from "../style";
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
        Project.setPowerOLT(id, powerOLT, nodes, handleSetNodes);
    }, [powerOLT]);

    const handleInputPowerOLTChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setPowerOLT(Number(event.target.value));
        },
        [setPowerOLT]
    );

    const handleButtonDeleteClick = useCallback(() => {
        Project.deleteNodesById([id], nodes, edges, handleSetNodes, handleSetEdges);
    }, [id, nodes, edges, handleSetNodes, handleSetEdges]);

    return (
        <OLTStyled>
            <NodeToolbarStyled>
                <ButtonNodeDelete onClick={handleButtonDeleteClick}>
                    <BsTrash3 />
                </ButtonNodeDelete>
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
