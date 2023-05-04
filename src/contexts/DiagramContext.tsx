import { ReactNode, createContext, useEffect, useState } from "react";
import { Edge, NodeFttx, useReactFlow } from "reactflow";
import { Project } from "../utils/Project";
import { setupAPIClient } from "../lib/api";
import { useParams } from "react-router-dom";

// useOnSelectionChange({
//     onChange: ({ nodes, edges }) =>
//         console.log(nodes)
// });

interface DiagramContextType {
    nodes: NodeFttx[];
    edges: Edge[];
    lossPercentage: number;
    handleSetLossPercentage: (lossPercentage: number) => void;
    handleSetNodes: (data: NodeFttx[]) => void;
    handleSetEdges: (data: Edge[]) => void;
    getCenter: () => { x: number; y: number };
}

interface DiagramProviderProps {
    children: ReactNode;
}
export const DiagramContext = createContext({} as DiagramContextType);

export function DiagramProvider({ children }: DiagramProviderProps) {
    const { getViewport } = useReactFlow();
    const { projectId } = useParams();
    const [nodes, setNodes] = useState<NodeFttx[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [load, setLoad] = useState(false);
    const [timelastSave, setTimeLastSave] = useState(new Date());
    const [lossPercentage, setLossPercentage] = useState(100);

    const getCenter = () => {
        const { x, y, zoom } = getViewport();

        return {
            x: (-x + window.innerWidth / 2) * (1 / zoom),
            y: (-y + window.innerHeight / 2) * (1 / zoom),
        };
    };

    async function fetchGetDiagram() {
        const api = setupAPIClient();
        const response = await api.get(`projects/${projectId}`);
        setNodes(await response.data.project.flow.nodes);
        setEdges(await response.data.project.flow.edges);
    }

    async function fetchUpdateDiagram() {
        const data = {
            id: projectId,
            flow: {
                nodes,
                edges,
            },
        };
        const api = setupAPIClient();
        api.patch("projects/update", data);
    }

    useEffect(() => {
        fetchGetDiagram();
        setLoad(true);
    }, []);

    useEffect(() => {
        if (
            load &&
            Math.abs(new Date().getTime() - timelastSave.getTime()) > 1000 * 5 //segundos
        ) {
            setTimeLastSave(new Date());
            fetchUpdateDiagram();
        }
        const intervalId = setInterval(() => {
            Project.updatePowerDBmMeasuresAllOlts(
                nodes,
                edges,
                handleSetNodes,
                handleSetEdges,
                lossPercentage
            );
        }, 1000);
        return () => clearInterval(intervalId);
    }, [nodes, edges]);

    const handleSetNodes = (data: NodeFttx[]) => {
        setNodes(data);
    };

    const handleSetEdges = (data: Edge[]) => {
        setEdges(data);
    };

    const handleSetLossPercentage = (lossPercentage: number) => {
        setLossPercentage(lossPercentage);
    };

    return (
        <DiagramContext.Provider
            value={{
                nodes,
                edges,
                lossPercentage,
                handleSetLossPercentage,
                handleSetNodes,
                handleSetEdges,
                getCenter,
            }}>
            {children}
        </DiagramContext.Provider>
    );
}
