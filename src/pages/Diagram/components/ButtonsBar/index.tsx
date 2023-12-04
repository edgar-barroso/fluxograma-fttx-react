import { useContext } from "react";
import { DiagramContext } from "../../../../contexts/DiagramContext";
import { ButtonContainer } from "../Flow/style";
import { ButtonsBarContainer } from "./style";
import * as Dialog from "@radix-ui/react-dialog";
import { NewSplitterModal } from "../NewSplitterModal";
import { NewBoxModal } from "../NewBoxModal";
import { NewOLTModal } from "../NewOLTModal";
import { caixaSVG, splitterSVG, fibraSVG, oltSVG, medidorSVG } from "../../assets";
import { Project } from "../../../../utils/Project";

export function ButtonsBar() {
    const { nodes, edges,createNewDistance,createNewDBmMeasure } =
        useContext(DiagramContext);

    const handleCreateNewDistance =  () => {
        createNewDistance()
    }


    const handleCreateNewDBmMeasure = () => {
        createNewDBmMeasure()

    }
   const handlePrintData = () => {
    console.log(nodes,edges)
    Project.updatePowerDBmMeasures(nodes,edges,nodes.find((node)=>node.type==="olt"))
   }


    return (
        <ButtonsBarContainer>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <ButtonContainer title="Caixa">
                        <img src={caixaSVG}/>
                    </ButtonContainer>
                </Dialog.Trigger>
                <NewBoxModal />
            </Dialog.Root>

            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <ButtonContainer title="Splitter">
                        <img src={splitterSVG}/>
                    </ButtonContainer>
                </Dialog.Trigger>
                <NewSplitterModal />
            </Dialog.Root>

            <ButtonContainer
                title="Medir dBm"
                onClick={handleCreateNewDBmMeasure}>
                        <img src={medidorSVG}/>
            </ButtonContainer>

            <ButtonContainer
                title="Distancia"
                onClick={handleCreateNewDistance}>
                        <img src={fibraSVG}/>

            </ButtonContainer>

            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <ButtonContainer title="OLT">
                    <img src={oltSVG}/>
                    </ButtonContainer>
                </Dialog.Trigger>
                <NewOLTModal />
            </Dialog.Root>

            <ButtonContainer title="Print" onClick={handlePrintData}>
                Print
            </ButtonContainer>
        </ButtonsBarContainer>
    );
}
