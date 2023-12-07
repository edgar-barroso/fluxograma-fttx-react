import { useState, useContext } from "react";
import { BsLock, BsUnlock } from "react-icons/bs";
import { NodeResizer } from "reactflow";
import { DiagramContext } from "../../../../../contexts/DiagramContext";
import { NodeToolbarStyled, ButtonNode } from "../style";
import { BoxStyled } from "./style";

interface BoxNodeProps {
    data: { box: { name: string ,isLocked:boolean} };
    id: string;
}

export function BoxNode({ data, id }: BoxNodeProps) {
    const [isLocked, setIsLocked] = useState(data.box.isLocked);
    const { nodes, setNodes } = useContext(DiagramContext);

    const handleSetLockedChildren = () => {
        setIsLocked(true);
        const nodeBox = nodes.find((node) => node.id === id);
        if (nodeBox) {
            const updatedNodes = nodes.map((node) => {
                if(node.id === id){
                    node.data.box!.isLocked = true
                }
                if (
                    node.id !== id &&
                    node.position.x > nodeBox.position.x &&
                    node.position.y > nodeBox.position.y &&
                    node.position.x + node.width! <
                        nodeBox.position.x + nodeBox.width! &&
                    node.position.y + node.height! <
                        nodeBox.position.y + nodeBox.height!
                ) {
                    node.position.x = node.position.x - nodeBox.position.x;
                    node.position.y = node.position.y - nodeBox.position.y;
                    node.parentNode = id;
                    node.extent = "parent";
                }
                return node;
            });

            setNodes(updatedNodes);
        }
    };

    const handleSetUnLockedChildren = () => {
        setIsLocked(false);
        const nodeBox = nodes.find((node) => node.id === id);
        if (nodeBox) {
            const updatedNodes = nodes.map((node) => {
                if(node.id === id){
                    node.data.box!.isLocked = false
                }
                if (node.parentNode === id) {
                    node.parentNode = undefined;
                    node.extent = undefined;
                    node.position.x = node.position.x + nodeBox.position.x;
                    node.position.y = node.position.y + nodeBox.position.y;
                }
                return node;
            });

            setNodes(updatedNodes);
        }
    };

    return (
        <BoxStyled>
            <NodeToolbarStyled>
                {!isLocked ? (
                    <ButtonNode onClick={handleSetLockedChildren}>
                        <BsLock />
                    </ButtonNode>
                ) : (
                    <ButtonNode onClick={handleSetUnLockedChildren}>
                        <BsUnlock />
                    </ButtonNode>
                )}
            </NodeToolbarStyled>
            <h1>{data.box.name}</h1>
        </BoxStyled>
    );
}
