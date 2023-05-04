import * as Dialog from "@radix-ui/react-dialog";
import { ButtonCreate, Content, Overlay, Title } from "./style";
import { DiagramContext } from "../../../../contexts/DiagramContext";
import { useContext, useState } from "react";
import { Project } from "../../../../utils/Project";
import { useReactFlow } from "reactflow";

export function NewOLTModal() {
    const { nodes, handleSetNodes, getCenter } = useContext(DiagramContext);
    const [nameOLT, setNameOLT] = useState("");
    const [powerOLT, setPowerOLT] = useState(5.0);

    const handleInputNameOLTChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNameOLT(event.target.value);
    };

    const handleInputPowerOLTChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPowerOLT(Number(event.target.value));
    };

    const handleCreateNewBox = (event: React.MouseEvent<HTMLButtonElement>) => {
        Project.createNewOLT(
            nodes,
            handleSetNodes,
            {
                name: `${nameOLT} - ${String(powerOLT)}`,
                numberOfPorts: 20,
                power: powerOLT,
            },
            getCenter()
        );
    };

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Title>OLT</Title>
                <div>
                    <input
                        type="text"
                        placeholder="nome da OLT"
                        onChange={handleInputNameOLTChange}
                        autoComplete="off"
                        value={nameOLT}
                        maxLength={32}
                    />
                    <input
                        autoComplete="off"
                        type="number"
                        placeholder="potencia"
                        step={0.1}
                        min={0}
                        onChange={handleInputPowerOLTChange}
                        
                    />

                    <ButtonCreate onClick={handleCreateNewBox}>
                        CRIAR
                    </ButtonCreate>
                </div>
            </Content>
        </Dialog.Portal>
    );
}
