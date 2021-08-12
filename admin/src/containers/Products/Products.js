import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { withStyles } from '@material-ui/styles';
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
    created: true,
  }
  componentDidMount () {
    this.props.onInitProducts();
  }
  
  errorConfirmedHandler = () => {
    this.setState( { created: null } );
  }

  render () {
    const { classes } = this.props;
    let modal = ''
    if (this.props.created) {
      modal = (
        <Modal
            show={this.state.created}
            modalClosed={this.errorConfirmedHandler}>
            Created Successfully!!
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
    created: state.product.created
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitProducts: () => dispatch(actions.initProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Products));