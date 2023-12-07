import { Position } from "reactflow";
import { DBmMeasureContainer } from "./style";
import CustomHandle from "../CustomHandle";
import { useContext, useState } from "react";
import { DiagramContext } from "../../../../../contexts/DiagramContext";

interface DistanceNodeProps {
    id: string;
    data: {dBm:{value:number}};
}

export function DBmMeasureNode({ id, data }: DistanceNodeProps) {
    const {nodes} = useContext(DiagramContext)
    const [node,setNode] = useState(nodes.find(node=>node.id===id))
    return (
        <DBmMeasureContainer
            withinRange
            client
            >
            <CustomHandle id={`${id}_port-0`} type="target" position={Position.Top} isConnectable={1} />
            <label>{node && node.data.dBm!.value.toFixed(2)}dBm</label>
            <CustomHandle
                type="source"
                id={`${id}_port-1`}
                position={Position.Bottom}
                isConnectable={1}
            />
            
        </DBmMeasureContainer>
    );
}
