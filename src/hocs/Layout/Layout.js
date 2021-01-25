import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/styles';

import Aux from '../Aux/Aux';
import Header from '../../components/Shop/Header/Header';
import Footer from '../../components/Shop/Footer/Foorter';
import * as action from '../../store/actions/index';

const layout = (props) => {
  const { classes } = props;
  const dispatch = useDispatch()

  const onInitUserProfile = () => {
    dispatch(action.initUserProfile())
  }

  const onAutoSignIn = () => {
    dispatch(action.checkAuth())
  }

  const onInitCart = useCallback(() => {
    dispatch(action.initCarts())
  }, [dispatch])

  useEffect(() => {
    onAutoSignIn()
  }, [onAutoSignIn])

  useEffect(() => {
    onInitUserProfile()
  }, [onInitUserProfile])

  useEffect(() => {
    onInitCart()
  }, [onInitCart])
  
  return (
      <Aux>
          <Header/>
          <main className={classes.main}>
              {props.children}
          </main>
          <Footer/>   
      </Aux>
  )
}

const useStyle = theme => ({
    main: {
      marginTop:140,
      [theme.breakpoints.down("md")]: {
        marginTop: 120,
      },
    },
  });

export default withStyles(useStyle)(layout);