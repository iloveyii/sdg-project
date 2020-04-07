import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanelActions} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Grid, Divider, Typography, TextField, Button, Paper} from "@material-ui/core";

import ChartPlot from './shared/ChartPlot';
import CustomSelect from './shared/CustomSelect';
import Scatter from './shared/ScatterPlot';
import { snackbarService } from 'uno-material-ui';

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


export default function Analyze() {
    const classes = useStyles();
    var urlpath = process.env.NODE_ENV === "development" ? process.env.REACT_APP_URL_PATH : "";        

    const [expanded, setExpanded] = useState(false);//React.useState(false);
    const [xval, setXval] = useState("");
    const [yval, setYval] = useState("");
    const [transformation, setTransformation] = useState("");
    const [graphTitle, setGraphTitle] = useState("Choose Columns & Transformation Function");
    const [selectedFcs, setSelectedFcs] = useState(0);
    const [allFcs, setAllFcs] = useState([]);
    const [allColumns, setAllColumns] = useState([]);
    var [dateFrom, setDateFrom] = useState("");//new Date().toISOString().substring(0,16));//"2019-03-06T10:30"
    var [dateTo, setDateTo] = useState("");//new Date().toISOString().substring(0,10));//"2019-03-06T10:30"
    const [fcsType, setFcsType] = useState("");
    const [location, setLocation] = useState("");
    const [allLocations, setAllLocations] = useState([]);
    
    const [enablePlotButton, setEnablePlotButton] = useState(true);

    const [dataToPlot, setDataToPlot] = useState([]);
    const [title, setTitle] = useState("here");
    const [fcsSectionTitle, setFcsSectionTitle] = useState("Select FCS file");

    const [gateX1, setGateX1] = useState(5);
    const [gateY1, setGateY1] = useState(5);
    const [gateX2, setGateX2] = useState(12);
    const [gateY2, setGateY2] = useState(12);

    async function loadFcsSelect(){
        await fetch(`${urlpath}/loadFcsFiles/?dateFrom=${dateFrom}&dateTo=${dateTo}&category=${fcsType}&location=${location}`)
        .then(response => response.json())
        .then(function(response){
            if (response["status"]){
                setAllFcs(response["payload"]);
                setTitle("success");
                snackbarService.showSnackbar(response["payload"].length + ` FCS file(s) loaded`, 'info');
            }
        })
        .catch(err => console.error(err)) 
    }

    async function loadLocations(){
        await fetch(`${urlpath}/loadLocations`)
        .then(response => response.json())
        .then(function(response){
            if (response["status"]){
                setAllLocations(response["payload"]);
            }
        })
        .catch(err => console.error(err)) 
    }
    
    useEffect(() => {
        loadLocations();
        loadFcsSelect();
        setExpanded("panel1");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        async function loadFilters(){
            await fetch(`${urlpath}/loadColumns/?fcs=${selectedFcs}`)
            .then(response => response.json())
            .then(function(response){
                if (response["status"]){
                    setAllColumns(response["payload"]);
                    setFcsSectionTitle(`Selected FCS:   ${selectedFcs}`)
                    setEnablePlotButton(false);
                    setExpanded("panel2");
                    snackbarService.showSnackbar(response["payload"].length + ` Columns Loaded`, 'info');
                }
            })
            .catch(err => console.error(err)) 
        }
        loadFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFcs]);
    

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const initiatePlot = () => {
        fetch(`${urlpath}/plotGraph/?fcs=${selectedFcs}&xval=${xval}&yval=${yval}&transformation=${transformation}`)
        .then(response => response.json())
        .then(function(response){
            if (response){
                var output = response.map(s => ({x:s[xval], y:s[yval]}));
                setDataToPlot(output);
                setGraphTitle("Scatter Plot: " + xval + " Vs. " + yval);
                setExpanded("panel3");
            }
        })
        .catch(err => console.error(err)) 
        
        
        
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

    function handleFilterChange(e){
        console.log(e.target.value);
        setDateFrom(e.target.value);
    }
    function resetFilters(e){
        setDateFrom("");
        setDateTo("");
        setFcsType("");
        setLocation("");
        loadFcsSelect();
    }

    function generateHeatMaps(){
        fetch(`${urlpath}/generateHeatmap/?allfcs=${JSON.stringify(allFcs)}&x1=${gateX1}&y1=${gateY1}&x2=${gateX2}&y2=${gateY2}`)
        .then(response => response.json())
        .then(function(response){
            if (response){
                console.log(response);
                snackbarService.showSnackbar(` Heatmaps Generated`, 'info');
                // var output = response.map(s => ({x:s[xval], y:s[yval]}));
                // setDataToPlot(output);
                // setGraphTitle("Scatter Plot: " + xval + " Vs. " + yval);
            }
        })
        .catch(err => console.error(err)) 
        
        setExpanded("panel3");
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
                <Typography className={classes.heading}>{fcsSectionTitle}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container spacing={3}>
                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="body1" >
                            Filters:
                            </Typography>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <TextField
                                id="datefrom"
                                label="From"
                                type="date"
                                variant="outlined"
                                value={dateFrom}
                                className={classes.textField}
                                //onChange={handleDateChange}
                                onChange={e => setDateFrom(e.target.value)}

                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                size={'small'}
                            />
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <TextField
                                id="dateto"
                                label="To"
                                type="date"
                                variant="outlined"
                                value={dateTo}
                                className={classes.textField}
                                onChange={e => setDateTo(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                size={'small'}
                            />
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <CustomSelect 
                            data={[{
                                id: "Cancer",
                                name: "Cancer"
                            },
                            {
                                id: "No Cancer",
                                name: "No Cancer"
                            }]} 
                            placeholderText={'Type'}
                            selectSize={'small'}
                            onSelectChange={(value) => {
                                setFcsType(value);
                            }} 
                            />
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <CustomSelect 
                            data={allLocations} 
                            placeholderText={'Location'}
                            selectSize={'small'}
                            onSelectChange={(value) => {
                                setLocation(value);
                            }} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            
                            <Button 
                            variant="outlined"
                            size="medium" 
                            color="primary"
                            onClick={loadFcsSelect}
                            className={"btn-apply-analyze"}
                            disabled={
                                dateFrom.length === 0 && dateTo.length === 0 && fcsType.length === 0 && location.length === 0
                            }
                            >
                                Apply
                            </Button>
                            <Button 
                            variant="outlined"
                            size="medium" 
                            color="secondary"
                            onClick={resetFilters}
                            className={"btn-reset-analyze"}
                            >
                                Reset
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid className={"space-analyze"} container item xs={12} spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="body1" >
                                Please Choose:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} autoFocus>
                            <CustomSelect 
                            data={allFcs} 
                            placeholderText={'FCS-file'}
                            selectSize={'medium'}
                            onSelectChange={(value) => {
                                setSelectedFcs(value);
                            }} 
                            />
                        </Grid>
                    </Grid>
                </Grid>
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
                            data={[{
                                id: "hlog",
                                name: "HLOG"
                            },
                            {
                                id: "glog",
                                name: "GLOG"
                            }]} 
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
                    <Grid item xs={12}>
                        <Scatter 
                        dataToPlot={dataToPlot}
                        title={title}
                        xval={xval}
                        yval={yval}
                        />
                    </Grid>
                    <Grid className={"space-analyze"} container item xs={12} spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="body1" >
                            Gates:
                            </Typography>
                        </Grid>
                        <Grid item sm={3} xs={6}>
                            <TextField
                                id="gateX1"
                                label="X1"
                                type="number"
                                variant="outlined"
                                value={gateX1}
                                className={classes.textField}
                                onChange={e => setGateX1(e.target.value)}
                                fullWidth
                                size={'small'}
                                InputProps={{
                                    inputProps: { 
                                        max: 200, min: 1 
                                    }
                                }}
                                // error
                                // required
                                // helperText={"Min: 1, Max: 200"}
                            />
                        </Grid>
                        <Grid item sm={3} xs={6}>
                            <TextField
                                id="gateY1"
                                label="Y1"
                                type="number"
                                variant="outlined"
                                value={gateY1}
                                className={classes.textField}
                                onChange={e => setGateY1(e.target.value)}
                                fullWidth
                                size={'small'}
                                InputProps={{
                                    inputProps: { 
                                        max: 200, min: 1 
                                    }
                                }}
                                // error
                                // required
                                // helperText={"Min: 1, Max: 200"}
                            />
                        </Grid>
                        <Grid item sm={3} xs={6}>
                            <TextField
                                id="gateX2"
                                label="X2"
                                type="number"
                                variant="outlined"
                                value={gateX2}
                                className={classes.textField}
                                onChange={e => setGateX2(e.target.value)}
                                fullWidth
                                size={'small'}
                                InputProps={{
                                    inputProps: { 
                                        max: 200, min: 1 
                                    }
                                }}
                                // error
                                // required
                                // helperText={"Min: 1, Max: 200"}
                            />
                        </Grid>
                        <Grid item sm={3} xs={6}>
                            <TextField
                                id="gateY2"
                                label="Y2"
                                type="number"
                                variant="outlined"
                                value={gateY2}
                                className={classes.textField}
                                onChange={e => setGateY2(e.target.value)}
                                fullWidth
                                size={'small'}
                                InputProps={{
                                    inputProps: { 
                                        max: 200, min: 1 
                                    }
                                }}
                                // error
                                // required
                                // helperText={"Min: 1, Max: 200"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                            variant="outlined"
                            size="medium" 
                            color="primary"
                            onClick={generateHeatMaps}
                            className={"btn-apply-analyze"}
                            autoFocus
                            disabled={
                                selectedFcs.length === 0 || xval.length === 0 || yval.length === 0 
                            }
                            >
                                Generate Clusters
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <ChartPlot 
                data={"is here"}
                /> */}
            </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}