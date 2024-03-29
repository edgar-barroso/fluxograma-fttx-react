import { useContext, useState, useEffect, useCallback } from "react";
import { Handle, Position } from "reactflow";
import { DiagramContext } from "../../../../../contexts/DiagramContext";
import { BsTrash3 } from "react-icons/bs";
import { ButtonNode, ButtonNodeDelete, NodeToolbarStyled } from "../style";
import { DistanceStyled } from "./style";
import { Project } from "../../../../../utils/Project";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GiPathDistance } from "react-icons/gi";

interface DistanceNodeProps {
    id: string;
    data: { label: string; visible: boolean };
}

export function DistanceNode({ id, data }: DistanceNodeProps) {
    const { nodes, edges, handleSetNodes, handleSetEdges } =
        useContext(DiagramContext);

    const [inputView, setInputView] = useState(data.visible);
    const [value, setValue] = useState(data.label);

    useEffect(() => {
        data.visible = inputView;
    }, [inputView]);

    const handleInputOnChange = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            let metros = Number(evt.target.value);
            if (metros > 999999) {
                metros = 999999;
            } else if (metros < 0) {
                metros = 0;
            }
            setValue(`${metros}`);
            const newNodes = nodes.map((node) => {
                if (node.id === id) {
                    node.fttx.meters = metros;
                    node.data.label = `${metros}`;
                }
                return node;
            });
            handleSetNodes(newNodes);
        },
        [handleSetNodes, nodes, id]
    );

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
        <DistanceStyled>
            <NodeToolbarStyled>
                <ButtonNodeDelete onClick={handleButtonDeleteClick}>
                    <BsTrash3 />
                </ButtonNodeDelete>
                <ButtonNode
                    onClick={() => {
                        setInputView(!inputView);
                    }}>
                    {inputView ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </ButtonNode>
            </NodeToolbarStyled>
            <GiPathDistance />
            <Handle type="target" position={Position.Top} isConnectable />
            {inputView && (
                <input
                    id={id}
                    autoComplete="off"
                    type="number"
                    onChange={handleInputOnChange}
                    value={value}
                    min={0}
                    max={999999}
                    placeholder="metros"
                />
            )}
            <Handle type="source" position={Position.Bottom} isConnectable />
        </DistanceStyled>
    );
}
