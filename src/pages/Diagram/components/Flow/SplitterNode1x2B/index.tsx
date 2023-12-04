import { Position } from "reactflow";
import { SplitterStyled } from "./style";
import CustomHandle from "../CustomHandle";
import { useContext, useState } from "react";
import { ButtonNode, NodeToolbarStyled } from "../style";
import { TbPlugConnected } from "react-icons/tb";
import { connectorIcon } from "../../../assets";
import { DiagramContext } from "../../../../../contexts/DiagramContext";
interface SplitterNode1x2BProps {
    data: {
        splitter: { isConnector: boolean };
    };
    id: string;
}

export function SplitterNode1x2B({ data, id }: SplitterNode1x2BProps) {
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
            <CustomHandle
                type="target"
                id={`${id}_port-0`}
                position={Position.Top}
                isConnectable={1}
            />
            {new Array(2).fill(0).map((_, index) => (
                <CustomHandle
                    type="source"
                    key={`${id}_port-${index + 1}`}
                    id={`${id}_port-${index + 1}`}
                    position={Position.Bottom}
                    style={{
                        left: `${index * (100 / 2) + 100 / 2 / 2}%`,
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
