import React from 'react';

import withErrorHandler from '../withErrorHandler/withErrorHandler';
import Sidebar from '../../components/Admin/Sidebar/Sidebar';

import { Container, CssBaseline } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  container: {
    marginLeft: '9%',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,

}));

const Layout = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <Sidebar/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {props.children}
          </Container>
      </main>
    </div>
  )
}


export default withErrorHandler(Layout);