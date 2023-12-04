import { toPng } from "html-to-image";
import { Edge, NodeFttx, Node, DefaultEdgeOptions, Position } from "reactflow";
import { Stack } from "./Stack";

interface SplitterProps {}

export interface IntervalONU {
    minValue: number;
    maxValue: number;
}
interface BoxProps {
    name: string;
}

interface OLTProps {
    name: string;
    power: number;
}

interface DiagramFttx {
    nodes: NodeFttx[];
    edges: Edge[];
}

const connectionLosses = {
    connector: -0.5,
    fusion: -0.1,
};

const splitterLosses = {
    splitterNode1x2B: { "port-1": -3.7, "port-2": -3.7 },
    splitterNode1x4B: {
        "port-1": -7.3,
        "port-2": -7.3,
        "port-3": -7.3,
        "port-4": -7.3,
    },
    splitterNode1x8B: {
        "port-1": -10.5,
        "port-2": -10.5,
        "port-3": -10.5,
        "port-4": -10.5,
        "port-5": -10.5,
        "port-6": -10.5,
        "port-7": -10.5,
        "port-8": -10.5,
    },
    splitterNode1x16B: {
        "port-1": -13.7,
        "port-2": -13.7,
        "port-3": -13.7,
        "port-4": -13.7,
        "port-5": -13.7,
        "port-6": -13.7,
        "port-7": -13.7,
        "port-8": -13.7,
        "port-9": -13.7,
        "port-10": -13.7,
        "port-11": -13.7,
        "port-12": -13.7,
        "port-13": -13.7,
        "port-14": -13.7,
        "port-15": -13.7,
        "port-16": -13.7,
    },
    splitterNode1x32B: {
        "port-1": -17.2,
        "port-2": -17.2,
        "port-3": -17.2,
        "port-4": -17.2,
        "port-5": -17.2,
        "port-6": -17.2,
        "port-7": -17.2,
        "port-8": -17.2,
        "port-9": -17.2,
        "port-10": -17.2,
        "port-11": -17.2,
        "port-12": -17.2,
        "port-13": -17.2,
        "port-14": -17.2,
        "port-15": -17.2,
        "port-16": -17.2,
        "port-17": -17.2,
        "port-18": -17.2,
        "port-19": -17.2,
        "port-20": -17.2,
        "port-21": -17.2,
        "port-22": -17.2,
        "port-23": -17.2,
        "port-24": -17.2,
        "port-25": -17.2,
        "port-26": -17.2,
        "port-27": -17.2,
        "port-28": -17.2,
        "port-29": -17.2,
        "port-30": -17.2,
        "port-31": -17.2,
        "port-32": -17.2,
    },
    "splitterNode1x2D-1/99": { "port-1": -21.6, "port-2": -0.3 },
    "splitterNode1x2D-2/98": { "port-1": -18.7, "port-2": -0.4 },
    "splitterNode1x2D-5/95": { "port-1": -14.6, "port-2": -0.5 },
    "splitterNode1x2D-10/90": { "port-1": -11, "port-2": -0.7 },
    "splitterNode1x2D-15/85": { "port-1": -9.6, "port-2": -1 },
    "splitterNode1x2D-20/80": { "port-1": -7.9, "port-2": -1.4 },
    "splitterNode1x2D-25/75": { "port-1": -6.95, "port-2": -1.7 },
    "splitterNode1x2D-30/70": { "port-1": -6, "port-2": -1.9 },
    "splitterNode1x2D-35/65": { "port-1": -5.35, "port-2": -2.3 },
    "splitterNode1x2D-40/60": { "port-1": -4.7, "port-2": -2.7 },
    "splitterNode1x2D-45/55": { "port-1": -4.15, "port-2": -3.15 },
};

export class Project {
    static oldProjects = new Stack<DiagramFttx>(20);

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

