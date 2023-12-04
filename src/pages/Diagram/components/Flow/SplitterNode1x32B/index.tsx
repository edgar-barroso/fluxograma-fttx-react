import { Position } from "reactflow";
import CustomHandle from "../CustomHandle";
import { SplitterStyled } from "./style";
import { ButtonNode, NodeToolbarStyled } from "../style";
import { useContext, useState } from "react";
import { TbPlugConnected } from "react-icons/tb";
import { connectorIcon } from "../../../assets";
import { DiagramContext } from "../../../../../contexts/DiagramContext";
interface SplitterNode1x32BProps {
    data: {splitter:{isConnector:boolean}};
    id: string;
}

export function SplitterNode1x32B({ data, id }: SplitterNode1x32BProps) {
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
            <svg width="500" height="80">
                <polygon
                    points="250,0 0,79 500,79"
                    fill="white"
                    stroke="black"
                />
                <text
                    x="220"
                    y="65"
                    style={{
                        fontFamily: "Arial",
                        fontSize: "24px",
                        fill: "black",
                    }}
                >
                    1x32
                </text>
            </svg>

            <CustomHandle type="target" id={`${id}_port-0`} position={Position.Top} isConnectable={1} />
            {new Array(32).fill(0).map((_, index) => (
                <CustomHandle
                    type="source"
                    key={`${id}_port-${index + 1}`}
                    id={`${id}_port-${index + 1}`}
                    position={Position.Bottom}
                    style={{
                        left: `${index * (100 / 32) + 100 / 32 / 2}%`,
                        backgroundColor:isConnector && "blue",
                    }}
                    isConnectable={1}
                />
            ))}
            <NodeToolbarStyled>
                <ButtonNode  onClick={()=>handleChangeConnection()}>
                <img height={20} src={connectorIcon}   />
                </ButtonNode>
            </NodeToolbarStyled>
        </SplitterStyled>
    );
}
