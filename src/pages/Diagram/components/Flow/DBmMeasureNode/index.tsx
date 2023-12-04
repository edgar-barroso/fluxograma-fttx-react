import { Handle, Position } from "reactflow";
import { DBmMeasureContainer } from "./style";
import CustomHandle from "../CustomHandle";

interface DistanceNodeProps {
    id: string;
    data: {dBm:{value:number}};
}

export function DBmMeasureNode({ id, data }: DistanceNodeProps) {
    return (
        <DBmMeasureContainer
            withinRange
            client
            >
            <CustomHandle id={`${id}_port-0`} type="target" position={Position.Top} isConnectable={1} />
            <label>{data.dBm.value.toFixed(2)}dBm</label>
            <CustomHandle
                type="source"
                id={`${id}_port-1`}
                position={Position.Bottom}
                isConnectable={1}
            />
            
        </DBmMeasureContainer>
    );
}
