import React from 'react';
import { useForm } from 'react-hook-form';
// import Upload from '../upload/Upload'
// import Dropzone from '../dropzone/Dropzone'
import {
  Grid,
  CssBaseline,
  // CircularProgress,
  // Typography,
  Button,
  // Tabs,
  // Tab,
  Link,
  Box,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  TextField,
  Container
  // Fade,
} from "@material-ui/core";


export default function Form() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <Grid item xs={12}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Location" name="Location" ref={register({required: true, maxLength: 80})} />
        {/* <input type="text" placeholder="Last name" name="Last name" ref={register({required: true, maxLength: 100})} /> */}
        {/* <input type="text" placeholder="Email" name="Email" ref={register({required: true, pattern: /^\S+@\S+$/i})} />
        <input type="tel" placeholder="Mobile number" name="Mobile number" ref={register({required: true, minLength: 6, maxLength: 12})} />
        <select name="Title" ref={register({ required: true })}>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select> */}
        <TextField
            autoComplete="fullname"
            name="naSe"
            variant="outlined"
            // required
            fullWidth
            ref={register({required: true, maxLength: 80})}
            // value={name}
            // onChange={e => setName(e.target.value)}
            // id="name"
            label="Full Name"
            autoFocus
        />
        



        <input type="file" ref={register({required: true})} name="uploadedFile" />
  
      {/*    <input name="Developer" type="radio" value="Yes" ref={register({ required: true })}/>
        <input name="Developer" type="radio" value="No" ref={register({ required: true })}/> */}

        {/* <Dropzone /> */}

        <input type="submit" />
      </form>
    </Grid>
  );
}