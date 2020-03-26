import React from "react";
import TextField from "@material-ui/core/TextField";
import {Button, CssBaseline, Box, Typography, Container, withStyles, Grid} from '@material-ui/core';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
    }
});


class UserProfile extends React.Component {
    state = {
        userData: [["Loading Data..."]]
    };

    componentDidMount() {
        var urlpath = process.env.NODE_ENV === "development" ? process.env.REACT_APP_URL_PATH : "";
        fetch(`${urlpath}/loadAllUsers`)
            .then(response => response.json())
            .then((response) => {
                if (response) {
                    this.setState({userData: response});
                }
            });
    }


    handleSubmit = () => {
        console.log('You clicked submit button');
    };

    handleOnChange = (e) => {
        console.log(e.target.id);
    }

    render() {
        const {classes} = this.props;

        return (

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        User Profile
                        <br/>
                        <br/>
                        <br/>
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    onChange={this.handleOnChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="mobile"
                                    label="Mobile"
                                    type="mobile"
                                    id="mobile"
                                    autoComplete="mobile"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    rows={5}
                                    name="address"
                                    label="Address"
                                    type="address"
                                    id="address"
                                    autoComplete="address"
                                />
                            </Grid>


                        </Grid>

                        <br/>
                        <br/>
                        <br/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Update
                        </Button>
                    </form>
                </div>
                <Box mt={5}>
                </Box>
            </Container>

        )
    }
}

export default withStyles(styles)(UserProfile);

