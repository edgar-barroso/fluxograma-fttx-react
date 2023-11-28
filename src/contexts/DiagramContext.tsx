import { randomUUID } from "crypto";
import { ReactNode, createContext, useState, useCallback } from "react";
import { Edge, NodeFttx, useReactFlow } from "reactflow";

interface DiagramContextType {
    nodes: NodeFttx[];
    setNodes:React.Dispatch<React.SetStateAction<NodeFttx[]>>
    edges: Edge[];
    createNewSplitter: (type: string) => void;
}

interface DiagramProviderProps {
    children: ReactNode;
}

export const DiagramContext = createContext({} as DiagramContextType);

export function DiagramProvider({ children }: DiagramProviderProps) {
    const { getViewport } = useReactFlow();
    const [nodes, setNodes] = useState<NodeFttx[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    const createNewSplitter = (type: string) => {
        const splitter:NodeFttx = {
            id:crypto.randomUUID(),
            data:{},
            type:`splitterNode${type}`,
            position:getCenter()
        }
        setNodes([...nodes,splitter])
    };

    const getCenter = useCallback(() => {
        const { x, y, zoom } = getViewport();

        return {
            x: (-x + window.innerWidth / 2) * (1 / zoom),
            y: (-y + window.innerHeight / 2) * (1 / zoom),
        };
    }, [getViewport, window.innerWidth, window.innerHeight]);

    return (
        <DiagramContext.Provider
            value={{
                nodes,
                setNodes,
                edges,
                createNewSplitter,
            }}
        >
            {children}
        </DiagramContext.Provider>
    );
}
