import * as Dialog from "@radix-ui/react-dialog";
import { ButtonCreate, Content, Overlay, Title } from "./style";
import { useState, ChangeEvent, useContext } from "react";
import { DiagramContext } from "../../../../contexts/DiagramContext";

const splitters = [
    "1x2B",
    "1x4B",
    "1x8B",
    "1x16B",
    "1x32B",
    "1x2D-1/99",
    "1x2D-2/98",
    "1x2D-5/95",
    "1x2D-10/90",
    "1x2D-15/85",
    "1x2D-20/80",
    "1x2D-25/75",
    "1x2D-30/70",
    "1x2D-35/65",
    "1x2D-40/60",
    "1x2D-45/55",
]
export function NewSplitterModal() {
    const [selectedSplitter, setSelectedSplitter] = useState("1x2B");
    const {createNewSplitter} = useContext(DiagramContext)
    const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        setSelectedSplitter(selectedOption);
    };

    const handleCreateNewSplitter = () =>{
        if(selectedSplitter.includes("D")){
            createNewSplitter(selectedSplitter,)

        }
        createNewSplitter(selectedSplitter)
    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Title>Splitter</Title>
                <form>
                    <select onChange={handleChangeSelect} value={selectedSplitter}>
                        {splitters.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <ButtonCreate onClick={handleCreateNewSplitter}>CRIAR</ButtonCreate>
                </form>
            </Content>
        </Dialog.Portal>
    );
}
