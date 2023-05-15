import {
    ReactNode,
    createContext,
    useEffect,
    useState,
    useCallback,
} from "react";
import { Edge, NodeFttx, useOnSelectionChange, useReactFlow } from "reactflow";
import { IntervalONU, Project } from "../utils/Project";
import { setupAPIClient } from "../lib/api";
import { useParams } from "react-router-dom";

interface DiagramContextType {
    nodes: NodeFttx[];
    edges: Edge[];
    intervalONU: IntervalONU;
    handleSetIntervalONU: ({ minValue, maxValue }: IntervalONU) => void;
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
    const [intervalONU, setIntervalONU] = useState<IntervalONU>({
        minValue: -27,
        maxValue: -8,
    });
    const [StackProject,setStackProject] = useState()


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
                intervalONU
            );
        }, 1000);
        return () => clearInterval(intervalId);
    }, [nodes, edges]);

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

    const handleSetNodes = useCallback((data: NodeFttx[]) => {
        setNodes(data);
    }, []);

    const handleSetEdges = useCallback((data: Edge[]) => {
        setEdges(data);
    }, []);

    const handleSetIntervalONU = useCallback((data: IntervalONU) => {
        setIntervalONU(data);
    }, []);

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
                edges,
                intervalONU,
                handleSetNodes,
                handleSetEdges,
                getCenter,
                handleSetIntervalONU,
            }}>
            {children}
        </DiagramContext.Provider>
    );
}
