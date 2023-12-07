import {
    ReactNode,
    createContext,
    useState,
    useCallback,
    useRef,
    useEffect,
} from "react";
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
import project from "../utils/initialProject";
import { setupAPIClient } from "../lib/api";
import { useParams } from "react-router-dom";
import { Project } from "../utils/Project";
import { v4 as uuid } from "uuid";

interface DiagramContextType {
    nodes: NodeFttx[];
    setNodes: React.Dispatch<React.SetStateAction<NodeFttx[]>>;
    edges: Edge[];
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
    onConnect: (params: any) => void;
    createNewSplitter: (type: string) => string;
    createNewDistance: () => string;
    createNewOLT: (props: { name: string; power: number }) => string;
    createNewBox: (props: { name: string,isLocked:boolean }) => string;
    createNewDBmMeasure: () => string;
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
    const [load, setLoad] = useState(false);
    const [timeLastSave, setTimeLastSave] = useState(new Date());
    const { getViewport } = useReactFlow();
    const { projectId } = useParams();
    const edgeUpdateSuccessful = useRef(true);
    const [nodes, setNodes] = useState<NodeFttx[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const onConnect = useCallback(
        (params: any) => setEdges((eds: Edge[]) => addEdge(params, eds)),
        [setEdges]
    );

    async function fetchGetDiagram() {
        const api = setupAPIClient();
        const response = await api.get(`projects/${projectId}`);
        setNodes(await response.data.project.flow.nodes);
        setEdges(await response.data.project.flow.edges);
        setLoad(true);
    }

    useEffect(() => {
        fetchGetDiagram();
    }, []);

    async function saveDiagram(nodes:NodeFttx[],edges:Edge[]) {
        const data = {
            id: projectId,
            flow: {
                nodes,
                edges,
            },
        };
        const api = setupAPIClient();
        await api.patch("projects/update", data);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (
                load &&
                Math.abs(new Date().getTime() - timeLastSave.getTime()) > 1000 * 1
            ) {
                try {
                    const api = setupAPIClient();
                    const response = await api.post("projects/calculate-power", { nodes, edges });
                    const {powers} = response.data
                    const newNodes = nodes.map((node)=>{
                        const nodePower = powers.find((power:any)=>power.id===node.id)
                        if(nodePower)node.data.dBm!.value=nodePower.power
                        return node
                    })
                    setNodes(newNodes)
                    setTimeLastSave(new Date());
                    saveDiagram(newNodes,edges);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };
    
        fetchData();
    }, [load, nodes, edges, timeLastSave]); 

    const getCenter = useCallback(() => {
        const { x, y, zoom } = getViewport();

        return {
            x: (-x + window.innerWidth / 2) * (1 / zoom),
            y: (-y + window.innerHeight / 2) * (1 / zoom),
        };
    }, [getViewport, window.innerWidth, window.innerHeight]);

    const createNewSplitter = (type: string) => {
        const id = uuid();
        const splitter: NodeFttx = {
            id,
            data: { splitter: { isConnector: false } },
            type: `splitterNode${type}`,
            position: getCenter(),
        };
        setNodes([...nodes, splitter]);
        return id;
    };

    const createNewDistance = () => {
        const id = uuid();

        const distance: NodeFttx = {
            id,
            data: { distance: { value: 0 } },
            type: "distance",
            position: getCenter(),
        };
        setNodes([...nodes, distance]);
        return id;
    };

    const createNewOLT = (props: { name: string; power: number }) => {
        const id = uuid();

        const olt: NodeFttx = {
            id,
            data: { olt: { ...props } },
            type: "olt",
            position: getCenter(),
        };
        setNodes([...nodes, olt]);
        return id;
    };

    const createNewBox = (props: { name: string,isLocked:boolean }) => {
        const id = uuid();

        const box: NodeFttx = {
            id,
            data: { box: { ...props } },
            type: "box",
            position: getCenter(),
            style: { zIndex: -999 },
        };
        setNodes([...nodes, box]);
        return id;
    };

    const createNewDBmMeasure = () => {
        const id = uuid();

        const dBmMeasure: NodeFttx = {
            id,
            data: { dBm: { value: 0 } },
            type: "dBmMeasure",
            position: getCenter(),
        };
        setNodes([...nodes, dBmMeasure]);
        return id;
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
