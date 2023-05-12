import { useState, useContext, useEffect, useCallback } from "react";
import { DiagramContext } from "../../../../contexts/DiagramContext";
import { ConfigBarContainer } from "./style";

export function ConfigBar() {
    const { handleSetIntervalONU, intervalONU } = useContext(DiagramContext);

    const [minValue, setMinValue] = useState(intervalONU.minValue);
    const [maxValue, setMaxValue] = useState(intervalONU.maxValue);

    useEffect(() => {
        handleSetIntervalONU({ minValue, maxValue });
    }, [handleSetIntervalONU, minValue, maxValue]);

    const handleChangeInputMinValue = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setMinValue(Number(event.target.value));
        },
        []
    );

    const handleChangeInputMaxValue = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setMaxValue(Number(event.target.value));
        },
        []
    );

    return (
        <ConfigBarContainer>
            <label>Intervalor dBm ONU</label>
            <input
                type="number"
                value={minValue}
                onChange={handleChangeInputMinValue}
                step={0.1}
            />
            <input
                type="number"
                value={maxValue}
                onChange={handleChangeInputMaxValue}
                step={0.1}
            />
        </ConfigBarContainer>
    );
}
