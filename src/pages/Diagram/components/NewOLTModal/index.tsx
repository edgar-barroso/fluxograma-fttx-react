import * as Dialog from "@radix-ui/react-dialog";
import { ButtonCreate, Content, Overlay, Title } from "./style";
import { DiagramContext } from "../../../../contexts/DiagramContext";
import { useContext, useState } from "react";
import { Project } from "../../../../utils/Project";
import { useReactFlow } from "reactflow";

export function NewOLTModal() {
    const { nodes, handleSetNodes,getCenter } = useContext(DiagramContext);
    const [nameOLT, setNameOLT] = useState('');


    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNameOLT(event.target.value);
    };

    const handleCreateNewBox = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        Project.createNewOLT(nodes, handleSetNodes,{name:nameOLT,numberOfPorts:20},getCenter());
        
    };

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Title>OLT</Title>
                    <div>
                        <input
                            type="text"
                            id="name-olt"
                            placeholder="nome da OLT"
                            onChange={handleCheckboxChange}
                            autoComplete="off"
                            maxLength={32}
                        />

                    <ButtonCreate onClick={handleCreateNewBox}>
                        CRIAR
                    </ButtonCreate>
                    </div>

            </Content>
        </Dialog.Portal>
    );
}
