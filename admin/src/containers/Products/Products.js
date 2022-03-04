import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { withStyles } from '@mui/styles';
import LayoutContent from '../../components/UI/LayoutContent/LayoutContent';
import ProductList from '../../components/Admin/ListItem/ListItem';
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
  state = {
    page: 1
  }
  
  componentDidMount () {
    this.props.onInitProducts();
  }

  onChangePaging = (event, page) => {
    event.preventDefault();
    this.props.onFetchProducts(page)
    this.setState({
      page: page
    })
  }

  render () {
    const { classes } = this.props;
    let products = this.props.products
    console.log("products", products)
    if(this.props.product){
      products = [
        this.props.product,
        ...products
      ]
    }
    const rowData = [
      {
        label: 'Image',
        name: 'image',
        renderValue: (elements) => (
          <img 
            src={elements.image} 
            className={elements.styleName ? elements.styleName: ''} 
            alt={elements.name} 
          />
        ),
        styles: {
          size: "small"
        }
      },
      {
        label: 'Name',
        name: 'name',
        styles: {

        }
      },
      {
        label: 'Quantity',
        name: 'quantity',
        styles: {

        }
      },
      {
        label: 'Unit Price',
        name: 'price',
        styles: {

        }
      }
    ]
    return (
      <Aux>
        <LayoutContent>
          <ProductList 
            title="Products"
            xs={12} 
            heightRow={60}
            rowData={rowData}
            paperClasses={classes.paper} 
            data={products}
            currentPage={this.state.page}
            totalCount={this.props.totalCount}
            onChangePaging={this.onChangePaging}
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