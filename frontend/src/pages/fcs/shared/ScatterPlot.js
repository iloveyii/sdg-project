import React, {useState, useEffect} from 'react';
import CanvasJSReact from '../lib/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function ScatterPlot(props){

    const [dataToPlot, setDataToPlot] = useState(props.dataToPlot);
    const [xval, setXval] = useState(props.xval);
    const [yval, setYval] = useState(props.yval);

    useEffect( function handleDataChange() {
        if (props.dataToPlot) {
            setDataToPlot(props.dataToPlot);
        }
    }, [props.dataToPlot]);

    useEffect( function handleTitleChange() {
        if (props.title) {
            setXval(props.xval);
            setYval(props.yval);
        }
    }, [props.title, props.xval, props.yval]);

    const options = {
        // theme: "dark2",
        animationEnabled: true,
        zoomEnabled: true,
        zoomType: "xy",
        // title:{
        //     text: ""
        // },
        axisX: {
            title: xval,
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY:{
            title: yval,
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        data: [{
            type: "scatter",
            markerSize: 5,
            dataPoints: dataToPlot
        }]
    }
    
    return (
        
            <CanvasJSChart options = {options}
			/>
        
    )
};     