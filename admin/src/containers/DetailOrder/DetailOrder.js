import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import LayoutContent from '../../components/UI/LayoutContent/LayoutContent';
import OrderForm from '../../components/Admin/Orders/OrderForm';
import DataGrid from '../../components/UI/DataGrid/DataGrid';
import { withRouter } from "react-router-dom";
import * as actions from '../../store/actions';
import { checkValidity, updateObject } from '../../utils/utils';
import SelectionInput from '../../components/UI/SelectInput/SelectInput';
import FormControl from '../../components/UI/FormControl/FormControl';
import ProductAutoComplete from '../../components/Admin/Products/ProductAutocomplete';
import ColumnGrid from '../../components/UI/ColumnGrid/ColumnGrid';

import { PAYMENT_MENTHODS } from '../../configs/variable';

var _ = require('lodash');

const useStyles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
});

class DetailOrder extends Component {
  state = {
    orderForm: {
      ship_name: {
        elements: {
          id: 'ship_name',
          name: 'ship_name',
          value: '',
          label: 'Ship Name',
          fullWidth: true,
          autoComplete: "family-name",
        },
        styles: {
          xs: 6,
        },
        validation: {
          required: true,
        },
        touched: false,
        isValid: true,
        renderComponent: (elements) => <TextField {...elements} />
      },
      ship_email: {
        elements: {  
          id: 'ship_email',
          name: 'ship_email',
          value: '',
          label: 'Ship Email',
          fullWidth: true,
          autoComplete: "family-name"
        },
        styles: {
          xs: 6
        },
        validation: {},
        touched: false,
        isValid: true,
        renderComponent: (elements) => <TextField {...elements} />
      },
      ship_phone: {
        elements: {
          id: 'ship_phone',
          name: 'ship_phone',
          value: '',
          label: 'Ship Phone',
          fullWidth: true,
          multiline: true,
          autoComplete: "ship_phone",
        },
        styles: {
          xs: 12,
          sm: 6
        },
        validation: {
          required: true,
        },
        touched: false,
        isValid: true,
        renderComponent: (elements) => <TextField {...elements} />
      },
      ship_address: {
        elements: {
          id: 'ship_address',
          name: 'ship_address',
          value: '',
          label: 'Ship Address',    
          fullWidth: true,
          autoComplete: "ship_address"
        },
        styles: {
          xs: 12,
          sm: 6
        },
        validation: {
          required: true,
        },
        isValid: true,
        touched: false,
        renderComponent: (elements) => <TextField {...elements} />
      },
      ship_city: {
        elements: {
          value: '',
          id: "ship_city",
          name: "ship_city",
          label: "Ship city",
          fullWidth: true,
          autoComplete: "ship_city",
        },
        styles: {
          xs: 6,
          sm: 6
        },
        validation: {
          required: true,
        },
        touched: false,
        isValid: true,
        renderComponent: (elements) => <TextField {...elements} />
      },
      ship_district: {
        elements: {
          value: '',
          id: "ship_district",
          name: "ship_district",
          label: "Ship district",
          fullWidth: true,
          autoComplete: "ship_district",
        },
        styles: {
          xs: 6,
          sm: 6
        },
        validation: {
          required: true,
        },
        touched: false,
        isValid: true,
        renderComponent: (elements) => <TextField {...elements} />
      },
      payment_method: {
        elements: {
          value: '',
          id: "payment_method",
          name: "payment_method",
          label: "Payment Method",
          options: PAYMENT_MENTHODS,
          fullWidth: true,
          autoComplete: "payment_method",
          onChange: (event) => this.onChangeInput(event, event.target.value, 'payment_method')
        },
        styles: {
          xs: 12,
          sm: 6
        },
        validation: {
          required: true,
        },
        touched: false,
        isValid: true,
        renderComponent: (elements) => <SelectionInput {...elements} />
      },
      delivery_fee: {
        elements: {
          value: 0,
          id: "delivery_fee",
          name: "delivery_fee",
          label: "Delivery Fee",
          fullWidth: true,
          autoComplete: "delivery_fee",
          adornment: "đ"
        },
        styles: {
          xs: 12,
          sm: 6
        },
        validation: {
          required: true,
        },
        touched: false,
        isValid: true,
        disableDisplay: true,
        renderComponent: (elements) => {
          return <ColumnGrid {...elements} />
        }
      },
      sub_total: {
        elements: {
          value: '',
          id: "sub_total",
          name: "sub_total",
          label: "Sub Total",
          fullWidth: true,
          autoComplete: "sub_total",
          adornment: "đ",
          computeValue: data => this.onComputeSubTotal(data)
        },
        styles: {
          xs: 12,
          sm: 6
        },
        validation: {
          required: true,
        },
        touched: false,
        isValid: true,
        disableDisplay: true,
        renderComponent: (elements) => {
          return <ColumnGrid {...elements} />
        }
      },
      total: {
        elements: {
          value: '',
          id: "total",
          name: "total",
          label: "Total",
          fullWidth: true,
          autoComplete: "total",
          adornment: "đ",
          computeValue: data => this.onComputeTotal(data)

        },
        styles: {
          xs: 12,
          sm: 6
        },
        validation: {
          required: true,
        },
        touched: false,
        isValid: true,
        disableDisplay: true,
        renderComponent: (elements) => {
          return <ColumnGrid {...elements} />
        }
      },
      order_lines: {
        elements: {
          id: "order_lines",
          label: 'order_lines',
          value: '',
          enableDelete: true,
          enableAddNew: true,
          onDeleteRowDataGrid: (id) => this.onDeleteRowDataGrid(id),
          onClickAddNew: () => this.addNewDataGrid('order_lines'),
          onEditRowsModel: (model) => this.onChangeDataGrid(model, 'order_lines'),
          getDataGridColumns: () => {
            return [  
              {
                field: 'product',
                headerName: 'Product',
                width: 500,
                disableClickEventBubbling: true,
                renderCell: (params) => {
                  let filteredProduct = this.props.products;
                  let productDefault = ''
                  const producDefaults = this.props.order.order_lines.filter((item) => item.id === params.id)
                  productDefault = producDefaults[0]?.product
                  if (!filteredProduct.some(item => item.id === productDefault?.id) && productDefault) {
                    filteredProduct = [...filteredProduct, productDefault]
                  }
                  const elements = {
                    options: filteredProduct,
                    id: params.id,
                    default: productDefault,
                    onChange: (event, value) => {
                      event.preventDefault()
                      return this.onChangeProduct(params.id, value)
                    }
                  }
                  return (
                    <ProductAutoComplete {...elements}/>
                  )
                }
              },
              {
                field: 'product_id',
                hide: true
              },
              {
                field: 'quantity',
                headerName: 'Quantity',
                type: 'number',
                width: 150,
                editable: true,
              },
              {
                field: 'price',
                headerName: 'Price',
                type: 'number',
                width: 150,
                editable: true,
                valueGetter: (params) => {
                  const product = params.getValue(params.id, 'product') || '';
                  if (params.value !== 0 && product) {
                    return params.value;
                  } 
                  
                  return product ? product.price : 0
                }
              },
              {
                field: 'subtotal',
                headerName: 'Sub Total',
                width: 150,
                type: 'number',
                editable: false,
                valueGetter: (params) => {
                  const price = params.getValue(params.id, 'price') || 0
                  const quantity = params.getValue(params.id, 'quantity') || 0
                  return price * quantity
                }
              },
              {
                field: 'is_new',
                type: 'boolean',
                editable: false,
                hide: true,
                default: false
              }
            ]
          },
          getDataGridRows: (data) => {
            return data
          }
        },
        styles: {
          xs: 12
        },
        validation: {
          required: true,
        },
        touched: false,
        isValid: true,
        disableDisplay: true,
        renderComponent: (elements) => <DataGrid {...elements} />
        
      },
      order_line_form: {
        elements: {
          id: "order_line_form",
          label: 'Order Line Form',
          value: ''
        },
        styles: {
          xs: 12
        },

        validation: {},
        include_data: [
          'order_lines',
          'sub_total',
          'delivery_fee',
          'total'
        ],
        renderComponent: (elements) => <FormControl {...elements}>{ elements.value }</FormControl>
      }
    },
    isFormValid: true,
    isChangeInput: false,
    orderLineDelete: []
  }
  
