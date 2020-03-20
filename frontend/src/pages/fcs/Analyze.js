import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import {Grid, Button} from "@material-ui/core";

import ChartPlot from './shared/ChartPlot';
import CustomSelect from './shared/CustomSelect';
import Scatter from './shared/ScatterPlot';

const useStyles = makeStyles(theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(18),
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    }

}));

const transformations = [
    {
        id: "HLOG",
        name: "HLOG"
    },
    {
        id: "GLOG",
        name: "GLOG"
    }];

export default function Analyze() {
    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);//React.useState(false);
    const [xval, setXval] = useState("");
    const [yval, setYval] = useState("");
    const [transformation, setTransformation] = useState("");
    const [graphTitle, setGraphTitle] = useState("Choose Columns & Transformation Function");
    const [selectedFcs, setSelectedFcs] = useState(0);
    const [allFcs, setAllFcs] = useState([]);
    const [allColumns, setAllColumns] = useState([]);

    const [enablePlotButton, setEnablePlotButton] = useState(true);

    const [dataToPlot, setDataToPlot] = useState([]);
    const [title, setTitle] = useState("here");

    useEffect(() => {
        async function loadFcsSelect(){
            var urlpath = process.env.NODE_ENV === "development" ? process.env.REACT_APP_URL_PATH : ""; 
            await fetch(`${urlpath}/loadFcsFiles`)
            .then(response => response.json())
            .then(function(response){
                if (response){
                    // console.log (response);
                    setAllFcs(response);
                    setTitle("success");
                }
            })
            .catch(err => console.error(err)) 
        }
        loadFcsSelect();
        setExpanded("panel1");
    }, []);

    useEffect(() => {
        async function loadFilters(){
            var urlpath = process.env.NODE_ENV === "development" ? process.env.REACT_APP_URL_PATH : "";
            await fetch(`${urlpath}/loadColumns/?fcs=${selectedFcs}`)
            .then(response => response.json())
            .then(function(response){
                if (response["status"]){
                    setAllColumns(response["payload"]);
                    setEnablePlotButton(false);
                    setExpanded("panel2");
                }
            })
            .catch(err => console.error(err)) 
        }

        loadFilters();
    }, [selectedFcs]);
    

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const initiatePlot = () => {
        var urlpath = process.env.NODE_ENV === "development" ? process.env.REACT_APP_URL_PATH : "";
        fetch(`${urlpath}/plotGraph/?fcs=${selectedFcs}&xval=${xval}&yval=${yval}&transformation=${transformation}`)
        .then(response => response.json())
        .then(function(response){
            if (response){
                var output = response.map(s => ({x:s[xval], y:s[yval]}));
                setDataToPlot(output);
                setGraphTitle("Scatter Plot: " + xval + " Vs. " + yval);
            }
        })
        .catch(err => console.error(err)) 
        
        setExpanded("panel3");
        
    };

    function loadFilters(){
        var urlpath = process.env.NODE_ENV === "development" ? process.env.REACT_APP_URL_PATH : "";
        fetch(`${urlpath}/loadColumns/?fcs=${selectedFcs}`)
        .then(response => response.json())
        .then(function(response){
            if (response["status"]){
                setAllColumns(response["payload"]);
                setEnablePlotButton(false);
                setExpanded("panel2");
            }
        })
        .catch(err => console.error(err)) 
    }


    return (
        <div className={"ChartingSection"}>
            <div className="PageTitleTop">
                <Typography variant="h4" component="h4" align="left" color="primary">
                FCS file analysis 
                </Typography>
            </div>
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')} defaultExpanded>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography className={classes.heading}> Select FCS file</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            
                <CustomSelect 
                data={allFcs} 
                placeholderText={'FCS-file'}
                selectSize={'medium'}
                onSelectChange={(value) => {
                    setSelectedFcs(value);
                }} 
                />
            </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                    >
                    <Typography className={classes.heading}>Options</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <Grid container spacing={3} >
                        <Grid item xs={4}>
                        <CustomSelect 
                        data={allColumns} 
                        placeholderText={'X-Axis'}
                        selectSize={'small'}
                        onSelectChange={(value) => {
                            setXval(value);
                        }} 
                        />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomSelect 
                            data={allColumns} 
                            placeholderText={'Y-Axis'}
                            selectSize={'small'}
                            onSelectChange={(value) => {
                                setYval(value);
                            }} 
                            
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomSelect 
                            data={transformations} 
                            placeholderText={'Transformation'}
                            selectSize={'small'}
                            onSelectChange={(value) => {
                                setTransformation(value);
                            }} 
                            />
                        </Grid>
                    </Grid>
                
                    {/* <div className={clsx(classes.column, classes.helper)}>
                        <Typography variant="caption">
                        Select your destination of choice
                        <br />
                        <a href="#secondary-heading-and-columns" className={classes.link}>
                            Learn more
                        </a>
                        </Typography>
                    </div> */}
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                {/* <Button size="small">Cancel</Button> */}
                <Button 
                variant="outlined"
                size="medium" 
                color="primary"
                onClick={initiatePlot}
                // disabled={enablePlotButton}
                disabled={
                    xval.length === 0 || yval.length === 0
                  }
                >
                    Plot
                </Button>
                </ExpansionPanelActions>
            </ExpansionPanel>

            <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
            >
                <Typography className={classes.heading}>{graphTitle}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container>
                    <Scatter 
                    dataToPlot={dataToPlot}
                    title={title}
                    xval={xval}
                    yval={yval}
                    />
                </Grid>
                {/* <ChartPlot 
                data={"is here"}
                /> */}
            </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}