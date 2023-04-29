import * as Dialog from "@radix-ui/react-dialog";
import { ButtonCreate, Content, Overlay, Ports, Title } from "./style";
import { DiagramContext } from "../../../../contexts/DiagramContext";
import { useContext, useState } from "react";
import { Project } from "../../../../utils/Project";
import { useReactFlow } from "reactflow";

export function NewBoxModal() {
    const { nodes, handleSetNodes,getCenter } = useContext(DiagramContext);
    const [nameBox, setNameBox] = useState('');
    

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNameBox(event.target.value);
    };

    const handleCreateNewBox = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        Project.createNewBox(nodes, handleSetNodes,{name:nameBox},getCenter());
        
    };

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Title>Caixa</Title>
                    <div >
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
