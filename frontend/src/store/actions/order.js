import * as actionTypes from './actionTypes';
import axios from '../../configs/axios';
import { clearProductsCart } from './cart';

export const loadAddress = (address) => {
  return {
    type: actionTypes.LOAD_ADDRESS,
    address: address
  }
}

export const setAllowNextStep = (isNext) => {
  return {
    type: actionTypes.SET_ALLOW_NEXT_STEP,
    isNext: isNext
  }
}

export const saveOrderRequest = () => {
  return {
    type: actionTypes.SAVE_ORDER_REQUEST
  }
}

export const saveOrderSuccess = (order) => {
  return {
    type: actionTypes.SAVE_ORDER_SUCCESS,
    orderName: order.name
  }
}

export const saveOrderFailed = () => {
  return {
    type: actionTypes.SAVE_ORDER_FAILED,
  }
}

export const addProductToCart = (productId, quantity) => {
  return (dispatch) => {
    let carts = JSON.parse(localStorage.getItem('carts')) || []
    
    const index = carts.findIndex(cart => cart.productId === productId)
    if (index >= 0) {
      carts[index].quantity = quantity
    } else {
      carts.push({
        productId: productId,
        quantity: quantity
      })
    }
    localStorage.setItem('carts', JSON.stringify(carts))
    dispatch(initCarts())
  }
}


export const storeAddress = (addressForm) => {
  return (dispatch) => {
    const data = {
      firstName: addressForm.firstName.value,
      lastName: addressForm.lastName.value,
      address1: addressForm.address1.value,
      district: addressForm.district.value,
      city: addressForm.city.value,
      state: addressForm.state.value,
      zip: addressForm.zip.value,
      country: addressForm.country.value
    }
    localStorage.setItem('address', JSON.stringify(data))
    dispatch(loadAddress(data))
  }
}

export const getAddress = () => {
  return (dispatch) => {
    const address = JSON.parse(localStorage.getItem('address'));
    dispatch(loadAddress(address))
  }
}

export const saveOrder = (order) => {
  return (dispatch) => {
    console.log("order 1w121", order)
    dispatch(saveOrderRequest())
    axios.post('/orders/', order).then((res) => { 
      dispatch(saveOrderSuccess(res.data))
      dispatch(clearProductsCart())
    }).catch(error => dispatch(saveOrderFailed()))
  }
}