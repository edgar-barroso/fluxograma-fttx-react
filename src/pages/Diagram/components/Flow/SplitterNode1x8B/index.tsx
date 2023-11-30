import { Handle, Position } from "reactflow";
import { SplitterStyled } from "./style";
interface SplitterNode1x8BProps {
    data: {};
    id: string;
}

export function SplitterNode1x8B({ data, id }: SplitterNode1x8BProps) {
    return (
        <SplitterStyled>
            <svg width="150" height="80">
                <polygon
                    points="75,0 0,79 150,79"
                    fill="white"
                    stroke="black"
                />
                <text
                    x="55"
                    y="65"
                    style={{
                        fontFamily: "Arial",
                        fontSize: "24px",
                        fill: "black",
                    }}
                >
                    1x8
                </text>
            </svg>

            <Handle type="target" position={Position.Top} isConnectable />
            {new Array(8).fill(0).map((_, index) => (
                <Handle
                    type="source"
                    key={`port$-${index + 1}`}
                    id={`port$-${index + 1}`}
                    position={Position.Bottom}
                    style={{
                        left: `${index * (100 / 8) + 100 / 8 / 2}%`,
                    }}
                    isConnectable
                />
            ))}
        </SplitterStyled>
    );
}
