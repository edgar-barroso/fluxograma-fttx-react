import { toPng } from "html-to-image";
import { Edge, NodeFttx, Node, DefaultEdgeOptions } from "reactflow";

interface SplitterProps {
    ports: Array<{
        port: number;
        loss: number;
        used: boolean;
    }>;
    unbalanced: boolean;
}

export interface IntervalONU {
    minValue: number;
    maxValue: number;
}
interface BoxProps {
    name: string;
}

interface OLTProps {
    name: string;
    numberOfPorts: number;
    power: number;
}

const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: false,
    style: {
        stroke: "#7c7c7c",
        strokeWidth: 1,
        width: 1,
    },
};

const connectionLosses = {
    connector: -0.5,
    fusion: -0.1,
};

const splittersBalancedLosses: { [key: string]: number } = {
    "1x2 B": -3.7,
    "1x4 B": -7.3,
    "1x8 B": -10.5,
    "1x16 B": -13.7,
    "1x32 B": -17.2,
};

const splittersUnalancedLosses: { [key: string]: number } = {
    "1": -21.6,
    "99": -0.3,
    "2": -18.7,
    "98": -0.4,
    "5": -14.6,
    "95": -0.5,
    "10": -11,
    "90": -0.7,
    "15": -9.6,
    "85": -1,
    "20": -7.9,
    "80": -1.4,
    "25": -6.95,
    "75": -1.7,
    "30": -6,
    "70": -1.9,
    "35": -5.35,
    "65": -2.3,
    "40": -4.7,
    "60": -2.7,
    "45": -4.15,
    "55": -3.15,
};

export class Project {
    static createNewDBmMeasure(
        nodes: NodeFttx[],
        handleSetNodes: (nodes: NodeFttx[]) => void,
        position: { x: number; y: number }
    ) {
        const newDBmMeasure: NodeFttx = {
            id: crypto.randomUUID(),
            type: "dBmMeasure",
            data: { label: "", client: false },
            fttx: {
                ports: [{ port: 1, loss: 100, used: false }],
                meters: 0,
            },
            position,
            style: {
                width: 50,
                height: 25,
            },
        };
        handleSetNodes([...nodes, newDBmMeasure]);
    }

    static createNewBox(
        nodes: NodeFttx[],
        handleSetNodes: (nodes: NodeFttx[]) => void,
        box: BoxProps,
        position: { x: number; y: number }
    ) {
        const newBox: NodeFttx = {
            id: crypto.randomUUID(),
            type: "box",
            data: { label: box.name },
            fttx: {},
            position,
            style: {
                width: 300,
                height: 200,
                zIndex: -1,
            },
        };
        handleSetNodes([...nodes, newBox]);
    }

    static createNewSplitter(
        nodes: NodeFttx[],
        handleSetNodes: (nodes: NodeFttx[]) => void,
        splitter: SplitterProps,
        position: { x: number; y: number }
    ) {
        const newSplitter: NodeFttx = {
            id: crypto.randomUUID(),
            data: {
                label: `1x${splitter.ports.length} ${
                    splitter.unbalanced ? "D" : "B"
                }`,
                title: `${splitter.ports
                    .map((item) => `${item.loss}`)
                    .join(" | ")}`,
            },
            type: "splitter",
            fttx: {
                ports: splitter.ports,
                unbalanced: splitter.unbalanced,
            },
            position,
            style: {
                width: 60,
                height: 30,
            },
        };
        handleSetNodes([...nodes, newSplitter]);
    }

    static createNewDistance(
        nodes: NodeFttx[],
        handleSetNodes: (nodes: NodeFttx[]) => void,
        position: { x: number; y: number }
    ) {
        const newDistance: NodeFttx = {
            id: crypto.randomUUID(),
            type: "distance",
            fttx: {
                ports: [{ port: 1, loss: 100, used: false }],
                meters: 0,
            },
            position,
            data: { label: "" },
            style: {},
        };

        handleSetNodes([...nodes, newDistance]);
    }

