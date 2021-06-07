import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import LayoutContent from '../../components/UI/LayoutContent/LayoutContent';
import Chart from '../../components/Admin/Chart/Chart';
import Deposits from '../../components/Admin/Deposits/Deposits';
import Orders from '../../components/Admin/Orders/Orders';

const useStyles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
});
class Dashboard extends Component {

  render () {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <LayoutContent>
        <Chart xs={12} md={8} lg={9} paperClasses={fixedHeightPaper} />
        <Deposits xs={12} md={4} lg={3} paperClasses={fixedHeightPaper} />
        <Orders xs={12} paperClasses={classes.paper} />
      </LayoutContent>
    )
  }
}

export default withStyles(useStyles)(Dashboard);