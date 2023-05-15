import * as Dialog from "@radix-ui/react-dialog";
import { ButtonCreate, Content, Overlay, Ports, Title } from "./style";
import { DiagramContext } from "../../../../contexts/DiagramContext";
import { useContext, useState ,useCallback} from "react";
import { Project } from "../../../../utils/Project";

export function NewBoxModal() {
    const { nodes, edges,handleSetNodes, getCenter } = useContext(DiagramContext);
    const [nameBox, setNameBox] = useState("");

    const handleCheckboxChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setNameBox(event.target.value);
        },
        []
    );

    const handleCreateNewBox = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            Project.createNewBox(
                nodes,
                edges,
                handleSetNodes,
                { name: nameBox },
                getCenter()
            );
        },
        [nodes, handleSetNodes, nameBox, getCenter]
    );

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
