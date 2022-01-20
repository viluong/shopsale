import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@mui/styles';
import LayoutContent from '../../components/UI/LayoutContent/LayoutContent';
import CategoryForm from '../../components/Admin/Orders/OrderForm';
import TextField from '@mui/material/TextField';
import DropDrapImage from '../../components/UI/DropDrapZone/DropDrapImage';
import { withRouter } from "react-router-dom";
import * as actions from '../../store/actions';
import { checkValidity, updateObject } from '../../utils/utils';

const useStyles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
});

class CreateCategory extends Component {
  state = {
    categoryForm: {
      image: {
        elements: {
          id: 'image',
          name: 'image',
          value: '',
          label: 'Image',
          onChange: (files) => this.onChangeDrapDrop(null, files, 'image')
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
  }
  
  onChangeDrapDrop = (event, files, field) => {
    const file = files.length > 0 ? files[0] : null; 
    this.onChangeInput(event, file, field)
  }

  onChangeInput = (event, newValue, field) => {
    console.log("1212")
    if (event) {
      event.preventDefault();
    }
    const newInput = newValue ? newValue : event?.target.value  
    let isValid = false;
    isValid = checkValidity(
      this.state.categoryForm[field].elements.getOptionLabel ? 
        this.state.categoryForm[field].elements.getOptionLabel(newInput) : 
          newInput, 
      this.state.categoryForm[field].validation
    )
    const inputElementChanged = updateObject(this.state.categoryForm[field], {
      elements: {
        ...this.state.categoryForm[field].elements,
        value: newInput,
      },
      isValid: isValid,
      touched: true
    })

    const categoryFormUpdated = updateObject(this.state.categoryForm, {
      [field]: inputElementChanged
    })

    let isFormValid = true;
    for (let inputIdentifier in categoryFormUpdated) {
      isFormValid = categoryFormUpdated[inputIdentifier].isValid && isFormValid;
    }

    this.setState({
      categoryForm: categoryFormUpdated,
      isFormValid: isFormValid
    })
  }

  creareCategory = () => {
    const formData = {
      name: this.state.categoryForm['name'].elements.value,
      description: this.state.categoryForm['description'].elements.value
    }
    this.props.onCreateCategory(formData)
  }

  render () {
    const { classes } = this.props;
    const categoryForm = this.state.categoryForm;
    return (
      <LayoutContent>
        <CategoryForm 
          xs={12} 
          paperClasses={classes.paper} 
          InputForm={categoryForm} 
          onChangeInput={this.onChangeInput} 
          isValidForm={this.state.isFormValid}
          onSubmitForm={this.creareCategory}
          />
      </LayoutContent>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onCreateCategory: (data) => dispatch(actions.createCategory(data))
  }
} 

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(withRouter(CreateCategory)));