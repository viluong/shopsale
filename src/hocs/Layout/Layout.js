import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

import Aux from '../Aux/Aux';
import Header from '../../components/Shop/Header/Header';
import Footer from '../../components/Shop/Footer/Foorter';

const layout = (props) => {
  const { classes } = props;
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