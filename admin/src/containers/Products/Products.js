import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import LayoutContent from '../../components/UI/LayoutContent/LayoutContent';
import ProductList from '../../components/Admin/Products/Products';
import * as actions from '../../store/actions/index';

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

  render () {
    const { classes } = this.props;
    return (
      <LayoutContent>
        <ProductList 
          xs={12} 
          paperClasses={classes.paper} 
          products={this.props.products}
          title={'Product List'}
        />
      </LayoutContent>
    )
  }
};

const mapStateToProps = state => {
  return {
    products: state.product.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitProducts: () => dispatch(actions.initProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Products));