    // static updatePowerDBmMeasuresAllOlts(
    //     nodes: NodeFttx[],
    //     edges: Edge[],
    //     handleSetNodes: (nodes: NodeFttx[]) => void,
    //     handleSetEdges: (edges: Edge[]) => void,
    //     intervalONU: IntervalONU
    // ) {
    //     let newEdges = edges.map((edge) => {
    //         const newEdge = { ...edge };
    //         newEdge.style = {
    //             ...newEdge.style,
    //             stroke: "#7c7c7c",
    //             opacity: 0.8,
    //             strokeWidth: 1,
    //         };
    //         newEdge.animated = false;
    //         return newEdge;
    //     });

    //     nodes.forEach((node) => {
    //         if (node.type === "olt") {
    //             newEdges = this.updatePowerDBmMeasures(
    //                 nodes,
    //                 newEdges,
    //                 node,
    //                 handleSetNodes,
    //                 intervalONU
    //             );
    //         }
    //     });
    //     handleSetEdges(newEdges);
    // }

    static updatePowerDBmMeasures(
        nodes: NodeFttx[],
        newEdges: Edge[],
        startNode: NodeFttx,
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
            let power = startNode.data.olt?.power ?? 5.38;

            nodesPaths.forEach((node: NodeFttx, index: number) => {
                if (node.type === "olt") {
                    power += connectionLosses.connector;
                    power += connectionLosses.fusion;
                } else if (node.data.distance) {
                    power += (node.data.distance.value / 1000) * -0.35;
                } else if (node.data.dBm) {
                    node.data.dBm.value = power;
                    console.log(power)
                    // if (node.data.client) {
                    //     power += connectionLosses.connector;
                    //     node.data.label = `${power.toFixed(2)}dBm`;
                    // } else {
                    //     node.data.label = `${power.toFixed(2)}dBm`;
                    // }
                    // if (
                    //     power < intervalONU.maxValue &&
                    //     power > intervalONU.minValue
                    // ) {
                    //     node.data.withinRange = true;
                    // } else {
                    //     node.data.withinRange = false;
                    // }
                    dBmMeasures.push(node);
                } else if (node.data.splitter) {
                    if (node.data.splitter.isConnector) {
                        power += connectionLosses.connector;
                    } else {
                        power += 2 * connectionLosses.fusion;
                    }
                    if (index < nodesPaths.length - 1) {

                        const edge = newEdges.find(
                            (edge) => edge.target === nodesPaths[index + 1].id
                        );
                        power += splitterLosses[node.type][edge?.sourceHandle?.split("_")[1]]
                    }

                    // power += splittersBalancedLosses[node.data.label];

                    // if (index < nodesPaths.length - 1) {
                    //     const edge = newEdges.find(
                    //         (edge) => edge.target === nodesPaths[index + 1].id
                    //     );

                    //     //@ts-ignore
                    //     const { port } = edge;

                    //     const portAtributes = node.fttx.ports?.find(
                    //         (item) => item.port === port
                    //     );

                    //     power +=
                    //         splittersUnalancedLosses[`${portAtributes?.loss}`];
                    // } else {
                    //     const portAtributes = node.fttx.ports?.find(
                    //         (item) => item.port === 2
                    //     );
                    //     power +=
                    //         splittersUnalancedLosses[`${portAtributes?.loss}`];
                    // }
                }
                // newEdges = newEdges.map((edge) => {
                //     if (edge.source === node.id && edge.style) {
                //         const newEdge = { ...edge };
                //         newEdge.style = {
                //             ...newEdge.style,
                //             stroke: "#00B37E",
                //             opacity:
                //                 (1 / (1 + Math.abs(5.38 - power) / 40)) * 0.8 +
                //                 0.3,
                //             strokeWidth:
                //                 (1 / (1 + Math.abs(5.38 - power) / 40)) * 1.5 +
                //                 0.5,
                //         };
                //         newEdge.animated = true;
                //         return newEdge;
                //     }
                //     return edge;
                // });
            });
        }

        // this.setPowerInDBmMeasure(dBmMeasures, nodes, handleSetNodes);
        // return newEdges;
    }
}
