import styled from "styled-components";

interface DBmMeasureContainerProps{
    withinRange:boolean
    client:boolean
}

export const DBmMeasureContainer = styled.div<DBmMeasureContainerProps>`
    text-align: center;
    * {
        cursor: grab;
    }
    label {
        font-size: 8px;
        color:${props=>props.client? props.withinRange ? props.theme['green-300']:'red' : 'black'};
    }
`;
