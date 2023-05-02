import { useContext } from "react";
import { DiagramContext } from "../../../../contexts/DiagramContext";
import { ConfigBarContainer } from "./style";

export function ConfigBar() {
    const { handleSetLossPercentage,lossPercentage } = useContext(DiagramContext);

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleSetLossPercentage(Number(event.target.value));
    };

    return (
        <ConfigBarContainer>
            <label>Melhor caso</label>
            <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={lossPercentage}
                onChange={handleChangeInput}
            />
            <label>Pior caso</label>
        </ConfigBarContainer>
    );
}
