import { Position } from "reactflow";
import CustomHandle from "../CustomHandle";
import { SplitterStyled } from "./style";
import { useContext, useState } from "react";
import { connectorIcon } from "../../../assets";
import { NodeToolbarStyled, ButtonNode } from "../style";
import { DiagramContext } from "../../../../../contexts/DiagramContext";
interface SplitterNodeDProps {
    data: {splitter:{isConnector:boolean}};
    id: string;
    type:string;
}

export function SplitterNodeD({ data, id,type }: SplitterNodeDProps) {
    const [isConnector,setIsConnector] = useState(data.splitter.isConnector)
    const {setNodes,nodes} = useContext(DiagramContext)

    const handleChangeConnection = () => {
        setIsConnector(!isConnector)
        setNodes(nodes.map((node)=>{
            if(node.id===id) node.data.splitter!.isConnector=!isConnector
            return node
        }))

    }
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
                    {type.split("-")[1].split("/")[0]}%
                </text>
                <text
                    x="80"
                    y="75"
                    style={{
                        fontSize: "16px",
                        fontWeight: "600",
                    }}
                >
                    {type.split("-")[1].split("/")[1]}%
                </text>
            </svg>
            <CustomHandle type="target" id={`${id}_port-0`} position={Position.Top} isConnectable={1} />
            <CustomHandle
                type="source"
                id={`${id}_port-1`}
                position={Position.Bottom}
                style={{
                    left: "25%",
                    backgroundColor:isConnector && "blue",

                }}
                isConnectable={1}
            />

            <CustomHandle
                type="source"
                position={Position.Bottom}
                id={`${id}_port-2`}
                style={{
                    left: "75%",
                    backgroundColor:isConnector && "blue",

                }}
                isConnectable={1}
            />
                <NodeToolbarStyled>
                <ButtonNode  onClick={()=>handleChangeConnection()}>
                <img height={20} src={connectorIcon}   />
                </ButtonNode>
            </NodeToolbarStyled>
        </SplitterStyled>
    );
}
