import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@mui/styles';
import LayoutContent from '../../components/UI/LayoutContent/LayoutContent';
import ProductForm from '../../components/Admin/Products/CreateProduct';
import TextField from '@mui/material/TextField';
import Autocomplete from '../../components/UI/Autocomplete/Autocomplete';
import { withRouter } from "react-router-dom";
import * as actions from '../../store/actions';
import { checkValidity, updateObject } from '../../utils/utils';

const useStyles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
});

class CreateProduct extends Component {
  state = {
    productForm: {
      name: {
        elements: {
          id: 'name',
          name: 'name',
          value: '',
          label: 'Name',
          fullWidth: true,
          autoComplete: "family-name",
        },
        styles: {
          xs: 12,
        },
        validation: {
          required: true,
        },
        touched: false,
        isValid: false,
        renderComponent: (elements) => <TextField {...elements} />
      },
      image: {
        elements: {  
          id: 'image',
          name: 'image',
          value: '',
          label: 'Image',
          fullWidth: true,
          autoComplete: "family-name"
        },
        styles: {
          xs: 12
        },
        validation: {
          required: true,
        },
        touched: false,
        isValid: false,
        renderComponent: (elements) => <TextField {...elements} />
      },
      description: {
        elements: {
          id: 'description',
          name: 'description',
          value: '',
          label: 'Description',
          fullWidth: true,
          multiline: true,
          rows: 4,
          autoComplete: "description",
          xs: 12
        },
        styles: {
          xs: 12
        },
        validation: {},
        touched: false,
        isValid: true,
        renderComponent: (elements) => <TextField {...elements} />
      },
      price: {
        elements: {
          id: 'price',
          name: 'price',
          value: '',
          label: 'Price',    
          fullWidth: true,
          autoComplete: "price"
        },
        styles: {
          xs: 12,
          sm: 6
        },
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
        renderComponent: (elements) => <TextField {...elements} />
      },
      quantity: {
        elements: {
          value: '',
          id: "quantity",
          name: "quantity",
          type: "number",
          label: "Quantity",
          fullWidth: true,
          autoComplete: "quantity",
        },
        styles: {
          xs: 12,
          sm: 6
        },
        validation: {
          required: true,
        },
        touched: false,
        isValid: false,
        renderComponent: (elements) => <TextField {...elements} />
      },
      category: {
        elements: {
          options: [],
          getOptionLabel: (option) => option.name,
          id: "auto-complete",
          defaultValue: '',
          label: 'Category',
        },
        styles: {
          xs: 12
        },
        validation: {
          required: true,
        },
        touched: false,
        isValid: false,
        renderComponent: (elements) => <Autocomplete {...elements} />
      }
    },
    isValidForm: true,
    product: {}
  }
  
  componentDidMount () {
    this.props.onInitCategories()
  }

  onChangeInput = (event, newValue, field) => {
    event.preventDefault();
    const newInput = newValue ? newValue : event.target.value  
    let isValid = false;
    isValid = checkValidity(newValue ? this.state.productForm[field].elements.getOptionLabel(newValue) : event.target.value, this.state.productForm[field].validation)
    const inputElementChanged = updateObject(this.state.productForm[field], {
      elements: {
        ...this.state.productForm[field].elements,
        value: newInput,
      },
      isValid: isValid,
      touched: true
    })

    const productFormUpdated = updateObject(this.state.productForm, {
      [field]: inputElementChanged
    })

    let isFormValid = true;
    for (let inputIdentifier in productFormUpdated) {
      isFormValid = productFormUpdated[inputIdentifier].isValid && isFormValid;
    }

    this.setState({
      productForm: productFormUpdated,
      isFormValid: isFormValid
    })
  }

  creareProduct = () => {
    const formData = {
      name: this.state.productForm['name'].elements.value,
      category_id: this.state.productForm['category'].elements.value.id,
      description: this.state.productForm['description'].elements.value,
      price: this.state.productForm['price'].elements.value,
      quantity: this.state.productForm['quantity'].elements.value
    }
    this.props.onCreateProduct(formData)
  }

  render () {
    const { classes } = this.props;
    const productForm = this.state.productForm;
    productForm.category.elements.options = this.props.categories;
    return (
      <LayoutContent>
        <ProductForm 
          xs={12} 
          paperClasses={classes.paper} 
          productForm={productForm} 
          onChangeInput={this.onChangeInput} 
          isValidForm={this.state.isFormValid}
          onSubmitForm={this.creareProduct}
          />
      </LayoutContent>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitCategories: () => dispatch(actions.getCategories()),
    onCreateProduct: (data) => dispatch(actions.createProduct(data))
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(withRouter(CreateProduct)));