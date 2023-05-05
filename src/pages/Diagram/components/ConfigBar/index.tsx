import { useState,useContext ,useEffect} from "react";
import { DiagramContext } from "../../../../contexts/DiagramContext";
import { ConfigBarContainer } from "./style";

export function ConfigBar() {
    const {handleSetIntervalONU,intervalONU} = useContext(DiagramContext)

    const [minValue,setMinValue] = useState(intervalONU.minValue)
    const [maxValue,setMaxValue] = useState(intervalONU.maxValue)

    useEffect(()=>{
        handleSetIntervalONU({minValue,maxValue})
    },[minValue,maxValue])

    const handleChangeInputMinValue = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setMinValue(Number(event.target.value))
    }
    const handleChangeInputMaxValue = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setMaxValue(Number(event.target.value))
    }

    return (
        <ConfigBarContainer>
                <label>Intervalor dBm ONU</label>
                <input type="number" value={minValue} onChange={handleChangeInputMinValue} step={0.1}/>
                <input type="number" value={maxValue} onChange={handleChangeInputMaxValue} step={0.1}/>
        </ConfigBarContainer>
    );
}
