import { useCallback, useContext } from "react";
import { DefaultEdgeOptions, EdgeTypes, MiniMap, Controls, Background, NodeChange, applyNodeChanges } from "reactflow";
import { DiagramContext } from "../../../../contexts/DiagramContext";
import { BoxNode } from "./BoxNode";
import { CustomEdge } from "./CustomEdge";
import { DBmMeasureNode } from "./DBmMeasureNode";
import { DistanceNode } from "./DistanceNode";
import { OLTNode } from "./OLTNode";
import { SplitterNode1x2B } from "./SplitterNode1x2B";
import { ReactFlowContainer } from "./style";
import { SplitterNode1x4B } from "./SplitterNode1x4B";
import { SplitterNode1x8B } from "./SplitterNode1x8B";
import { SplitterNode1x16B } from "./SplitterNode1x16B";
import { SplitterNode1x32B } from "./SplitterNode1x32B";
import { SplitterNodeD } from "./SplitterNodeD";


const edgeOptions: DefaultEdgeOptions = {
    animated: false,
    style: {
        stroke: "#7c7c7c",
        opacity: 0.8,
        strokeWidth: 1,
    },
};

const nodeTypes = {
    distance: DistanceNode,
    splitterNode1x2B: SplitterNode1x2B,
    splitterNode1x4B: SplitterNode1x4B,
    splitterNode1x8B: SplitterNode1x8B,
    splitterNode1x16B: SplitterNode1x16B,
    splitterNode1x32B: SplitterNode1x32B,
    "splitterNode1x2D-1/99":SplitterNodeD,
    "splitterNode1x2D-2/98":SplitterNodeD,
    "splitterNode1x2D-5/95":SplitterNodeD,
    "splitterNode1x2D-10/90":SplitterNodeD,
    "splitterNode1x2D-15/85":SplitterNodeD,
    "splitterNode1x2D-20/80":SplitterNodeD,
    "splitterNode1x2D-25/75":SplitterNodeD,
    "splitterNode1x2D-30/70":SplitterNodeD,
    "splitterNode1x2D-35/65":SplitterNodeD,
    "splitterNode1x2D-40/60":SplitterNodeD,
    "splitterNode1x2D-45/55":SplitterNodeD,
    box: BoxNode,
    olt: OLTNode,
    dBmMeasure: DBmMeasureNode,
};

const edgeTypes: EdgeTypes = {
    custom: CustomEdge,
};



export function Flow() {
    const { nodes, edges,setNodes } =
        useContext(DiagramContext);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) =>
            setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );

    return (
        <ReactFlowContainer
            // onKeyDown={handleKeyDown }
            // onContextMenu={(event)=>{event.preventDefault()}}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            // onEdgesChange={onEdgesChange}
            // onEdgeUpdate={onEdgeUpdate}
            // onEdgeUpdateStart={onEdgeUpdateStart}
            // onEdgeUpdateEnd={onEdgeUpdateEnd}
            // onConnect={onConnect}
            attributionPosition="top-right"
            defaultEdgeOptions={edgeOptions}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            zoomOnDoubleClick={false}
            maxZoom={4}
            fitView>
            <MiniMap
                style={{
                    height: 120,
                }}
                zoomable
                pannable
            />
            <Controls />
            <Background />
        </ReactFlowContainer>
    );
}
