import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/styles';

import Aux from 'hocs/HightAux/HightAux';

import Header from 'components/Shop/Header/Header';
import Footer from 'components/Shop/Footer/Foorter';
import * as action from 'store/actions/index';
import withErrorHandler from 'hocs/withErrorHandler/withErrorHandler';
import axios from 'configs/axios';

const layout = (props) => {
  const { classes } = props;
  const dispatch = useDispatch()

  const onAutoSignIn = useCallback(() => {
    dispatch(action.initUserProfile())
  })

  const onInitCart = useCallback(() => {
    dispatch(action.initCarts())
  }, [dispatch])

  useEffect(() => {
    onAutoSignIn()
  }, [onAutoSignIn])

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

export default withStyles(useStyle)(withErrorHandler(layout, axios));