import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import ChartPlot from '../components/ChartPlot'
import CustomSelect from '../components/CustomSelect';

import {Grid, Button} from "@material-ui/core";

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

export default function DetailedExpansionPanel() {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);//React.useState(false);
    const [xval, setXval] = React.useState("");
    const [yval, setYval] = React.useState("");
    const [transformation, setTransformation] = React.useState("");
    const [graphTitle, setGraphTitle] = React.useState("Choose Columns & Transformation Function");
    const [selectedFcs, setSelectedFcs] = React.useState(0);
    const [allFcs, setAllFcs] = React.useState([]);
    const [allColumns, setAllColumns] = React.useState([]);

    useEffect(() => {
        loadFcsSelect();
        //Set first panel as defaultExpanded
        setExpanded("panel1");
    }, []);
    

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function loadFcsSelect(){
        var urlpath = "http://localhost:8000";// process.env.NODE_ENV === "development" ? process.env.REACT_APP_URL_PATH : "";
        fetch(`${urlpath}/loadFcsFiles`)
        .then(response => response.json())
        .then(function(response){
            if (response){
                // console.log (response);
                setAllFcs(response);
            }
        })
        .catch(err => console.error(err)) 
    }

    const data3 = [
        {
            id: "HLOG",
            name: "HLOG"
        },
        {
            id: "GLOG",
            name: "GLOG"
        }];
        // console.log(data)

    const initiatePlot = () => {
        var urlpath = "http://localhost:8000";// process.env.NODE_ENV === "development" ? process.env.REACT_APP_URL_PATH : "";
        fetch(`${urlpath}/plotGraph/?fcs=${selectedFcs}&xval=${xval}&yval=${yval}&transformation=${transformation}`)
        .then(response => response.json())
        .then(function(response){
            if (response){
                console.log (response);
            }
        })
        .catch(err => console.error(err)) 
        
        setExpanded("panel3");
        
    };

    const populateFcsOptions = (value) => {
        setSelectedFcs(value);
        // console.log(value)
        if (selectedFcs > 0){
            loadFilters();
        }
        
    }

    function loadFilters(){
        var urlpath = "http://localhost:8000";// process.env.NODE_ENV === "development" ? process.env.REACT_APP_URL_PATH : "";
        fetch(`${urlpath}/loadColumns/?fcs=${selectedFcs}`)
        .then(response => response.json())
        .then(function(response){
            // console.log("Info has been logged in backend");
            if (response){
                setAllColumns(response);
                setExpanded("panel2");
            }
        })
        .catch(err => console.error(err)) 
    }


    return (
        <div className={"ChartingSection"}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')} defaultExpanded>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <Typography className={classes.heading}>Select FCS file</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <CustomSelect 
            // selValue={selValue} 
            data={allFcs} 
            placeholderText={'FCS-file'}
            selectSize={'medium'}
            onSelectChange={populateFcsOptions} 
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
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                    <CustomSelect 
                    // selValue={selValue} 
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
                        // selValue={selValue} 
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
                        data={data3} 
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
            size="small" 
            color="primary"
            onClick={initiatePlot}
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
            {/* <div className="Scatter"> 
                <img src="/plot/scatter.jpg" alt="img-from-data" />
            </div> */}
            <ChartPlot 
            data={"is here"}
            />
        </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
    );
}
