import { Handle, NodeResizer, Position } from "reactflow";
import { BoxStyled } from "./style";

interface BoxNodeProps {
    data: {box:{name:string}};
    id: string;
}

export function BoxNode({ data, id }: BoxNodeProps) {
    return (
        <BoxStyled>
            <h1>{data.box.name}</h1>
            <NodeResizer
                lineStyle={{
                    border: "1px solid black",
                }}
                handleStyle={{background:"rgb(0, 179, 126)",height:20,width:20,borderRadius:"100%"}}
            />
        </BoxStyled>
    );
}
