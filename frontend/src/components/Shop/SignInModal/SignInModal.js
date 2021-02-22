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
import LoginGoogle from '../../Social/LoginGoogle/LoginGoogle';
import * as action from '../../../store/actions/index';
import { useForm } from "react-hook-form";
import { authSelector } from 'selectors/AuthSelector';
import { element } from 'prop-types';
import * as utils from 'utils/utils';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "white",
    padding: '30px 30px',
    borderRadius: 10,
    zIndex: 999
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  socialLogin: {
    marginBottom: 10
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



const signInModal = () => {
  console.log(1221)
  const [formIsValid, setFormIsValid] = useState(false)
  const [initialSignIn, setInitialSignIn] = useState({
    email: {
      value: '',
      required: true,
      label: 'Email',
      isError: '',
      type: 'email',
      isAutoFocus: true
    },
    password: {
      value: '',
      required: true,
      label: 'Password',
      isError: '',
      type: 'password',
      isAutoFocus: false
    }
  })
  const classes = useStyles();
  const dispatch = useDispatch()

  const { handleSubmit, register } = useForm();
  const { open, loading } = useSelector(authSelector); 
  
  const handleOpen = () => {
    dispatch(action.openSignInModal());
  };

  const handleClose = () => {
    dispatch(action.closeSignInModal());
  };

  const openSignUp = () => {
    handleClose();
    dispatch(action.openSignUpModal());
  };

  const onSignIn = (data) => {
    dispatch(action.loginUser(data));
  };

  const onChangeInput = (event, field) => {
    
    event.preventDefault();
    let isValid = false;
    isValid = utils.checkValidity(event.target.value, initialSignIn[field])
    const inputSignIn = {
      ...initialSignIn,
      [field]: {
        ...initialSignIn[field],
        isError: !isValid,
        value: event.target.value
      }
    }
    let isFormValid = true
    for (let key in inputSignIn) {
      isFormValid = !inputSignIn[key].isError && isFormValid
    }
    setInitialSignIn(inputSignIn)
    setFormIsValid(isFormValid)
  }

  const formElementsArray = []
  
  for (let key in initialSignIn) {
    formElementsArray.push({
        id: key,
        config: initialSignIn[key]
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSignIn)}>
          { 
            formElementsArray.map( element => (
              <TextField
                key={element.id}
                error={element.config.isError === true}
                variant="outlined"
                margin="normal"
                required={element.config.required}
                fullWidth
                id={element.id}
                label={element.config.label}
                name={element.id}
                autoComplete={element.id}
                autoFocus={element.config.isAutoFocus}
                inputRef={register}
                value={element.config.value}
                onChange={(event) => onChangeInput(event, element.id)}
                />
            ))
          }
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register}
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!formIsValid}
          >
            Sign In
          </Button>
          <div className={classes.socialLogin}>
            <LoginGoogle />
          </div>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={openSignUp}>
                {"Don't have an account? Sign Up"}
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
        SignIn
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

export default signInModal