  componentDidMount () {
    const { id } = this.props.match.params;
    this.props.onGetOrder(id);
    this.props.onSearchProducts()
  }

  onChangeDataGrid = (value, field) => {
    if (value && Object.keys(value).length !== 0) {
      const newValue = this.state.orderForm[field].elements.value;
      const newInput = newValue.map((item) => {
        const id = Object.keys(value)[0]
        const key = Object.keys(value[id])[0]
        if (item.id === id) {
          let result = {
            ...item,
            [key]: value[id][key].value,
          }
          if (key === 'product') {
            result['price'] = value[id][key].value.price
          }
          return result
        }
        return item
      })
      const newElementInput = {
        elements: {
          ...this.state.orderForm[field].elements,
          value: newInput
        },
        isValid: true,
        touched: true
      }
      const inputElementChanged = updateObject(this.state.orderForm[field], newElementInput)
      const orderFormUpdated = updateObject(this.state.orderForm, {
        [field]: inputElementChanged
      })
      this.setState({
        orderForm: orderFormUpdated,
        isFormValid: true,
        isChangeInput: true
      })
    }
  }

  onChangeProduct = (id, value) => {
    const model = { 
      [id]: {
        product: {
          value: value
        } 
      }
    }
    this.onChangeDataGrid(model, 'order_lines')
  }
  
