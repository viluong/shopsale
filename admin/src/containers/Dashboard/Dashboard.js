import React, { Component } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import LayoutContent from '../../components/UI/LayoutContent/LayoutContent';
import Chart from '../../components/Admin/Chart/Chart';
import Deposits from '../../components/Admin/Deposits/Deposits';
import Orders from '../../components/Admin/Orders/Orders';
import * as actions from '../../store/actions';

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

  componentDidMount () {
    this.props.onInitOrders()
  }

  render () {
    const { classes, orders } = this.props;
    console.log("orders", orders)
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <LayoutContent>
        <Chart xs={12} md={8} lg={9} paperClasses={fixedHeightPaper} />
        <Deposits xs={12} md={4} lg={3} paperClasses={fixedHeightPaper} />
        <Orders xs={12} paperClasses={classes.paper} orders={orders} allowSeeMore />
      </LayoutContent>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitOrders: () => dispatch(actions.initOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Dashboard));