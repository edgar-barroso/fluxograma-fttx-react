import { Position } from "reactflow";
import { SplitterStyled } from "./style";
import CustomHandle from "../CustomHandle";
interface SplitterNode1x2BProps {
    data: {};
    id: string;
}

export function SplitterNode1x2B({ data, id }: SplitterNode1x2BProps) {
    return (
        <SplitterStyled>
            <svg width="100" height="80">
                <polygon
                    points="50,0 0,79 100,79"
                    fill="white"
                    stroke="black"
                />
                <text
                    x="35"
                    y="70"
                    style={{
                        fontFamily: "Arial",
                        fontSize: "20",
                        fill: "black",
                    }}
                >
                    1x2
                </text>
            </svg>

            <CustomHandle id="port-0" type="target" position={Position.Top} isConnectable={1} />
            <CustomHandle
                type="source"
                id="port-1"
                position={Position.Bottom}
                style={{
                    left: "15%",
                }}
                isConnectable={1}
            
            />

            <CustomHandle
                type="source"
                position={Position.Bottom}
                id="port-2"
                style={{
                    left: "85%",
                }}
                isConnectable={1}
            />
        </SplitterStyled>
    );
}