    static createNewOLT(
        nodes: NodeFttx[],
        handleSetNodes: (nodes: NodeFttx[]) => void,
        olt: OLTProps,
        position: { x: number; y: number }
    ) {
        const oltPorts = [];

        for (let i = 0; i < olt.numberOfPorts; i++) {
            oltPorts.push({
                port: i + 1,
                loss: 100,
                used: false,
            });
        }

        const newBox: NodeFttx = {
            id: crypto.randomUUID(),
            type: "olt",
            data: { label: olt.name },
            fttx: {
                ports: oltPorts,
                power: olt.power,
            },
            position,
            style: {
                width: 200,
                height: 50,
            },
        };
        handleSetNodes([...nodes, newBox]);
    }

    static getPaths(
        nodes: NodeFttx[],
        edges: Edge[],
        startNode: NodeFttx
    ): string[][] {
        const paths: string[][] = [];

        function dfs(node: Node, path: string[]) {
            path.push(node.id);
            const outgoingEdges = edges.filter((e) => e.source === node.id);

            if (outgoingEdges.length === 0) {
                // No outgoing edges means this is a leaf node, so we add the path to the result.
                paths.push(path);
            } else {
                for (const edge of outgoingEdges) {
                    const childNode = nodes.find((n) => n.id === edge.target);
                    if (childNode) {
                        dfs(childNode, [...path]); // Call the function recursively with the child node and a copy of the current path.
                    }
                }
            }
        }

        dfs(startNode, []);

        return paths;
    }

    static deleteNodeById(
        nodeId: string,
        nodes: NodeFttx[],
        edges: Edge[],
        handleSetNodes: (nodes: NodeFttx[]) => void,
        handleSetEdges: (edges: Edge[]) => void
    ) {
        const updateParamsNodes: {
            id: string;
            port: number;
        }[] = [];

        const newEdges = edges.filter((edge) => {
            if (edge.target === nodeId) {
                updateParamsNodes.push({
                    id: edge.source,
                    //@ts-ignore
                    port: edge.port,
                });
                return false;
            }
            if (edge.source === nodeId) {
                return false;
            }
            return true;
        });

        const newNodes = nodes.filter((node: NodeFttx) => node.id !== nodeId);
        newNodes.forEach((node: NodeFttx) => {
            updateParamsNodes.forEach(({ id, port }) => {
                if (id === node.id) {
                    //@ts-ignore
                    node.fttx.ports[port - 1].used = false;
                }
            });
        });

        handleSetEdges(newEdges);
        handleSetNodes(newNodes);
    }

    static updatePowerDBmMeasuresAllOlts(
        nodes: NodeFttx[],
        edges: Edge[],
        handleSetNodes: (nodes: NodeFttx[]) => void,
        handleSetEdges: (edges: Edge[]) => void,
        intervalONU: IntervalONU
    ) {
        let newEdges = edges.map((edge) => {
            const newEdge = { ...edge };
            newEdge.style = {
                ...newEdge.style,
                stroke: "#7c7c7c",
                opacity: 0.8,
                strokeWidth: 1,
            };
            newEdge.animated = false;
            return newEdge;
        });

        nodes.forEach((node) => {
            if (node.type === "olt") {
                newEdges = this.updatePowerDBmMeasures(
                    nodes,
                    newEdges,
                    node,
                    handleSetNodes,
                    intervalONU
                );
            }
        });
        handleSetEdges(newEdges);
    }

