import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import LayoutContent from '../../components/UI/LayoutContent/LayoutContent';
import CategoryForm from '../../components/Admin/Orders/OrderForm';
import ImageCard from '../../components/UI/ImageCard/ImageCard';
import FileInput from '../../components/UI/FileInput/FileInput';
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

class DetailCategory extends Component {
  state = {
    categoryForm: {
      image: {
        elements: {
          id: 'image',
          name: 'image',
          value: '',
          label: 'Image',
          fullWidth: true,
        },
        styles: {
          xs: 2,
        },
        validation: {
        },
        touched: false,
        isValid: true,
        renderComponent: (elements) => <FileInput />
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
        isValid: true,
        renderComponent: (elements) => <TextField {...elements} />
      },
      description: {
        elements: {  
          id: 'description',
          name: 'description',
          value: '',
          rows: 4,
          multiline: true,
          label: 'Description',
          fullWidth: true,
          autoComplete: "family-name"
        },
        styles: {
          xs: 12
        },
        validation: {},
        touched: false,
        isValid: true,
        renderComponent: (elements) => <TextField {...elements} />
      },

    },
    isFormValid: true,
    isChangeInput: false,
  }
  
  componentDidMount () {
    const { id } = this.props.match.params;
    this.props.onGetCategory(id);
  }

  onChangeInput = (event, newValue, field) => {
    event.preventDefault();
    const newInput = newValue ? newValue : event.target.value;
    let isValid = false;
    isValid = checkValidity(this.state.categoryForm[field].elements.getOptionLabel ? 
      this.state.categoryForm[field].elements.getOptionLabel(newInput) : 
      newInput, this.state.categoryForm[field].validation)
    const newElementInput = {
      elements: {
        ...this.state.categoryForm[field].elements,
        value: newInput
      },
      isValid: isValid,
      touched: true
    }

    const inputElementChanged = updateObject(this.state.categoryForm[field], newElementInput)
    const categoryFormUpdated = updateObject(this.state.categoryForm, {
      [field]: inputElementChanged
    })

    let isFormValid = true;
    for (let inputIdentifier in categoryFormUpdated) {
      console.log(inputIdentifier, categoryFormUpdated[inputIdentifier].isValid)
      isFormValid = categoryFormUpdated[inputIdentifier].isValid && isFormValid;
    }

    this.setState({
      categoryForm: categoryFormUpdated,
      isFormValid: isFormValid,
      isChangeInput: true
    })
  }
  
  onSubmitCategoryForm = (id) => {
    const data = {
      name: this.state.categoryForm.name.elements.value,
      description: this.state.categoryForm.description.elements.value
    }
    this.props.onEditCategory(id, data)    
  }

  render () {
    const { id } = this.props.match.params;
    const { classes } = this.props;
    const categoryForm = this.state.categoryForm;
    let categoryRender = '';
    if (this.props.category) {
      if (!this.state.isChangeInput) {   
        for (let inputIdentifier in categoryForm) {
          categoryForm[inputIdentifier].elements.value = this.props.category[inputIdentifier] ? this.props.category[inputIdentifier] : categoryForm[inputIdentifier].elements.value;
        }
      } else {
        for (let inputIdentifier in categoryForm) {
          if (categoryForm[inputIdentifier].elements.hasOwnProperty('computeValue')) {
            categoryForm[inputIdentifier].elements.value = categoryForm[inputIdentifier].elements.computeValue(categoryForm)
          }
        }
      }
      categoryRender = (
        <LayoutContent>
          <CategoryForm 
            xs={12} 
            paperClasses={classes.paper} 
            InputForm={categoryForm} 
            onChangeInput={this.onChangeInput} 
            isValidForm={this.state.isFormValid}
            onSubmitForm={() => this.onSubmitCategoryForm(id)} 
            />
        </LayoutContent>
      )
      return categoryRender
    }
    return categoryRender
  }
}

const mapStateToProps = state => {
  return {
    category: state.category.category
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetCategory: (id) => dispatch(actions.getCategory(id)),
    onEditCategory: (id, data) => dispatch(actions.editCategory(id, data))
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(withRouter(DetailCategory)));