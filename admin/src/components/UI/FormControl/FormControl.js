import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import FormControl from '@mui/material/FormControl';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '100%',
  },
  
}));

const FormControlable = (props) => {
  const classes = useStyles();
 
  return (
    <FormControl className={classes.formControl}>
      {
        Array.isArray(props.children) ? props.children.map(item => item) : props.children
      }
    </FormControl>
  )
}

export default FormControlable;