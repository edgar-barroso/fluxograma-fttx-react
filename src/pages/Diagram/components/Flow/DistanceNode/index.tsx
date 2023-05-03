import { useContext, useState, useEffect } from "react";
import { Handle, Position } from "reactflow";
import "./../styles-nodes.css";
import { DiagramContext } from "../../../../../contexts/DiagramContext";
import { BsTrash3 } from "react-icons/bs";
import { ButtonNode, NodeToolbarStyled } from "../style";
import { DistanceStyled } from "./style";
import { Project } from "../../../../../utils/Project";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {GiPathDistance} from 'react-icons/gi'

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

    const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
    };

    const handleButtonDeleteClick = () => {
        Project.deleteNodeBy(id, nodes, edges, handleSetNodes, handleSetEdges);
    };

    return (
        <DistanceStyled>
            <GiPathDistance/>
            <Handle type="target" position={Position.Top} isConnectable />
            {inputView && (
                <input
                    id={id}
                    autoComplete="off"
                    type="number"
                    onChange={onChange}
                    value={value}
                    className="nodrag"
                    min={0}
                    max={999999}
                    placeholder="metros"
                />
            )}
            <Handle type="source" position={Position.Bottom} isConnectable />
            <NodeToolbarStyled>
                <ButtonNode onClick={handleButtonDeleteClick}>
                    <BsTrash3 />
                </ButtonNode>
                <ButtonNode
                    onClick={() => {
                        setInputView(!inputView);
                    }}>
                    {inputView ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </ButtonNode>
            </NodeToolbarStyled>
        </DistanceStyled>
    );
}
