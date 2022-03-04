import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@mui/styles';
import LayoutContent from '../../components/UI/LayoutContent/LayoutContent';
import ProductForm from '../../components/Admin/Form/InputForm';
import TextField from '@mui/material/TextField';
import DropDrapImage from '../../components/UI/DropDrapZone/DropDrapImage';
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
      image: {
        elements: {
          id: 'image',
          name: 'image',
          value: '',
          default: '',
          label: 'Image',
          onChange: (files) => this.onChangeDrapDrop(files, 'image')
        },
        styles: {
          xs: 4,
        },
        validation: {
        },
        touched: false,
        isValid: true,
        renderComponent: (elements) => <DropDrapImage {...elements} />
      },
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
    product: {},
    isFinished: false
  }
  
  componentDidMount () {
    this.props.onInitCategories()
  }
  
  onChangeDrapDrop = (files, field) => {
    const file = files.length > 0 ? files[0] : null; 
    this.onChangeInput(null, file, field)
  }

  onChangeInput = (event, newValue, field) => {
    if (event) {
      event.preventDefault();
    }
    const newInput = newValue ? newValue : event?.target.value  
    let isValid = false;
    isValid = checkValidity(this.state.productForm[field].elements.getOptionLabel ? this.state.productForm[field].elements.getOptionLabel(newInput) : newInput, this.state.productForm[field].validation)
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
          tilteForm={'Product Form'} 
          xs={12} 
          paperClasses={classes.paper} 
          inputForm={productForm} 
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