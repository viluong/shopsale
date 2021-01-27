import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as utils from 'utils/utils';

const paymentForm = (props) => {
  const [paymentForm, setPaymentForm] = useState({
    nameCard: {
      value: '',
      required: true,
      label: 'Card name',
      isError: '',
      autoComplete: 'cc-name',
      id:'nameCard'
    },
    numberCard: {
      value: '',
      required: true,
      label: 'Card number',
      isError: '',
      autoComplete: 'cc-number',
      id:'numberCard'
    },
    expiryDate: {
      value: '',
      required: true,
      isError: '',
      label: 'Expiry date',
      autoComplete: 'cc-exp',
      id:'expiryDate'
    },
    cvv: {
      value: '',
      required: true,
      isError: '',
      label: 'CVV',
      autoComplete: 'cc-cvv',
      id:'cvv'
    }
  });

  const onChangeInput = (event, field) => {
    event.preventDefault();
    const isValid = utils.checkValidity(event.target.value, paymentForm[field])
    const inputData = {
      ...paymentForm,
      [field]: {
        ...paymentForm[field],
        isError: !isValid,
        value: event.target.value
      }
    }
    setPaymentForm(inputData)
    props.onSubmitPayment(inputData)
    
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        {
          Object.keys(paymentForm).map((key, index) => {
            return (
              <Grid item xs={12} md={6} key={index}>
                <TextField
                  required={paymentForm[key].required}
                  id={paymentForm[key].id}
                  label={paymentForm[key].label}
                  fullWidth
                  autoComplete={paymentForm[key].autoComplete}
                  error={paymentForm[key].isError === true}
                  onChange={(event) => onChangeInput(event, key)}
                />
              </Grid>
            )
          })
        }
      </Grid>
    </React.Fragment>
  );
}

export default paymentForm;