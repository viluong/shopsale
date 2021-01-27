import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import * as utils from 'utils/utils';
import { useSelector } from 'react-redux';
import { checkoutSelector } from 'selectors/CheckoutSelector';

let initialAddress = {
  firstName: {
    value: '',
    required: true,
    label: 'First name',
    isError: ''
  },
  lastName: {
    value: '',
    required: true,
    label: 'Last name',
    isError: ''
  },
  address1: {
    value: '',
    required: true,
    isError: '',
    label: 'Address1'
  },
  address2: {
    value: '',
    required: false,
    isError: '',
    label: 'Address2'
  },
  city: {
    value: '',
    required: false,
    isError: '',
    label: 'City'
  },
  state: {
    value: '',
    required: false,
    isError: '',
    label: 'State/Province/Region'
  },
  zip: {
    value: '',
    required: true,
    isError: '',
    label: 'Zip / Postal code'
  },
  country: {
    value: '',
    required: true,
    isError: '',
    label: 'Country'
  }
}

const addressForm = (props) => {
  const { address } = useSelector(checkoutSelector)

  const checkAddress = (address) => {
    if (address) {
      let isValid = false;
      for (const [key, value] of Object.entries(initialAddress)) {
        initialAddress[key].value = address[key]
        isValid = utils.checkValidity(initialAddress[key].value, initialAddress[key])
      }
      if (isValid) {
        props.onChangeIsNext(true)
      }
      props.onChangeAddressForm(initialAddress)
    }
  }
  
  useEffect(() => {
    checkAddress(address);
  }, [address])

  const onChangeInput = (event, field) => {
    event.preventDefault();
    const isValid = utils.checkValidity(event.target.value, initialAddress[field])
    const inputData = {
      ...initialAddress,
      [field]: {
        ...initialAddress[field],
        isError: !isValid,
        value: event.target.value
      }
    }
    initialAddress = inputData;

    props.onChangeIsNext(isValid)
    props.onChangeAddressForm(inputData)
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            error={initialAddress.firstName.isError === true}
            required={initialAddress.firstName.required}
            id="firstName"
            name="firstName"
            label={initialAddress.firstName.label}
            fullWidth
            autoComplete="given-name"
            value={initialAddress.firstName.value}
            onChange={(event) => onChangeInput(event, 'firstName')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={initialAddress.lastName.isError === true}
            required={initialAddress.lastName.required}
            id="lastName"
            name="lastName"
            label={initialAddress.lastName.label}
            fullWidth
            autoComplete="family-name"
            value={initialAddress.lastName.value}
            onChange={(event) => onChangeInput(event, 'lastName')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={initialAddress.address1.isError === true}
            required={initialAddress.address1.required}
            id="address1"
            name="address1"
            label={initialAddress.address1.label}
            fullWidth
            autoComplete="shipping address-line1"
            value={initialAddress.address1.value}
            onChange={(event) => onChangeInput(event, 'address1')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={initialAddress.address2.isError === true}
            required={initialAddress.address2.required}
            id="address2"
            name="address2"
            label={initialAddress.address2.label}
            fullWidth
            autoComplete="shipping address-line2"
            value={initialAddress.address2.value}
            onChange={(event) => onChangeInput(event, 'address2')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={initialAddress.city.isError === true}
            required={initialAddress.city.required}
            id="city"
            name="city"
            label={initialAddress.city.label}
            fullWidth
            autoComplete="shipping address-level2"
            value={initialAddress.city.value}
            onChange={(event) => onChangeInput(event, 'city')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            error={initialAddress.state.isError === true}
            id="state" 
            name="state" 
            label={initialAddress.state.label} 
            fullWidth
            required={initialAddress.state.required}
            value={initialAddress.state.value}
            onChange={(event) => onChangeInput(event, 'state')}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={initialAddress.zip.isError === true}
            required={initialAddress.zip.required}
            id="zip"
            name="zip"
            label={initialAddress.zip.label}
            fullWidth
            autoComplete="shipping postal-code"
            value={initialAddress.zip.value}
            onChange={(event) => onChangeInput(event, 'zip')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={initialAddress.country.isError === true}
            required={initialAddress.country.required}
            id="country"
            name="country"
            label={initialAddress.country.label}
            fullWidth
            autoComplete="shipping country"
            value={initialAddress.country.value}
            onChange={(event) => onChangeInput(event, 'country')}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default addressForm;