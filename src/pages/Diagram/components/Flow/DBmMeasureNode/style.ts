import styled from "styled-components";

interface DBmMeasureContainerProps{
    withinRange:boolean
    client:boolean
}

export const DBmMeasureContainer = styled.div<DBmMeasureContainerProps>`
    background-color: white;
    height: 40px;
    width: auto;
    display: flex;
    justify-content: center;
    border:1px solid black;
    border-radius: 5px;
    text-align: center;
    * {
        cursor: grab;
    }
    label {
        padding: 10px;
        align-self: center;
        color:${props=>props.client? props.withinRange ? props.theme['green-300']:'red' : 'black'};
    }
`;
