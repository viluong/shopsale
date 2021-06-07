import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Aux from '../../../hocs/HightAux/HightAux';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const CreateProduct = () => {
  const defaultProps = {
    options: [],
    getOptionLabel: (option) => option.title,
  };
  const classes = useStyles();

  return (
    <Aux>
      <Typography variant="h6" gutterBottom>
        Product
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="image"
            name="image"
            label="Image"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            autoComplete="description"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="price"
            name="price"
            label="Price"
            fullWidth
            autoComplete="price"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="quantity"
            name="quantity"
            type="number"
            label="Quantity"
            fullWidth
            autoComplete="quantity"
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            {...defaultProps}
            id="auto-complete"
            autoComplete
            includeInputInList
            renderInput={(params) => <TextField {...params} label="Categoty" margin="normal" />}
          />

        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Save
        </Button>
      </div>
      
    </Aux>
  )
}

export default CreateProduct;