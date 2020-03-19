import React, {useState, useEffect} from 'react';
// var Component = React.Component;
import CanvasJSReact from '../lib/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function ScatterPlot(props){

    const [dataToPlot, setDataToPlot] = useState(props.dataToPlot);
    const [title, setTitle] = useState(props.plotTitle);
    const [xval, setXval] = useState(props.xval);
    const [yval, setYval] = useState(props.yval);

    // console.log(props.dataToPlot);

    useEffect( function handleDataChange() {
        if (props.dataToPlot) {
            setDataToPlot(props.dataToPlot);
        }
    }, [props.dataToPlot]);

    useEffect( function handleTitleChange() {
        if (props.title) {
            setTitle(props.title);
            setXval(props.xval);
            setYval(props.yval);
        }
    }, [props.title]);

    const options = {
        // theme: "dark2",
        animationEnabled: true,
        zoomEnabled: true,
        zoomType: "xy",
        // title:{
        //     text: "Ice Cream Sales vs Temperature"
        // },
        axisX: {
            title: xval,
            // suffix: "°C",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY:{
            title: yval,
            // includeZero: false,
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        data: [{
            type: "scatter",
            markerSize: 5,
            // toolTipContent: "<b>Temperature: </b>{x}°C<br/><b>Sales: </b>{y}",
            dataPoints: dataToPlot
        }]
    }
    
    return (
        
            <CanvasJSChart options = {options}
                /* onRef={ref => this.chart = ref} */
                
			/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/
			/>
        
    )
};     