    static updatePowerDBmMeasures(
        nodes: NodeFttx[],
        newEdges: Edge[],
        startNode: NodeFttx,
        handleSetNodes: (nodes: NodeFttx[]) => void,
        intervalONU: IntervalONU
    ) {
        const paths = this.getPaths(nodes, newEdges, startNode);
        const dBmMeasures: NodeFttx[] = [];

        for (const path of paths) {
            const nodesPaths: NodeFttx[] = [];
            path.forEach((id) => {
                const node = nodes.find((node) => node.id === id);
                if (node) {
                    nodesPaths.push(node);
                }
            });
            let power = startNode.fttx.power ?? 5.38;

            nodesPaths.forEach((node: NodeFttx, index: number) => {
                if (node.type === "olt") {
                    power += connectionLosses.connector;
                    power += connectionLosses.fusion;
                } else if (node.type === "distance") {
                    power += (node.fttx.meters! / 1000) * -0.35;
                } else if (node.type === "dBmMeasure") {
                    if (node.data.client) {
                        power += connectionLosses.connector;
                        power += connectionLosses.connector;
                        node.data.label = `${power.toFixed(2)}dBm`;
                    } else {
                        node.data.label = `${power.toFixed(2)}dBm`;
                    }
                    if (
                        power < intervalONU.maxValue &&
                        power > intervalONU.minValue
                    ) {
                        node.data.withinRange = true;
                    } else {
                        node.data.withinRange = false;
                    }
                    dBmMeasures.push(node);
                } else if (node.type === "splitter") {
                    if (!node.fttx.unbalanced) {
                        power += splittersBalancedLosses[node.data.label];
                    } else {
                        if (index < nodesPaths.length - 1) {
                            power += connectionLosses.fusion;
                            power += connectionLosses.fusion;
                            const edge = newEdges.find(
                                (edge) =>
                                    edge.target === nodesPaths[index + 1].id
                            );

                            //@ts-ignore
                            const { port } = edge;

                            const portAtributes = node.fttx.ports?.find(
                                (item) => item.port === port
                            );

                            power +=
                                splittersUnalancedLosses[
                                    `${portAtributes?.loss}`
                                ];
                        } else {
                            const portAtributes = node.fttx.ports?.find(
                                (item) => item.port === 2
                            );
                            power +=
                                splittersUnalancedLosses[
                                    `${portAtributes?.loss}`
                                ];
                        }
                    }
                }
                newEdges = newEdges.map((edge) => {
                    if (edge.source === node.id && edge.style) {
                        const newEdge = { ...edge };
                        newEdge.style = {
                            ...newEdge.style,
                            stroke: "#00B37E",
                            opacity:
                                (1 / (1 + Math.abs(5.38 - power) / 40)) * 0.8 +
                                0.3,
                            strokeWidth:
                                (1 / (1 + Math.abs(5.38 - power) / 40)) * 1.5 +
                                0.5,
                        };
                        newEdge.animated = true;
                        return newEdge;
                    }
                    return edge;
                });
            });
        }

        this.setPowerInDBmMeasure(dBmMeasures, nodes, handleSetNodes);
        return newEdges;
    }

    static setPowerInDBmMeasure(
        dBmMeasures: NodeFttx[],
        nodes: NodeFttx[],
        handleSetNodes: (nodes: NodeFttx[]) => void
    ) {
        const newNodes = nodes.map((node) => {
            if (node.type === "dBmMeasure") {
                dBmMeasures.forEach((nodeDBm) => {
                    if (nodeDBm.id === node.id) {
                        return nodeDBm;
                    }
                });
            }
            return node;
        });
        handleSetNodes(newNodes);
    }

    static DownloadPng() {
        const reactFlowHTML =
            document.querySelector<HTMLElement>(".react-flow");
        if (reactFlowHTML) {
            toPng(reactFlowHTML, {
                filter: (node: HTMLElement) => {
                    // we don't want to add the minimap and the controls to the image
                    if (
                        node?.classList?.contains("react-flow__minimap") ||
                        node?.classList?.contains("react-flow__controls")
                    ) {
                        return false;
                    }

                    return true;
                },
            }).then(this.downloadImage);
        }
    }

    static setPowerOLT(
        id: string,
        powerOLT: number,
        nodes: NodeFttx[],
        handleSetNodes: (nodes: NodeFttx[]) => void
    ) {
        handleSetNodes(
            nodes.map((node) => {
                if (node.id === id) {
                    node.fttx.power = powerOLT;
                }
                return node;
            })
        );
    }

    static downloadImage(dataUrl: string): void {
        const a = document.createElement("a");

        a.setAttribute("download", "reactflow.png");
        a.setAttribute("href", dataUrl);
        a.click();
    }
}
