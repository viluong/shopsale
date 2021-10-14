import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { withStyles } from '@mui/styles';
import LayoutContent from '../../components/UI/LayoutContent/LayoutContent';
import ProductList from '../../components/Admin/Products/Products';
import * as actions from '../../store/actions/index';
import Modal from '../../components/UI/Modal/Modal';
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
    popup: true,
  }
  componentDidMount () {
    this.props.onInitProducts();
  }
  
  errorConfirmedHandler = () => {
    this.setState( { popup: null } );
  }
  
  onChangePaging = (event, page) => {
    event.preventDefault();
    this.props.onFetchProducts(page)
  }

  render () {
    const { classes } = this.props;
    let modal = ''
    if (this.props.popup) {
      modal = (
        <Modal
            show={this.state.popup}
            modalClosed={this.errorConfirmedHandler}>
            {this.props.popupMess}
        </Modal>
      )
    }
    
    return (
      <Aux>
        { modal }
        <LayoutContent>
          <ProductList 
            xs={12} 
            paperClasses={classes.paper} 
            products={this.props.products}
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
    popup: state.product.popup,
    popupMess: state.product.popupMessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitProducts: () => dispatch(actions.initProducts()),
    onFetchProducts: (page) => dispatch(actions.initProducts(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Products));