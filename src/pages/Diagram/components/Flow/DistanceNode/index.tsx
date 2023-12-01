import { useContext, useState} from "react";
import { Handle, Position } from "reactflow";
import { DistanceStyled } from "./style";
import CustomHandle from "../CustomHandle";
import { DiagramContext } from "../../../../../contexts/DiagramContext";

interface DistanceNodeProps {
    id: string;
    data: {distance:{value:number}};
}

export function DistanceNode({ id, data }: DistanceNodeProps) {
    const [value, setValue] = useState(data.distance.value);
    const {setNodes,nodes} = useContext(DiagramContext)


    const handleInputOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const number = Number(event.target.value)
        if(event.target.value === ""){
            setNodes(nodes.map(node=>{
                if(node.id===id) node.data.distance!.value=0
                return node
            }))
            setValue(0)
        }else if(number){
            setNodes(nodes.map(node=>{
                if(node.id===id) node.data.distance!.value=number
                return node
            }))
            setValue(number)
        }

    };

    return (
        <DistanceStyled>
            <CustomHandle id={`${id}_port-0`} type="target" position={Position.Top} isConnectable={1} />
            <input
                id={id}
                autoComplete="off"
                type="text"
                onChange={handleInputOnChange}
                value={value}
            />
            <p>(m)</p>
            <CustomHandle id={`${id}_port-1`} type="source" position={Position.Bottom} isConnectable={1} />
        </DistanceStyled>
    );
}
