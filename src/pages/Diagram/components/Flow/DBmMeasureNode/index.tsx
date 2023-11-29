import { Handle, Position } from "reactflow";
import { DBmMeasureContainer } from "./style";

interface DistanceNodeProps {
    id: string;
    data: {};
}

export function DBmMeasureNode({ id, data }: DistanceNodeProps) {

    return (
        <DBmMeasureContainer
            withinRange
            client
            >
            <Handle type="target" position={Position.Top} isConnectable />
            <label> -22dBm</label>
            <Handle
                type="source"
                position={Position.Bottom}
                isConnectable
            />
            
        </DBmMeasureContainer>
    );
}
