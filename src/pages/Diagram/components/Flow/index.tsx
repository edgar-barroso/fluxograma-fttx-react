import { useCallback, useContext, useRef, useState, useEffect } from "react";
import {
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
import { SplitterNode } from "./SplitterNode";
import { BoxNode } from "./BoxNode";
import { OLTNode } from "./OLTNode";
import { CustomEdge } from "./CustomEdge";
import { DBmMeasureNode } from "./DBmMeasureNode";
import { ReactFlowContainer } from "./style";
import { Project } from "../../../../utils/Project";

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
    splitter: SplitterNode,
    box: BoxNode,
    olt: OLTNode,
    dBmMeasure: DBmMeasureNode,
};

const edgeTypes: EdgeTypes = {
    custom: CustomEdge,
};



export function Flow() {
    const { nodes, edges, handleSetNodes, handleSetEdges } =
        useContext(DiagramContext);
    const edgeUpdateSuccessful = useRef(false);
    const [selectedNodes, setSelectedNodes] = useState<NodeFttx[]>([]);

    useOnSelectionChange({
        onChange: ({ nodes, edges }) => {
            //@ts-ignore
            setSelectedNodes(nodes);
        },
    });

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (
                (event.ctrlKey && ['Z','z'].includes(event.key))
            ) {
                Project.returnOldProject(handleSetNodes, handleSetEdges);
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Delete") {
            Project.deleteNodesById(
                selectedNodes.map((node) => node.id),
                nodes,
                edges,
                handleSetNodes,
                handleSetEdges
            );
        }
    };

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
        if(oldEdge.source === newConnection.source && 
            oldEdge.target === newConnection.target){
                edgeUpdateSuccessful.current = true;
        }
        else if (oldEdge.source !== newConnection.source) {
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
                handleSetEdges((els) =>
                    updateEdge(oldEdge, newConnection, els)
                );
            }
        } else if (oldEdge.target !== newConnection.target) {
            const usedNewNode = edges.find(
                (edge) => edge.target === newConnection.target
            );

            if (!usedNewNode) {
                const newEdge = { ...oldEdge };
                newEdge.target = newConnection.target;
                //@ts-ignore
                edgeUpdateSuccessful.current = true;

                //@ts-ignore
                handleSetEdges((els) => updateEdge(oldEdge, newEdge, els));
            }
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
        <ReactFlowContainer
            onKeyDown={handleKeyDown}
            // onContextMenu={(event)=>{event.preventDefault()}}
            //@ts-ignore
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            onConnect={onConnect}
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
