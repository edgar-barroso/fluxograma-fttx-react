import React, { FC } from "react";
import { EdgeProps, EdgeLabelRenderer, getSmoothStepPath, BaseEdge } from "reactflow";

export const CustomEdge: FC<EdgeProps> = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    label,
    style
}) => {
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,


    });
    return (
        <>
        <BaseEdge path={edgePath} style={style}  />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        background: "#FFF",
                        fontSize: 10,
                        
                    }}
                    >
                    {label}
                </div>
            </EdgeLabelRenderer>
        </>
    );
};

