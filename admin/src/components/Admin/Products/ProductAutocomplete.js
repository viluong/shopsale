import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import makeStyles from '@mui/styles/makeStyles';

import * as services from '../../../store/services';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
}));

const ProductAutoComplete = (props) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const classes = useStyles();
  const elements = props;

  const onChangeHandle = async value => {
    const response = await services.searchProducts(value);
    const products = response.data.results;
    setOptions(Object.keys(products).map(key => products[key]));
  };

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    } else {
      setOptions(elements.options);
    }
  }, [open, elements.options]);

  console.log("sdsdsadas",elements)
  return (
    <div className={classes.root}>
      <Autocomplete
        id={elements.id}
        open={open}
        onChange={elements.onChange}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        defaultValue={elements.default}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionLabel={option => option.name}
        options={options}
        loading={loading}
        renderInput={params => (
          <TextField
            {...params}
            onChange={ev => {
              if (ev.target.value !== "" || ev.target.value !== null) {
                onChangeHandle(ev.target.value);
              }
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
      />
    </div>
  );
}

export default ProductAutoComplete