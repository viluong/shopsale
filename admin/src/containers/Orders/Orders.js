import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { withStyles } from '@mui/styles';
import OrderList from '../../components/Admin/Orders/Orders';
import LayoutContent from '../../components/UI/LayoutContent/LayoutContent';
import * as actions from '../../store/actions';

const useStyles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
});

class Orders extends Component {
  
  componentDidMount () {
    this.props.onFetchOrders()
  }
  
  onChangePaging = (event, page) => {
    event.preventDefault();
    this.props.onFetchOrders(page)
  }


  render () {
    const { classes } = this.props;
    return (
      <LayoutContent>
        <OrderList xs={12} paperClasses={classes.paper} orders={this.props.orders} totalCount={this.props.totalCount} onChangePaging={this.onChangePaging}/>
      </LayoutContent>
    )
  }
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    totalCount: state.order.totalCount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (page) => dispatch(actions.fetchOrders(page)),
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Orders));