import { useState} from "react";
import { Handle, Position } from "reactflow";
import { DistanceStyled } from "./style";

interface DistanceNodeProps {
    id: string;
    data: {};
}

export function DistanceNode({ id, data }: DistanceNodeProps) {
    const [value, setValue] = useState(0);

    const handleInputOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const number = Number(event.target.value)
        if(event.target.value === ""){
            setValue(0)
        }else if(number){
            setValue(number)
        }
    };

    return (
        <DistanceStyled>
            <Handle type="target" position={Position.Top} isConnectable />
            <input
                id={id}
                autoComplete="off"
                type="text"
                onChange={handleInputOnChange}
                value={value}
            />
            <p>(m)</p>
            <Handle type="source" position={Position.Bottom} isConnectable />
        </DistanceStyled>
    );
}
