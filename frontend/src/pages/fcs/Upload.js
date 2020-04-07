import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Grid,
    // CssBaseline,
    // CircularProgress,
    Typography,
    Button,
    // Tabs,
    // Tab,
    // Link,
    // Box,
    InputLabel,
    // FormControlLabel,
    // Alert,
    Select,
    MenuItem,
    FormControl,
    // Snackbar,
    TextField,
    CircularProgress
    // Fade,
} from "@material-ui/core";
import {DropzoneArea} from 'material-ui-dropzone';
// import clsx from 'clsx';
import { green } from '@material-ui/core/colors';

// import ChartingSection from '../components/ChartingSection';
import { snackbarService } from 'uno-material-ui';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        // display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
        backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
}));

export default function Upload() {
    const classes = useStyles();
    var [location, setLocation] = useState("");
    var [dateTime, setDateTime] = useState(new Date().toISOString().substring(0,10));//"2019-03-06T10:30"
    var [files, setFiles] = useState([]);
    var [category, setCategory] = useState("Cancer");
    var [disabled, setDisabled] = useState(true);
    var [buttonText, setButtonText] = useState("Upload");
    var [displayChart, setDisplayChart] = useState(false);

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleDropzoneChange = (e) => {
        setFiles(e);
        //fix bug 
        if (files.length < 1){
            setDisabled(false);
        }
    }

    const uploadFcs = (e) => {
        
        setLoading(true);
        setSuccess(false);

        const formData = new FormData();
        formData.append("dateTime", dateTime);
        formData.append("location", location);
        formData.append("category", category);
        //Append all uploaded files to form data
        files.forEach(file => {
            formData.append("file", file, file.name);
        });

        var urlpath = process.env.NODE_ENV === "development" ? process.env.REACT_APP_URL_PATH : "";
        fetch(`${urlpath}/`,{
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(function(response){
            if (response['status']){
                setSuccess(true);
                setDisabled(true);
                setLocation("");
                setFiles([]);
                setButtonText("Upload Complete")
                snackbarService.showSnackbar('Upload Successful', 'success');
                return response;
            } else {
                snackbarService.showSnackbar(response['message'], 'error');
            }
            setLoading(false);
        })
        .catch(err => console.error(err))  
        setDisplayChart(true);
    }


    return (
        <Grid container component="main" className={"ChartingSection"}>
            <Grid item md={8}>
            <Typography variant="h4" component="h4" align="left" color="primary">
            FCS file upload page
            </Typography>
            <div className={classes.paper}>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="datetime"
                                label="Date"
                                type="date"
                                variant="outlined"
                                required
                                value={dateTime}
                                className={classes.textField}
                                onChange={e => setDateTime(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="location"
                                variant="outlined"
                                required
                                fullWidth
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                id="location"
                                label="Location"
                                
                            />
                        </Grid>
                    
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <InputLabel ref={inputLabel} htmlFor="SelectCategory">
                                    Category
                                </InputLabel>
                                <Select
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    // onChange={testSnack}
                                    labelWidth={labelWidth}
                                    inputProps={{
                                        name: 'Category',
                                        id: 'SelectCategory',
                                    }}
                                >
                                    <MenuItem value={'Cancer'}>Cancer </MenuItem>
                                    <MenuItem value={'No Cancer'}>No Cancer</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>

                            <DropzoneArea 
                                acceptedFiles={['.fcs']}       
                                maxFileSize={30720000}                        
                                dropzoneText="Select files to upload"
                                onChange={handleDropzoneChange}
                                showPreviews={false}
                                // onDelete={handleDropzoneChange}
                            />

                        </Grid>
                        <Grid item xs={12}>
                        <div className={classes.root}>
                            <div className={classes.wrapper}>
                                <Button
                                    // href="#/app/dashboard"
                                    onClick={uploadFcs}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled = {disabled}
                                >
                                    {buttonText}
                                </Button>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
                        </div>
                        </Grid>
                    </Grid>

                </form>
            </div>
            </Grid>
            {/* <Grid item md={6}>
                <ChartingSection />
                {renderScatter(displayChart)}

            </Grid> */}
        </Grid>
    );
}


// function renderScatter(status) {
//     if (status) {
//         return (
//         <div className="Scatter"> 
//             <img src="/plot/scatter.jpg" alt="img-from-data" />
//         </div>
//         );
//     } else {
//         return (
//         <div> 
//             <div className="chart-placeholder"></div>
//             <h5> Nothing to see here</h5>
//         </div>
//         );
//     }
// }

