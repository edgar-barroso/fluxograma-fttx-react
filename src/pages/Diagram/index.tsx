import { ReactFlowProvider } from "reactflow";
import { DiagramProvider } from "../../contexts/DiagramContext";
import { ButtonsBar } from "./components/ButtonsBar";
import { Flow } from "./components/Flow";

export function Diagram() {
    return (
        <ReactFlowProvider>
            <DiagramProvider >
                <Flow />
                <ButtonsBar />
                {/* <ConfigBar/> */}
            </DiagramProvider>
        </ReactFlowProvider>
    );
}
