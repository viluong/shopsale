import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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


const InputForm = (props) => {
  const { productForm, onChangeInput, onSubmitForm, isValidForm } = props;
  const classes = useStyles();
  const renderForm = () => {
    const form = Object.keys(productForm).map((key, index) => {
      let item = productForm[key]
      item.elements['onChange'] = (event, newValue) => onChangeInput(event, newValue, key)
      item.elements.error = false
      if ( !item.isValid && item.validation && item.touched) {
        item.elements.error = true
      }
      return (
        <Grid key={index} item xs={item.styles.xs ? item.styles.xs: false} md={item.styles.md ? item.styles.md: false} lg={item.styles.lg ? item.styles.lg: false}>
          { item.renderComponent({...item.elements, ...item.validation}) }
        </Grid>
      )
    })
    return form;
  }

  return (
    <Aux>
        <Typography variant="h6" gutterBottom>
          Product
        </Typography>
        <Grid container spacing={3}>
          { renderForm() }
        </Grid>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!isValidForm}
            onClick={() => { onSubmitForm() }}
          >
            Save
          </Button>
        </div>
    </Aux>
  )
}

export default InputForm;