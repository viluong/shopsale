import React from 'react';
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
import Spinner from 'components/UI/Spinner/Spinner';

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
  const classes = useStyles();
  const { handleSubmit, register } = useForm();

  const dispatch = useDispatch()
  const open = useSelector(state => state.auth.openSignIn)
  const loading = useSelector(state => state.auth.loading) 
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

  let body = <Spinner />
  
  if (!loading) {
    body = (
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
            <TextField
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
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
  }
  return (
    <div>
      <Typography onClick={handleOpen}>
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