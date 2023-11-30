import { Position } from "reactflow";
import CustomHandle from "../CustomHandle";
import { SplitterStyled } from "./style";
interface SplitterNodeDProps {
    data: { losses: [number, number] };
    id: string;
}

export function SplitterNodeD({ data, id }: SplitterNodeDProps) {
    return (
        <SplitterStyled>
            <svg width="120" height="80">
                <polygon
                    points="60,0 0,79 120,79"
                    fill="white"
                    stroke="black"
                />
               
                    <text
                        x="-20"
                        y="45"
                        transform="rotate(-52 0 0)"
                        style={{
                            fontFamily: "Arial",
                        }}
                    >
                        1x2
                    </text>
                

                <text
                    x="22"
                    y="75"
                    style={{
                        fontSize: "16px",
                        fontWeight: "600",
                    }}
                >
                    {data.losses[0]}%
                </text>
                <text
                    x="80"
                    y="75"
                    style={{
                        fontSize: "16px",
                        fontWeight: "600",
                    }}
                >
                    {data.losses[1]}%
                </text>
            </svg>
            <CustomHandle type="target" position={Position.Top} isConnectable={1} />
            <CustomHandle
                type="source"
                id="port-1"
                position={Position.Bottom}
                style={{
                    left: "25%",
                }}
                isConnectable={1}
            />

            <CustomHandle
                type="source"
                position={Position.Bottom}
                id="port-2"
                style={{
                    left: "75%",
                }}
                isConnectable={1}
            />
        </SplitterStyled>
    );
}
