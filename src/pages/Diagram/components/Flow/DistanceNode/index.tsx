import { useContext, useState } from "react";
import { Handle, NodeToolbar, Position } from "reactflow";
import "./../styles-nodes.css";
import { DiagramContext } from "../../../../../contexts/DiagramContext";
import { BsTrash3 } from "react-icons/bs";
import { ButtonNode } from "../style";
import { DistanceStyled } from "./style";
import { Project } from "../../../../../utils/Project";

interface DistanceNodeProps {
    id: string;
    data: { label: string };
}

export function DistanceNode({ id, data }: DistanceNodeProps) {
    const { nodes, edges, handleSetNodes, handleSetEdges } =
        useContext(DiagramContext);

    const [value, setValue] = useState(data.label);

    const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let metros = Number(evt.target.value);
        if((metros)>999999){
            metros=999999
        }else if(metros<0){
            metros=0
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
            <Handle type="target" position={Position.Top} isConnectable />
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
            <Handle type="source" position={Position.Bottom} isConnectable />
            <NodeToolbar>
                <ButtonNode onClick={handleButtonDeleteClick}>
                    <BsTrash3 />
                </ButtonNode>
            </NodeToolbar>
        </DistanceStyled>
    );
}
