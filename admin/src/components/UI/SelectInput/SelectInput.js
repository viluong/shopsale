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
  // const [open, setOpen] = React.useState(false);

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleOpen = () => {
  //   setOpen(true);
  // };
  const { options, label, value } = props;  
  console.log("props", props)
  return (
    <FormControl  variant="standard" className={classes.formControl}>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
          labelId="select-label"
          id={props.id}
          value={value}  
          onChange={props.onChange}
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