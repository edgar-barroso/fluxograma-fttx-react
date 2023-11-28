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
