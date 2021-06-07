import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import OrderList from '../../components/Admin/Orders/Orders';
import LayoutContent from '../../components/UI/LayoutContent/LayoutContent';

const useStyles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
});

class Orders extends Component {
  render () {
    const { classes } = this.props;
    return (
      <LayoutContent>
        <OrderList xs={12} paperClasses={classes.paper}/>
      </LayoutContent>
    )
  }
};

export default withStyles(useStyles)(Orders);