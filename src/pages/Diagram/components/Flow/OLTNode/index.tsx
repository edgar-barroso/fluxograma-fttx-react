import {useState,useCallback, useContext } from "react";
import { Handle, NodeResizer, Position } from "reactflow";
import {  ButtonNodeDelete, NodeToolbarStyled } from "../style";
import { OLTStyled } from "./style";
import { BsTrash3 } from "react-icons/bs";
import { DiagramContext } from "../../../../../contexts/DiagramContext";

interface OLTNodeProps {
    data: {olt:{name:string,power:number}  };
    id: string;
}

export function OLTNode({ data, id }: OLTNodeProps) {
    const [powerOLT, setPowerOLT] = useState(data.olt.power)
    const {setNodes,nodes} = useContext(DiagramContext)

    const handleInputPowerOLTChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const power = Number(event.target.value)
            setPowerOLT(Number(power));
            setNodes(nodes.map(node=>{
                if(node.id===id) node.data.olt!.power=power
                return node
            }))
        },
        [setPowerOLT]
    );

    return (
        <OLTStyled>
            <label>{data.olt.name}</label>
            <input
                autoComplete="off"
                type="number"
                placeholder="potencia"
                step={0.1}
                minLength={3}
                className="nodrag"
                value={powerOLT}
                onChange={handleInputPowerOLTChange}
            />
            <Handle type="source" position={Position.Bottom} isConnectable />
        </OLTStyled>
    );
}
