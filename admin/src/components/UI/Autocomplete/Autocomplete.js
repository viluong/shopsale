import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

const ControllableStates = (props) => {
  const initElements = props
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState('');
  let optionProps = {}

  if (initElements.default) {
    optionProps['defaultValue'] = initElements.default;
  }
  return (
    <div className={classes.root}>
      <Autocomplete
        {...optionProps}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={initElements.onChange}
        getOptionLabel = {initElements.getOptionLabel}
        inputValue={inputValue}
        autoComplete
        includeInputInList
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id={initElements.id}
        options={initElements.options}
        renderInput={(params) => <TextField {...params} error={initElements.error} required={initElements.required} label={initElements.label} margin="normal" />}
      />
    </div>
  );
}

export default ControllableStates;