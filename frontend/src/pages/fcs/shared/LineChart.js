import React, {useState, useEffect} from 'react';
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    LineSeries, DateTime, Legend, Tooltip
} from '@syncfusion/ej2-react-charts';

export default function LineChart(props){
    const [lineData, setLineData] = useState(props.lineData);
    const [lineDataKeys, setLineDataKeys] = useState(props.lineDataKeys);
    const [xMaxi, setXMaxi] = useState([49]);
    const [selectedFcs, setSelectedFcs] = useState(props.selectedFcs);
    const [plotData, setPlotData] = useState([]);

    useEffect( function handleDataChange() {
        if (props.lineData) {
            setLineData(props.lineData);
            setLineDataKeys(props.lineDataKeys);
            setPlotData(lineComponent())
            setXMaxi(getMaxi());
        }
    }, [props.lineData, props.lineDataKeys, props.gateX1, props.gateX2, props.gateY1, props.gateY2, props.selectedFcs]);

    function getMaxi(){
        let max = (props.gateX2 - props.gateX1) * (props.gateY2 - props.gateY1)

        return max
    }
    

    let lineComponent = () => {
        let items = []
        for(let key in lineData) {
            items.push(<SeriesDirective dataSource={Object.values(lineData[key])} 
                xName='x' yName='y' 
                name={lineDataKeys[key]} 
                key={key}
                width={selectedFcs === key ? 6 : 2} marker={{ visible: true, width: 7, height: 7 }} type='Line'>
                </SeriesDirective>)
        }
        return items;
    }

    return (
        <ChartComponent 
        id='charts' 
        style={{ textAlign: "center" }} 
        primaryXAxis={{
            minimum: 0,
            maximum: xMaxi,
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 }
        }} 
        primaryYAxis={{
            rangePadding: 'None',
            minimum: 0,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        }} 
        chartArea={{ border: { width: 0 } }} 
        tooltip={{ enable: true }} 
        title='FCS Gates Comparison - 1D' 
        >
            <Inject services={[LineSeries, DateTime, Legend, Tooltip]}/>
            <SeriesCollectionDirective>
                {plotData}
            </SeriesCollectionDirective>
        </ChartComponent>
        
    )
};     