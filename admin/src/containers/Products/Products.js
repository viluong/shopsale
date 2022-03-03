import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { withStyles } from '@mui/styles';
import LayoutContent from '../../components/UI/LayoutContent/LayoutContent';
import ProductList from '../../components/Admin/Products/Products';
import * as actions from '../../store/actions/index';
import Aux from '../../hocs/HightAux/HightAux';

const useStyles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
});

class Products extends Component {

  componentDidMount () {
    this.props.onInitProducts();
  }

  onChangePaging = (event, page) => {
    event.preventDefault();
    this.props.onFetchProducts(page)
  }

  render () {
    const { classes } = this.props;
    let products = this.props.products
    if(this.props.product){
      products = [
        this.props.product,
        ...products
      ]
    }
    return (
      <Aux>
        <LayoutContent>
          <ProductList 
            xs={12} 
            paperClasses={classes.paper} 
            products={products}
            totalCount={this.props.totalCount}
            onChangePaging={this.onChangePaging}
            title={'Product List'}
          />
        </LayoutContent>
      </Aux>
    )
  }
};

const mapStateToProps = state => {
  return {
    products: state.product.products,
    totalCount: state.product.totalCount,
    product: state.product.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitProducts: () => dispatch(actions.initProducts()),
    onFetchProducts: (page) => dispatch(actions.initProducts(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Products));