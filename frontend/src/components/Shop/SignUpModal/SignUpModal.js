import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import * as utils from 'utils/utils';

import * as action from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "white",
    padding: '30px 30px',
    borderRadius: 10
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const signUpModal = () => {
  const { handleSubmit, register } = useForm();

  const [formIsValid, setFormIsValid] = useState(false)
  const [initialSignUp, setInitialSignUp] = useState({
    firstName: {
      value: '',
      required: true,
      label: 'First name',
      isError: '',
      type: 'text',
      isAutoFocus: true,
      gridStyle: {
        xs: 12,
        sm: 6
      }
    },
    lastName: {
      value: '',
      required: true,
      label: 'Last Name',
      isError: '',
      type: 'text',
      isAutoFocus: false,
      gridStyle: {
        xs: 12,
        sm: 6
      }
    },
    email: {
      value: '',
      required: true,
      label: 'Email',
      isError: '',
      type: 'email',
      isAutoFocus: false,
      gridStyle: {
        xs: 12,
        sm: false
      }
    },
    password: {
      value: '',
      required: true,
      label: 'Password',
      isError: '',
      type: 'password',
      isAutoFocus: false,
      gridStyle: {
        xs: 12,
        sm: false
      }
    }
  })
  const classes = useStyles();
  const dispatch = useDispatch();

  const open = useSelector(state => state.auth.openSignUp)

  const handleOpen = () => {
    dispatch(action.openSignUpModal())
  };

  const handleClose = () => {
    dispatch(action.closeSignUpModal())
  };

  const openSignIn = () => {
    dispatch(action.closeSignUpModal());
    dispatch(action.openSignInModal());
  }

  const onSubmit = (data) => {
    dispatch(action.registerUser(data));
  }
  
  const onChangeInput = (event, field) => {
    
    event.preventDefault();
    let isValid = false;
    isValid = utils.checkValidity(event.target.value, initialSignUp[field])
    const inputSignUp = {
      ...initialSignUp,
      [field]: {
        ...initialSignUp[field],
        isError: !isValid,
        value: event.target.value
      }
    }
    let isFormValid = true
    for (let key in inputSignUp) {
      isFormValid = inputSignUp[key].isError === false && isFormValid
    }
    setInitialSignUp(inputSignUp)
    setFormIsValid(isFormValid)
  }

  const formElementsArray = []
  
  for (let key in initialSignUp) {
    formElementsArray.push({
        id: key,
        config: initialSignUp[key]
    });
  }


  const body = (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {
              formElementsArray.map( element => (
                <Grid {...element.config.gridStyle} key={element.id} item>
                  <TextField
                    key={element.id}
                    error={element.config.isError === true}
                    variant="outlined"
                    margin="normal"
                    required={element.config.required}
                    fullWidth
                    type={element.config.type}
                    id={element.id}
                    label={element.config.label}
                    name={element.id}
                    autoComplete={element.id}
                    autoFocus={element.config.isAutoFocus}
                    inputRef={register}
                    value={element.config.value}
                    autoComplete={element.id}
                    onChange={(event) => onChangeInput(event, element.id)}
                    />
                </Grid>
              ))
            }
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!formIsValid}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={openSignIn}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );

  return (
    <div>
      <Typography onClick={handleOpen} style={{cursor: 'pointer'}}>
        SignUp
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default signUpModal