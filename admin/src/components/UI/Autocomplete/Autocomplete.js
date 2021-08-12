import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Aux from '../../../hocs/HightAux/HightAux';


const ControllableStates = (props) => {
  const initElements = props
  const [inputValue, setInputValue] = React.useState('');
  let optionProps = {}
  if (initElements.default) {
    optionProps['defaultValue'] = initElements.default;
  }
  return (
    <Aux>
      <Autocomplete
        {...optionProps}
        getOptionSelected={(option, value) => option.id === value.id}
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
    </Aux>
  );
}

export default ControllableStates;