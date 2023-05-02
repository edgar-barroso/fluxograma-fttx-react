import { useContext } from "react";
import { DiagramContext } from "../../../../contexts/DiagramContext";
import { ButtonContainer } from "../Flow/style";
import { ButtonsBarContainer } from "./style";
import { BiWindow } from "react-icons/bi";
import {
    AiFillPrinter,
    AiFillSignal,
    AiOutlineFall,
    AiOutlineUserAdd,
} from "react-icons/ai";
import { MdChangeHistory } from "react-icons/md";
import * as Dialog from "@radix-ui/react-dialog";
import { NewSplitterModal } from "../NewSplitterModal";
import { Project } from "../../../../utils/Project";
import { NewBoxModal } from "../NewBoxModal";
import { FaBroadcastTower } from "react-icons/fa";
import { NewOLTModal } from "../NewOLTModal";

export function ButtonsBar() {
    const { nodes, handleSetNodes, getCenter } = useContext(DiagramContext);

    const handleCreateNewDistance = () => {
        Project.createNewDistance(nodes, handleSetNodes, getCenter());
    };

    const handleDownloadPng = () => {
        Project.DownloadPng();
    };

    const handleCreateNewDBmMeasure = () => {
        Project.createNewDBmMeasure(nodes, handleSetNodes, getCenter());
    };

    return (
        <ButtonsBarContainer>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <ButtonContainer title="Caixa">
                        <BiWindow />
                    </ButtonContainer>
                </Dialog.Trigger>
                <NewBoxModal />
            </Dialog.Root>

            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <ButtonContainer title="Splitter">
                        <MdChangeHistory />
                    </ButtonContainer>
                </Dialog.Trigger>
                <NewSplitterModal />
            </Dialog.Root>

            <ButtonContainer
                title="Medir dBm"
                onClick={handleCreateNewDBmMeasure}>
                <AiFillSignal />
            </ButtonContainer>

            <ButtonContainer
                title="Distancia"
                onClick={handleCreateNewDistance}>
                <AiOutlineFall />
            </ButtonContainer>

            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <ButtonContainer title="OLT">
                        <FaBroadcastTower />
                    </ButtonContainer>
                </Dialog.Trigger>
                <NewOLTModal />
            </Dialog.Root>

            <ButtonContainer title="Print" onClick={handleDownloadPng}>
                <AiFillPrinter />
            </ButtonContainer>
        </ButtonsBarContainer>
    );
}
