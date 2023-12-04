import { randomUUID } from "crypto";
import { ReactNode, createContext, useState, useCallback, useRef } from "react";
import {
    Edge,
    NodeChange,
    NodeFttx,
    useEdgesState,
    useNodesState,
    useReactFlow,
    EdgeChange,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    updateEdge,
} from "reactflow";
interface DiagramContextType {
    nodes: NodeFttx[];
    setNodes: React.Dispatch<React.SetStateAction<NodeFttx[]>>;
    edges: Edge[];
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
    onConnect: (params: any) => void;
    createNewSplitter: (type: string) => void;
    createNewDistance: () => void;
    createNewOLT: (props: { name: string; power: number }) => void;
    createNewBox: (props: { name: string }) => void;
    createNewDBmMeasure: () => void;
    onEdgeUpdateStart: () => void;
    onEdgeUpdate: (oldEdge: Edge, newConnection: any) => void;
    onEdgeUpdateEnd: (_: any, edge: Edge) => void;
    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
}

interface DiagramProviderProps {
    children: ReactNode;
}

export const DiagramContext = createContext({} as DiagramContextType);

export function DiagramProvider({ children }: DiagramProviderProps) {
    const { getViewport } = useReactFlow();
    const edgeUpdateSuccessful = useRef(true);
    const [nodes, setNodes] = useState<NodeFttx[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const onConnect = useCallback(
        (params: any) => setEdges((eds: Edge[]) => addEdge(params, eds)),
        [setEdges]
    );

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
            data: {splitter:{isConnector:false}},
            type: `splitterNode${type}`,
            position: getCenter(),
        };
        setNodes([...nodes, splitter]);
    };

    const createNewDistance = () => {
        const distance: NodeFttx = {
            id: crypto.randomUUID(),
            data: { distance: { value: 0 } },
            type: "distance",
            position: getCenter(),
        };
        setNodes([...nodes, distance]);
    };

    const createNewOLT = (props: { name: string; power: number }) => {
        const olt: NodeFttx = {
            id: crypto.randomUUID(),
            data: { olt: { ...props } },
            type: "olt",
            position: getCenter(),
        };
        setNodes([...nodes, olt]);
    };

    const createNewBox = (props: { name: string }) => {
        const box: NodeFttx = {
            id: crypto.randomUUID(),
            data: { box: { ...props } },
            type: "box",
            position: getCenter(),
            style: { zIndex: -999 },
        };
        setNodes([...nodes, box]);
    };

    const createNewDBmMeasure = () => {
        const dBmMeasure: NodeFttx = {
            id: crypto.randomUUID(),
            data: { dBm: { value: 0 } },
            type: "dBmMeasure",
            position: getCenter(),
        };
        setNodes([...nodes, dBmMeasure]);
    };

    const onEdgeUpdateStart = useCallback(() => {
        edgeUpdateSuccessful.current = false;
    }, []);

    const onEdgeUpdate = useCallback((oldEdge: Edge, newConnection: any) => {
        edgeUpdateSuccessful.current = true;
        setEdges((els) => updateEdge(oldEdge, newConnection, els));
    }, []);

    const onEdgeUpdateEnd = useCallback((_: any, edge: Edge) => {
        if (!edgeUpdateSuccessful.current) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }
        edgeUpdateSuccessful.current = true;
    }, []);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) =>
            setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) =>
            setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    return (
        <DiagramContext.Provider
            value={{
                nodes,
                setNodes,
                edges,
                setEdges,
                onConnect,
                createNewSplitter,
                createNewDistance,
                createNewOLT,
                createNewBox,
                createNewDBmMeasure,
                onNodesChange,
                onEdgesChange,
                onEdgeUpdateEnd,
                onEdgeUpdateStart,
                onEdgeUpdate,
            }}
        >
            {children}
        </DiagramContext.Provider>
    );
}
