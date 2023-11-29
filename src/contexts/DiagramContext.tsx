import { randomUUID } from "crypto";
import { ReactNode, createContext, useState, useCallback } from "react";
import { Edge, NodeChange, NodeFttx, useEdgesState, useNodesState, useReactFlow, EdgeChange, addEdge } from "reactflow";
interface DiagramContextType {
    nodes: NodeFttx[];
    setNodes: React.Dispatch<React.SetStateAction<NodeFttx[]>>;
    edges: Edge[];
    onConnect: (params: any) => void
    createNewSplitter: (type: string) => void;
    createNewDistance: () => void;
    createNewOLT: (props: { name: string; power: number }) => void;
    createNewBox: (props: { name: string }) => void;
    createNewDBmMeasure: () => void;
}

interface DiagramProviderProps {
    children: ReactNode;
}

export const DiagramContext = createContext({} as DiagramContextType);

export function DiagramProvider({ children }: DiagramProviderProps) {
    const { getViewport } = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState<NodeFttx[]>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
    const onConnect = useCallback((params:any) => setEdges((eds:Edge[]) => addEdge(params, eds)), [setEdges]);

    const getCenter = useCallback(() => {
        const { x, y, zoom } = getViewport();

        return {
            x: (-x + window.innerWidth / 2) * (1 / zoom),
            y: (-y + window.innerHeight / 2) * (1 / zoom),
        };
    }, [getViewport, window.innerWidth, window.innerHeight]);

    const createNewSplitter = (type: string) => {
        const splitter: NodeFttx = {
            id: crypto.randomUUID(),
            data: {},
            type: `splitterNode${type}`,
            position: getCenter(),
        };
        setNodes([...nodes, splitter]);
    };

    const createNewDistance = () => {
        const distance: NodeFttx = {
            id: crypto.randomUUID(),
            data: {},
            type: "distance",
            position: getCenter(),
        };
        setNodes([...nodes, distance]);
    };

    const createNewOLT = (props: { name: string; power: number }) => {
        const olt: NodeFttx = {
            id: crypto.randomUUID(),
            data: {},
            type: "olt",
            position: getCenter(),
        };
        setNodes([...nodes, olt]);
    };

    const createNewBox = (props: { name: string }) => {
        const box: NodeFttx = {
            id: crypto.randomUUID(),
            data: {},
            type: "box",
            position: getCenter(),
            style: { zIndex: -999 },
        };
        setNodes([...nodes, box]);
    };

    const createNewDBmMeasure = () => {
        const dBmMeasure: NodeFttx = {
            id: crypto.randomUUID(),
            data: {},
            type: "dBmMeasure",
            position: getCenter(),
        };
        setNodes([...nodes, dBmMeasure]);
    };

    return (
        <DiagramContext.Provider
            value={{
                nodes,
                setNodes,
                edges,
                onConnect,
                createNewSplitter,
                createNewDistance,
                createNewOLT,
                createNewBox,
                createNewDBmMeasure,
            }}
        >
            {children}
        </DiagramContext.Provider>
    );
}