  addNewDataGrid = (field) => {
    const newInput = {
      id: _.uniqueId(),
      quantity: 1,
      price: 0,
      subtotal: 0,
      is_new: true
    }
    const newElementInput = {
      elements: updateObject(this.state.orderForm[field].elements, {
        value: [...this.state.orderForm[field].elements.value, newInput]
      }),
      isValid: true,
      touched: true
    }
    const inputElementChanged = updateObject(this.state.orderForm[field], newElementInput)
    const orderFormUpdated = updateObject(this.state.orderForm, {
      [field]: inputElementChanged
    })
    this.setState({
      orderForm: orderFormUpdated,
      isFormValid: true,
      isChangeInput: true
    })
  }

  onDeleteRowDataGrid = (id) => {
    const orderForm = this.state.orderForm;
    const orderLineDelete = this.state.orderLineDelete;
    const newOrderLineValues = orderForm.order_lines.elements.value.filter(item => item.id !== id)
    const newOrderForm = updateObject(orderForm, {
      order_lines: updateObject(orderForm.order_lines, {
        elements: updateObject(orderForm.order_lines.elements, {
          value: [...newOrderLineValues]
        })
      })
    })
    this.setState({
      orderForm: newOrderForm,
      isFormValid: true,
      isChangeInput: true,
      orderLineDelete: [
        ...orderLineDelete,
        id
      ]
    })
  }

  onChangeInput = (event, newValue, field) => {
    event.preventDefault();
    const newInput = newValue ? newValue : event.target.value;
    let isValid = false;
    isValid = checkValidity(this.state.orderForm[field].elements.getOptionLabel ? 
      this.state.orderForm[field].elements.getOptionLabel(newInput) : 
      newInput, this.state.orderForm[field].validation)
    const newElementInput = {
      elements: {
        ...this.state.orderForm[field].elements,
        value: newInput
      },
      isValid: isValid,
      touched: true
    }

    const inputElementChanged = updateObject(this.state.orderForm[field], newElementInput)
    const orderFormUpdated = updateObject(this.state.orderForm, {
      [field]: inputElementChanged
    })

    let isFormValid = true;
    for (let inputIdentifier in orderFormUpdated) {
      console.log(inputIdentifier, orderFormUpdated[inputIdentifier].isValid)
      isFormValid = orderFormUpdated[inputIdentifier].isValid && isFormValid;
    }

    this.setState({
      orderForm: orderFormUpdated,
      isFormValid: isFormValid,
      isChangeInput: true
    })
  }
  
  onComputeSubTotal = (data) => {
    return data.order_lines.elements.value.reduce((result, item) => result = result + (item.price * item.quantity), 0)
  }

  onComputeTotal = (data) => {
    const subTotal = data.order_lines.elements.value.reduce((result, item) => result = result + (item.price * item.quantity), 0)
    return subTotal + data.delivery_fee.elements.value
  }

  onSubmitOrderForm = (id) => {
    const data = {
      ship_name: this.state.orderForm.ship_name.elements.value,
      ship_email: this.state.orderForm.ship_email.elements.value,
      ship_phone: this.state.orderForm.ship_phone.elements.value,
      ship_city: this.state.orderForm.ship_city.elements.value,
      ship_address: this.state.orderForm.ship_address.elements.value,
      ship_district: this.state.orderForm.ship_district.elements.value,
      payment_method: this.state.orderForm.payment_method.elements.value,
      order_lines: this.state.orderForm.order_lines.elements.value.map((item) => {
        let data = {
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.price
        }
        if (!item.is_new) {
          data['id'] = item.id
        }
        return data
      }),
      order_line_delete: this.state.orderLineDelete
    }
    this.props.onEditOrder(id, data)    
  }

  render () {
    const { id } = this.props.match.params;
    const { classes } = this.props;
    const orderForm = this.state.orderForm;
    let orderRender = '';
    if (this.props.order) {
      if (!this.state.isChangeInput) {   
        for (let inputIdentifier in orderForm) {
          orderForm[inputIdentifier].elements.value = this.props.order[inputIdentifier] ? this.props.order[inputIdentifier] : orderForm[inputIdentifier].elements.value;
        }
      } else {
        for (let inputIdentifier in orderForm) {
          if (orderForm[inputIdentifier].elements.hasOwnProperty('computeValue')) {
            orderForm[inputIdentifier].elements.value = orderForm[inputIdentifier].elements.computeValue(orderForm)
          }
        }
      }
      orderRender = (
        <LayoutContent>
          <OrderForm 
            xs={12} 
            paperClasses={classes.paper} 
            InputForm={orderForm} 
            onChangeInput={this.onChangeInput} 
            isValidForm={this.state.isFormValid}
            onSubmitForm={() => this.onSubmitOrderForm(id)} 
            />
        </LayoutContent>
      )
      return orderRender
    }
    return orderRender
  }
}

const mapStateToProps = state => {
  return {
    order: state.order.order,
    products: state.product.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetOrder: (id) => dispatch(actions.getOrder(id)),
    onSearchProducts: (value) => dispatch(actions.searchProducts()),
    onEditOrder: (id, data) => dispatch(actions.editOrder(id, data))
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(withRouter(DetailOrder)));