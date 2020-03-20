import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  MenuItem,
  InputAdornment,
  TextField,
  Container
  // Fade,
} from "@material-ui/core";
import clsx from 'clsx';
import useStyles from "./styles";
import { addDonationEntry } from "../../context/UserContext";
import SaveIcon from '@material-ui/icons/Save';
import PageTitle from "../../components/PageTitle";

export default function Geotextfield() {
  var classes = useStyles();
  var [latitude, setLatitude] = useState("");
  var [longitude, setLongitude] = useState("");
  var [userAddress, setUserAddress] = useState("");

  return (
        <TextField
            id="locationDescription"
            label="Location"
            value={userAddress}
            onChange={e => setUserAddress(e.target.value)}
            className={clsx(classes.margin, classes.textField)}
            type="text"
            name="locationDescription"
            autoComplete="locationDescription"
            margin="normal"
            variant="outlined"
            fullWidth
        />
  );


  function getLocation () {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError);
    } else {
        console.log("Geolocation not supported by browser");
    }
}

function getCoordinates(position){
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    reverseGeocodeCoordinates();
}

function reverseGeocodeCoordinates(){

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${process.env.REACT_APP_MAP_KEY}`)
    .then(response => response.json())
    .then(response => setUserAddress(response.results[0]['formatted_address']))
    .catch(error => console.log(error))
}

function handleLocationError(error){
    switch(error.code) {
        case error.PERMISSION_DENIED:
        case error.POSITION_UNAVAILABLE:
        case error.TIMEOUT:
        case error.UNKNOWN_ERROR:
            console.log("Location error handled?");
            break
        default:
            break;
    }
}

}
