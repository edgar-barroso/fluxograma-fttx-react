import { Handle, Position } from "reactflow";
import { SplitterStyled } from "./style";
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
                    x="30"
                    y="70"
                    style={{
                        fontFamily: "Arial",
                        fontSize: "20",
                        fill: "black",
                    }}
                >
                    1x2B
                </text>
            </svg>

            <Handle type="target" position={Position.Top} isConnectable />
            <Handle
                type="source"
                id="port-1"
                position={Position.Bottom}
                style={{
                    left: "15%",
                }}
                onConnect={(params) => console.log("handle onConnect", params)}
                isConnectable
            />

            <Handle
                type="source"
                position={Position.Bottom}
                id="port-2"
                style={{
                    left: "85%",
                }}
                isConnectable
            />
        </SplitterStyled>
    );
}
