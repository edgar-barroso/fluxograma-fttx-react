import * as Dialog from "@radix-ui/react-dialog";
import { ButtonCreate, Content, Overlay, Title } from "./style";
import { DiagramContext } from "../../../../contexts/DiagramContext";
import { useContext, useState, useCallback } from "react";

export function NewOLTModal() {
    const {  createNewOLT } = useContext(DiagramContext);
    const [nameOLT, setNameOLT] = useState("");
    const [powerOLT, setPowerOLT] = useState(5.0);

    const handleInputNameOLTChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setNameOLT(event.target.value);
        },
        []
    );

    const handleInputPowerOLTChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setPowerOLT(Number(event.target.value));
        },
        []
    );

    const handleCreateNewBox = (event: React.MouseEvent<HTMLButtonElement>) => {
        createNewOLT({ name:nameOLT, power:powerOLT });
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
