import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from 'components/Shop/AddressForm/AddressForm';
import PaymentForm from 'components/Shop/PaymentForm/PaymentForm';
import Review from 'components/Shop/ReviewOrder/ReviewOrder';
import * as actions from 'store/actions/index'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { checkoutSelector } from 'selectors/CheckoutSelector';
import * as utils from 'utils/utils';
import Spinner from 'components/UI/Spinner/Spinner';
import Aux from 'hocs/HightAux/HightAux';

const useStyles = makeStyles((theme) => ({

  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const checkout = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [addressForm, setAddressForm] = React.useState(null);
  const [isNext, setIsNext] = React.useState(false);

  const { address, carts, loading, error, orderName } = useSelector(checkoutSelector)

  const onInitAddress = useCallback(() => {
    dispatch(actions.getAddress())
  }, [dispatch]);

  useEffect(() => {
    onInitAddress()
  }, [onInitAddress]);

  const changeAddressForm = (data) => {
    setAddressForm(data)
  }

  const changeIsNext = (isNext) => {
    setIsNext(isNext)
  }

  const storeAddress = (addressForm) => {
    dispatch(actions.storeAddress(addressForm))
  }

  const storeOrder = () => {
    const orderData = utils.formatOrderData(address, carts)
    dispatch(actions.saveOrder(orderData))
  }

  const steps = ['Shipping address', 'Payment details', 'Review your order'];
  
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm onChangeIsNext={changeIsNext} onChangeAddressForm={changeAddressForm} address={address}/>;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review address={address} carts={carts} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    if (activeStep === 0) {
      storeAddress(addressForm)
    }
    if (activeStep === 2) {
      storeOrder()
    }
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <Aux>
      { loading ? <Spinner/> : ''}
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label, index) => {
            const labelProps = {}
              if (error && activeStep === 3 && index === 2) {
              labelProps.error = true
              labelProps.optional = (
                <Typography variant="caption" color="error">
                  Error Order
                </Typography>
              );
            }
            return (
              <Step key={label} >
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length 
          ? 
            (
              error 
                ? <React.Fragment>  
                    <Typography variant="h5" gutterBottom>
                      Can not booking order.
                    </Typography>
                    <Typography variant="subtitle1">
                      Please contact to admimitrastor.
                    </Typography>
                    <div className={classes.buttons}>
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    </div>
                  </React.Fragment>
        
                : <React.Fragment>  
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      { orderName ? `${orderName}. We have emailed your order confirmation, and will send you an update when your order has shipped.`: ''}
                      
                    </Typography>
                  </React.Fragment>
            ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  disabled={!isNext}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </Aux>
  );
}

export default checkout;