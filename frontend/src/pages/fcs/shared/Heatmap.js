import React, {useState, useEffect} from 'react';
import { HeatMapComponent, Legend, Tooltip, Inject, Adaptor } from '@syncfusion/ej2-react-heatmap';

export default function Heatmap(props){
    const [gatedData, setGatedData] = useState(props.gatedData);
    const [xLabels, setXLabels] = useState([]);
    const [yLabels, setYLabels] = useState([]);
    const [selectedFcs, setSelectedFcs] = useState(props.selectedFcs);

    useEffect( function handleDataChange() {
        if (props.gatedData) {
            setGatedData(props.gatedData);
            setXLabels(getRangeList(props.gateX1, props.gateX2));
            setYLabels(getRangeList(props.gateY1, props.gateY2));
            setSelectedFcs(props.selectedFcs)
        }
    }, [props.gatedData, props.gateX1, props.gateX2, props.gateY1, props.gateY2, props.selectedFcs]);

    function getRangeList(min, max){
        let rangeList = [];
        for(let i=min+1; i <= max; i++){
            rangeList.push(`${i}`);
        }
        return rangeList
    }
    
    return (
        <HeatMapComponent id='heatmap-container' 
            titleSettings={{
                text: 'Gated Heatmap: ' + selectedFcs,
                textStyle: {
                    size: '15px',
                    fontWeight: '500',
                    fontStyle: 'Normal',
                }
            }} 
            xAxis={{
                labels: xLabels,
            }} 
            yAxis={{
                labels:  yLabels
            }} 
            dataSource={gatedData}>
            <Inject services={[Legend, Tooltip, Adaptor]}/>
        </HeatMapComponent>
        
    )
};     