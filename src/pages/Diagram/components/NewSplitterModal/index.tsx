import * as Dialog from "@radix-ui/react-dialog";
import { ButtonCreate, Content, Overlay, Ports, Title } from "./style";
import { DiagramContext } from "../../../../contexts/DiagramContext";
import { useContext, useState } from "react";
import { Project } from "../../../../utils/Project";
import { useReactFlow } from "reactflow";

export function NewSplitterModal() {
    const { nodes, handleSetNodes,getCenter} = useContext(DiagramContext);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedValues, setSelectedValues] = useState(2);
    const [unbalancedLoss, setUnbalancedLoss] = useState("1/99");

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.checked) {
            setSelectedValues(2);
            setUnbalancedLoss("1/99");
        }
        setIsChecked(event.target.checked);
    };

    const handleSelectChangeSplitter = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const [_, numberSplitterPorts] = event.target.value
            .split("x")
            .map(Number);
        setSelectedValues(numberSplitterPorts);
    };

    const handleSelectChangeUnbalancedSplitter = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setUnbalancedLoss(event.target.value);
    };

    const handleCreateNewSplitter = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        if (isChecked) {
            Project.createNewSplitter(
                nodes,
                handleSetNodes,
                {
                    ports: [
                        {
                            port: 1,
                            loss: Number(unbalancedLoss.split("/")[0]),
                            used: false,
                        },
                        {
                            port: 2,
                            loss: Number(unbalancedLoss.split("/")[1]),
                            used: false,
                        },
                    ],
                    unbalanced: true,
                },
                getCenter()
            );
        } else {
            Project.createNewSplitter(
                nodes,
                handleSetNodes,
                {
                    ports: new Array(selectedValues).fill(0).map((_, index) => {
                        return {
                            port: index + 1,
                            loss: 100 / selectedValues,
                            used: false,
                        };
                    }),
                    unbalanced: false,
                },
                getCenter()
            );
        }
    };

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Title>Splitter</Title>
                <form>
                    <select onChange={handleSelectChangeSplitter}>
                        <option>1x2</option>
                        {!isChecked &&
                            ["1x4", "1x8", "1x16", "1x32"].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                    </select>

                    <div>
                        <input
                            type="checkbox"
                            id="unbalanced"
                            checked={isChecked}
                            autoComplete="off"
                            onChange={handleCheckboxChange}
                        />

                        <label htmlFor="unbalanced">Desbalanceado</label>
                        {isChecked && (
                            <select
                                onChange={handleSelectChangeUnbalancedSplitter}>
                                {[
                                    "1/99",
                                    "2/98",
                                    "5/95",
                                    "10/90",
                                    "15/85",
                                    "20/80",
                                    "25/75",
                                    "30/70",
                                    "35/65",
                                    "40/60",
                                    "45/55",
                                ].map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    {isChecked && <Ports></Ports>}
                    <ButtonCreate onClick={handleCreateNewSplitter}>
                        CRIAR
                    </ButtonCreate>
                </form>
            </Content>
        </Dialog.Portal>
    );
}
