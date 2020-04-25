import React, {useState, useEffect} from 'react';
// import CanvasJSReact from '../lib/canvasjs.react';


import {scaleLinear} from 'd3-scale';

import {XYPlot, XAxis, YAxis, HeatmapSeries, LabelSeries, Hint} from 'react-vis';
import 'react-vis/dist/style.css';
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
//const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

var gatedAxesLabel = ['5', '6', '7', '8', '9', '10', '11', '12'];
var gatedDat = gatedAxesLabel.reduce((acc, letter1, idx) => {
    return acc.concat(
        gatedAxesLabel.map((letter2, jdx) => ({
            x: `${letter1}1`,
            y: `${letter2}2`,
            color: (idx + jdx) % Math.floor(jdx / idx) || idx
        }))
    );
}, []);
console.log(gatedDat);

export default function Heatmap(props){
    

    const [gatedData, setGatedData] = useState(props.gatedData);
    const [gatedAxesLabels, setGatedAxesLabels] = useState(props.gatedAxesLabels);
    const [mini, setMini] = useState(5);
    const [maxi, setMaxi] = useState(12);

    // console.log(props.dataToPlot);
    setGatedData(gatedDat)
    useEffect( function handleDataChange() {
        if (props.gatedData) {
            setGatedData(props.gatedData);
        }

        // const {min, max} = gatedData.reduce(
        //     (acc, row) => ({
        //         min: Math.min(acc.min, row.color),
        //         max: Math.max(acc.max, row.color)
        //     }),
        //     {min: Infinity, max: -Infinity}
        // );
        // setMini(min);
        // setMaxi(max);

    }, []);

    console.log(gatedData);

    // useEffect( function handleTitleChange() {
    //     const {minimum, maximum} = gatedData.reduce(
    //         (acc, row) => ({
    //             min: Math.min(acc.min, row.color),
    //             max: Math.max(acc.max, row.color)
    //         }),
    //         {min: Infinity, max: -Infinity}
    //     );
    //     setMini(minimum);
    //     setMaxi(maximum);
    // }, []);
    

    

    
    const [value, setValue] = useState(false);
    const exampleColorScale = scaleLinear()
    //.domain([mini, (mini + maxi) / 2, maxi])
    .domain([5, (5 + 12) / 2, 12])
    .range(['orange', 'white', 'cyan']);
    
    return (
        
            // <CanvasJSChart options = {options}
             
			// />
            <XYPlot
                xType="ordinal"
                xDomain={gatedAxesLabels.map(letter => `${letter}1`)}
                yType="ordinal"
                yDomain={gatedAxesLabels.map(letter => `${letter}2`).reverse()}
                margin={50}
                width={500}
                height={500}
                >
            <XAxis orientation="top" />
            <YAxis />
            <HeatmapSeries
                colorType="literal"
                getColor={d => exampleColorScale(d.color)}
                style={{
                stroke: 'white',
                strokeWidth: '2px',
                rectStyle: {
                    rx: 10,
                    ry: 10
                }
                }}
                className="heatmap-series-example"
                data={gatedData}
                onValueMouseOver={v => setValue(v)}
                onSeriesMouseOut={v => setValue(false)}
                />
            <LabelSeries
                style={{pointerEvents: 'none'}}
                data={gatedData}
                labelAnchorX="middle"
                labelAnchorY="baseline"
                getLabel={d => `${d.color}`}
                />
            {value !== false && <Hint value={value} />}
            </XYPlot>
        
    )
};     