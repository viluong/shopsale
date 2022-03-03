import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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


const OrderForm = (props) => {
  const { InputForm, onChangeInput, onSubmitForm, isValidForm } = props;
  const classes = useStyles();
  const renderForm = () => {
    const form = Object.keys(InputForm).map((key, index) => {
      let item = InputForm[key]

      if (item.disableDisplay) {
        return '';
      }
      if (item.include_data) {
        item.elements.value = item.include_data.map((field, index) => {
          let elementForm = InputForm[field]
          return (
            <Grid key={index} item xs={elementForm.styles?.xs ? elementForm.styles.xs: false} md={elementForm.styles?.md ? elementForm.styles.md: false} lg={elementForm.styles?.lg ? elementForm.styles.lg: false}>
              { elementForm.renderComponent({...elementForm.elements, ...elementForm.validation}) }
            </Grid>
          )  
        })
      }

      item.elements['onChange'] = item.elements.onChange ? item.elements.onChange : (event, newValue) => onChangeInput(event, newValue, key);
      if (item.elements.default) {
        item.elements.value = item.elements.default
      }
      item.elements.error = false

      if ( !item.isValid && item.validation && item.touched) {
        item.elements.error = true
      }

      if (item.validation.required) {
        item.elements.required = item.validation.required
      }
      return (
        <Grid key={index} item xs={item.styles.xs ? item.styles.xs: false} md={item.styles.md ? item.styles.md: false} lg={item.styles.lg ? item.styles.lg: false}>
          { item.renderComponent({...item.elements}) }
        </Grid>
      )
    })
    return form;
  }
  return (
    <Aux>
        <Typography variant="h6" gutterBottom>
          Order Form
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

export default OrderForm;