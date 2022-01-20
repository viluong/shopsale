import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '100%',
  },
  
}));

const SelectionInput = (props) => {
  const classes = useStyles();

  const { options, label, value } = props;  
  const required = props.required ? ' *' : ''
  return (
    <FormControl  variant="standard" className={classes.formControl}>
      <InputLabel id="select-label">{label + required}</InputLabel>
      <Select
          labelId="select-label"
          id={props.id}
          value={value}  
          onChange={props.onChange}
          error={props.error}
        >
          {
            options.map((option, key) => (
              <MenuItem value={option.id} key={key}>{option.value}</MenuItem>
            ))
          }
        </Select>
    </FormControl>
  )
}

export default SelectionInput;