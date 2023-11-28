import { Handle, Position } from "reactflow";
import { SplitterStyled } from "./style";
interface SplitterNode1x4BProps {
    data: {};
    id: string;
}



export function SplitterNode1x4B({ data, id }: SplitterNode1x4BProps) {
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
                        fontSize: "20px",
                        fill: "black",
                    }}
                >
                    1x4B
                </text>
            </svg>
                        
            <Handle type="target" position={Position.Top} isConnectable />

            {new Array(4).fill(0).map((_, index) => (
                <Handle
                    type="source"
                    key={`port$-${index + 1}`}
                    id={`port$-${index + 1}`}
                    position={Position.Bottom}
                    style={{
                        left: `${index * (100 / 4) + 100 / 4 / 2}%`,
                    }}
                    isConnectable
                />
            ))}
        </SplitterStyled>
    );
}
