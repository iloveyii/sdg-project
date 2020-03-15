import React, {useEffect, useState} from 'react';
import {
    InputLabel,
    Select,
    MenuItem,
    FormControl
} from "@material-ui/core"; 

export default function CustomSelect(props) {
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    const [data, setData] = useState(props.data);
    const [placeholderText] = useState(props.placeholderText);
    const [selectSize] = useState(props.selectSize);
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    useEffect( function handleDataChange() {
        if (props.data) {
            setData(props.data);
        }
    }, [props.data]);

    function handleChange(event) {
        setSelectedValue(event.target.value);
        if (props.onSelectChange) props.onSelectChange(event.target.value);
    }

    let options = data.map(data => (
        <MenuItem key={data.id} value={data.id}>
        {data.name}
        </MenuItem>
    ));
    
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
            </Select>
        </FormControl>
    );
}