import {useState,useCallback } from "react";
import { Handle, NodeResizer, Position } from "reactflow";
import {  ButtonNodeDelete, NodeToolbarStyled } from "../style";
import { OLTStyled } from "./style";
import { BsTrash3 } from "react-icons/bs";

interface OLTNodeProps {
    data: {olt:{name:string,power:number}  };
    id: string;
}

export function OLTNode({ data, id }: OLTNodeProps) {
    const [powerOLT, setPowerOLT] = useState(data.olt.power)


    const handleInputPowerOLTChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setPowerOLT(Number(event.target.value));
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
