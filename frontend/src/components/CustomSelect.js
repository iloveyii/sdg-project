import React, {useEffect, useState} from 'react';
import {Grid,
    CssBaseline,
    Button,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Container
} from "@material-ui/core"; 

export default function CustomSelect(props) {
    console.log('+++++++++++++++');
    console.log(props)

    
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);

    const [data] = useState(props.data);
    const [placeholderText] = useState(props.placeholderText);
    const [selectSize] = useState(props.selectSize);
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    // const handleChange = panel => (event, isExpanded) => {
    //     setExpanded(isExpanded ? panel : false);
    // };

    // const handleChange = (event) => {
    function handleChange(event) {
        // console.log(event.target.value);
        setSelectedValue(event.target.value);
        if (props.onSelectChange) props.onSelectChange(selectedValue);
    }

    let options = data.map(data => (
        <MenuItem key={data.id} value={data.name}>
        {data.name}
        </MenuItem>
    ));

    console.log(placeholderText.replace(/\s/g, ''))
    
    return (
        <FormControl variant="outlined" size={selectSize} required={true} fullWidth>
            <InputLabel ref={inputLabel} htmlFor={placeholderText.replace(/\s/g, '')}>
                {placeholderText}
            </InputLabel>
            <Select
                value={selectedValue}
                onChange={handleChange}
                
                labelWidth={labelWidth}
                inputProps={{
                    name: placeholderText.replace(/\s/g, ''),
                    id: placeholderText.replace(/\s/g, ''),
                }}
            >
            {options}
                {/* <MenuItem value={'FHS-A'}>FHS-A</MenuItem>
                <MenuItem value={'FHS-B'}>FHS-B</MenuItem> */}
            </Select>
        </FormControl>
    );
}