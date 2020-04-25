import React from "react";
import { Button, Grid } from "@material-ui/core";
import useStyles from "./styles";
import { Typography } from "../Wrappers";

export default function DashboardOptions(props) {
  var classes = useStyles();

  var upload = false, analyze = false, stats = false, profile = false, user = false;

  switch(props.userType){
    // case "admin":
    //   stats = true;
    //   profile = true;
    //   user=true;
    //   break;

    case "uploader":
      upload = true;
      break;

    case "analyzer":
      analyze = true;
      break;

    case "admin":  
    case "super":
      upload = true
      analyze = true;
      break;

    default:
    break;

  }

  return (
    <div className={classes.pageTitleContainer}>
    <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography className={classes.typo} variant="h2" size="sm">
        Select an option:
      </Typography>
    </Grid>
      {upload && (
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Button
            className={classes.button}
            variant="outlined"
            size="large"
            color="primary"
            href="#/app/upload"
          >
            <Typography variant="h4" color="primary"  className={classes.text} weight="medium" >
              Upload
            </Typography>
          </Button>
        </Grid>
      )}
      
      {analyze && (
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Button
            className={classes.button}
            variant="outlined"
            size="large"
            color="primary"
            href="#/app/analyze"
          >
            <Typography variant="h4" color="primary"  className={classes.text} weight="medium" >
              Analyze
            </Typography>
          </Button>
        </Grid>
      )}      
      
      {stats && (
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Button
            className={classes.button}
            variant="outlined"
            size="large"
            color="primary"
            href="#/app/stats"
          >
            <Typography variant="h4" color="primary"  className={classes.text} weight="medium" >
              Statistics
            </Typography>
          </Button>
        </Grid>
      )}
      
      {profile && (
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Button
            className={classes.button}
            variant="outlined"
            size="large"
            color="primary"
            href="#/app/profile"
          >
            <Typography variant="h4" color="primary"  className={classes.text} weight="medium" >
              Profile
            </Typography>
          </Button>
        </Grid>
      )}
      
      {user && (
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Button
            className={classes.button}
            variant="outlined"
            size="large"
            color="primary"
            href="#/app/users"
          >
            <Typography variant="h4" color="primary"  className={classes.text} weight="medium" >
              Users
            </Typography>
          </Button>
        </Grid>
      )}      
    </Grid>
  </div>
  );
}
