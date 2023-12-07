import * as Dialog from "@radix-ui/react-dialog";
import { ButtonCreate, Content, Overlay, Ports, Title } from "./style";
import { DiagramContext } from "../../../../contexts/DiagramContext";
import { useContext, useState, useCallback } from "react";

export function NewBoxModal() {
    const { createNewBox } = useContext(DiagramContext);
    const [nameBox, setNameBox] = useState("");

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNameBox(event.target.value);
    };

    const handleCreateNewBox = () => {
        createNewBox({ name: nameBox , isLocked:false});
    };

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Title>Caixa</Title>
                <div>
                    <input
                        type="text"
                        id="name-box"
                        placeholder="nome da caixa"
                        onChange={handleCheckboxChange}
                        autoComplete="off"
                        maxLength={50}
                    />
                    <ButtonCreate onClick={handleCreateNewBox}>
                        CRIAR
                    </ButtonCreate>
                </div>
            </Content>
        </Dialog.Portal>
    );
}
