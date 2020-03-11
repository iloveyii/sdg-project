import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
// import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ChartPlot from '../components/ChartPlot'

import {Grid,
    CssBaseline,
    Button,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Container
} from "@material-ui/core";

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

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    const [xval, setXval] = React.useState("");
    const [yval, setYval] = React.useState("");
    const [transformation, setTransformation] = React.useState("");
    const [graphTitle, setGraphTitle] = React.useState("Choose Columns & Transformation Function");


    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
        //Set first panel as defaultExpanded
        setExpanded("panel1");
    }, []);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const initiatePlot = () => {
        const formData = new FormData();
        formData.append("xAxis", xval);
        formData.append("yAxis", yval);
        formData.append("transformation", transformation);
    
        var urlpath = "http://localhost:8000";// process.env.NODE_ENV === "development" ? process.env.REACT_APP_URL_PATH : "";
        fetch(`${urlpath}/plotGraph`,{
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(function(response){
            // console.log("Info has been logged in backend");
            if (response){
                console.log (response);
            }
        })
        .catch(err => console.error(err)) 
        
        setExpanded("panel2");
        
    };


    return (
        <div className={"ChartingSection"}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')} defaultExpanded>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography className={classes.heading}>Options</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                    <FormControl variant="outlined" className={classes.formControl} size={"small"} required={true} fullWidth>
                        <InputLabel ref={inputLabel} htmlFor="sel_x">
                            X - Axis
                        </InputLabel>
                        <Select
                            value={xval}
                            onChange={e => setXval(e.target.value)}
                            
                            labelWidth={labelWidth}
                            inputProps={{
                                name: 'x',
                                id: 'sel_x',
                            }}
                        >
                            <MenuItem value={'FHS-A'}>FHS-A</MenuItem>
                            <MenuItem value={'FHS-B'}>FHS-B</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl variant="outlined" className={classes.formControl} size={"small"} required={true} fullWidth>
                            <InputLabel ref={inputLabel} htmlFor="sel_y">
                                Y - Axis
                            </InputLabel>
                            <Select
                                value={yval}
                                onChange={e => setYval(e.target.value)}
                                
                                labelWidth={labelWidth}
                                inputProps={{
                                    name: 'y',
                                    id: 'sel_y',
                                }}
                            >
                                <MenuItem value={'FHS-A'}>FHS-A</MenuItem>
                                <MenuItem value={'FHS-B'}>FHS-B</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl variant="outlined" className={classes.formControl} size={"small"} required={true} fullWidth>
                            <InputLabel ref={inputLabel} htmlFor="SelectTransformation">
                                Transformation
                            </InputLabel>
                            <Select
                                value={transformation}
                                onChange={e => setTransformation(e.target.value)}
                                
                                labelWidth={labelWidth}
                                inputProps={{
                                    name: 'Transformation',
                                    id: 'SelectTransformation',
                                }}
                            >
                                <MenuItem value={'HLOG'}>HLOG </MenuItem>
                                <MenuItem value={'VLOG'}>VLOG</MenuItem>
                            </Select>
                        </FormControl>
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

        <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
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
