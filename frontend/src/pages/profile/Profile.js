import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {updateProfile} from "../../context/UserContext";
import {
    Grid,
    Button,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    TextField,
    Container
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle";
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
}));

export default function Profile() {
    const classes = useStyles();

//   var [userinfo, setUserinfo] = useState([{
//       name: 'Mandem',
//       email: 'mandem@gmail.com'
//   }]);
    var [email, setEmail] = useState(localStorage.getItem("email"));
    var [name, setName] = useState(localStorage.getItem("fullname"));
    var [phone, setPhone] = useState(localStorage.getItem("mobilephone"));
//   var [usergr, setName] = useState(localStorage.getItem("fullname"));

    var [usergroup, setUsergroup] = useState(localStorage.getItem("usergroup"));

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);

    }, []);
//   getLocation();


    console.log(email + name);


    return (
        <Container component="main" maxWidth="xs">
            {/* <CssBaseline /> */}
            <div className={classes.paper}>
                {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography> */}
                <PageTitle
                    title="Edit Profile"
                    // button="Latest Reports"
                />
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="fullname"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                value={name}
                                onChange={e => setName(e.target.value)}
                                id="name"
                                label="Full Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                id="mobilephone"
                                label="Mobile Phone"
                                name="mobilephone"
                                autoComplete="phone"
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
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
            </Grid> */}
                        {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <InputLabel ref={inputLabel} htmlFor="SelectUsergroup">
                                    User Group
                                </InputLabel>
                                <Select
                                    value={usergroup}
                                    onChange={e => setUsergroup(e.target.value)}
                                    labelWidth={labelWidth}
                                    inputProps={{
                                        name: 'User Group',
                                        id: 'SelectUsergroup',
                                    }}

                                >
                                    <MenuItem value={'Donor'}>Donor</MenuItem>
                                    <MenuItem value={'Organization'}>Organization</MenuItem>
                                    {/* <MenuItem value={'Admin'}>Admin</MenuItem> */}

                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Button
                        // href="#/app/dashboard"
                        onClick={() =>
                            updateProfile(
                                name,
                                email,
                                phone,
                                usergroup
                            )
                        }
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Update
                    </Button>
                    {/* <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
                </form>
            </div>
            {/* <Box mt={5}>
        <Copyright />
      </Box> */}
        </Container>
    );
}
