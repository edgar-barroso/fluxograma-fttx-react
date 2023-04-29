import { useCallback, useContext, useRef, useEffect, useState } from "react";
import ReactFlow, {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Controls,
    DefaultEdgeOptions,
    Edge,
    EdgeChange,
    EdgeTypes,
    MiniMap,
    NodeChange,
    NodeFttx,
    updateEdge,
    useOnSelectionChange,
} from "reactflow";
import "reactflow/dist/style.css";
import { DiagramContext } from "../../../../contexts/DiagramContext";
import { DistanceNode } from "./DistanceNode";
import "./styles-nodes.css";
import { SplitterNode } from "./SplitterNode";
import { BoxNode } from "./BoxNode";
import { OLTNode } from "./OLTNode";
import { ClientNode } from "./ClientNode";
import { CustomEdge } from "./CustomEdge";

const edgeOptions: DefaultEdgeOptions = {
    animated: false,
    style: {
        stroke: "#7c7c7c",
    },
};

const nodeTypes = {
    distance: DistanceNode,
    splitter: SplitterNode,
    box: BoxNode,
    olt: OLTNode,
    client: ClientNode,
};

const edgeTypes: EdgeTypes = {
    custom: CustomEdge,
};

const rfStyle = {
    backgroundColor: "#fff",
};

export function Flow() {
    const { nodes, edges, handleSetNodes, handleSetEdges } =
        useContext(DiagramContext);
    const edgeUpdateSuccessful = useRef(false);

    const onNodesChange = useCallback(
        //@ts-ignore
        (changes: NodeChange[]) =>
            //@ts-ignore
            handleSetNodes((nds) => applyNodeChanges(changes, nds)),
        [handleSetNodes]
    );

    const onEdgesChange = useCallback(
        //@ts-ignore
        (changes: EdgeChange[]) =>
            //@ts-ignore
            handleSetEdges((eds) => applyEdgeChanges(changes, eds)),
        [handleSetEdges]
    );

    //@ts-ignore
    const onConnect = (connection) => {
        const sourceNode = nodes.find((node) => node.id === connection.source);
        const freeOutputsSource = sourceNode!.fttx.ports!.filter(({ used }) => {
            return !used;
        });

        const targetNode = edges.find(
            (edge) => edge.target === connection.target
        );
        if (freeOutputsSource.length > 0 && !targetNode) {
            connection.label =
                sourceNode!.type === "splitter"
                    ? `${freeOutputsSource[0].loss}%`
                    : "";
            connection.port = freeOutputsSource[0].port;
            connection.type = "custom";
            sourceNode?.fttx.ports?.forEach((nodePort) => {
                if (freeOutputsSource[0].port === nodePort.port) {
                    nodePort.used = true;
                }
            });

            const newNodes = nodes.map((node: NodeFttx) => {
                if (node.id === sourceNode!.id) {
                    return sourceNode;
                }
                return node;
            });
            //@ts-ignore
            handleSetNodes(newNodes);
            //@ts-ignore
            handleSetEdges((eds) => addEdge(connection, eds));
        }
    };

    const onEdgeUpdateStart = useCallback(() => {
        edgeUpdateSuccessful.current = false;
    }, []);

    //@ts-ignore
    const onEdgeUpdate = (oldEdge, newConnection) => {
        const newSourceNode = nodes.find(
            (node) => node.id === newConnection.source
        );
        const usedNewNode = edges.find(
            (edge) => edge.source === newConnection.source
        );
        const freePorts = newSourceNode!.fttx.ports!.filter(({ used }) => {
            return !used;
        });
        if (freePorts.length > 0 && !usedNewNode) {
            newConnection.label = `${freePorts[0].loss}%`;
            newConnection.port = freePorts[0].port;
            newConnection.type = "custom";

            const oldSourceNode = nodes.find(
                (node) => node.id === oldEdge.source
            );
            //@ts-ignore
            oldSourceNode.fttx.ports[oldEdge.port - 1].used = false;

            //@ts-ignore
            newSourceNode.fttx.ports[freePorts[0].port - 1].used = true;

            //@ts-ignore
            const newNodes = nodes.map((node) => {
                if (node.id === oldSourceNode!.id) {
                    return oldSourceNode;
                }
                if (node.id === newSourceNode!.id) {
                    return newSourceNode;
                }
                return node;
            });
            edgeUpdateSuccessful.current = true;

            //@ts-ignore
            handleSetNodes(newNodes);
            //@ts-ignore
            handleSetEdges((els) => updateEdge(oldEdge, newConnection, els));
        }
    };

    //@ts-ignore
    const onEdgeUpdateEnd = (_, edge) => {
        if (!edgeUpdateSuccessful.current) {
            const sourceNode = nodes.find((node) => node.id === edge.source);
            //@ts-ignore
            sourceNode.fttx.ports[edge.port - 1].used = false;
            const newNodes = nodes.map((node) => {
                if (node.id === sourceNode!.id) {
                    return sourceNode;
                }
                return node;
            });
            //@ts-ignore
            handleSetNodes(newNodes);
            //@ts-ignore
            handleSetEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }

        edgeUpdateSuccessful.current = true;
    };
    return (
        <ReactFlow
            //@ts-ignore
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            onConnect={onConnect}
            style={rfStyle}
            attributionPosition="top-right"
            defaultEdgeOptions={edgeOptions}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            zoomOnDoubleClick={false}
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
        </ReactFlow>
    );
}
