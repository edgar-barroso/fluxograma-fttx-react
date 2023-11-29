import { Handle, NodeResizer, Position } from "reactflow";
import { BoxStyled } from "./style";

interface BoxNodeProps {
    data: {};
    id: string;
}

export function BoxNode({ data, id }: BoxNodeProps) {
    return (
        <BoxStyled>
            <h1>Caixa A</h1>
            <NodeResizer
                lineStyle={{
                    border: "1px solid black",
                }}
                handleStyle={{background:"rgb(0, 179, 126)",height:20,width:20,borderRadius:"100%"}}
                minWidth={200}
                minHeight={200}
            />
        </BoxStyled>
    );
}
