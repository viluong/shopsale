import * as actionTypes from './actionTypes';
import axios from '../../configs/axios';
import { EmojiObjects } from '@material-ui/icons';

export const loadCartSuccess = (carts) => {
  return {
    type: actionTypes.LOAD_CARTS_SUCCESS,
    carts: carts
  }
}

export const loadCartFailed = (error) => {
  return {
    type: actionTypes.LOAD_CARTS_FAILED,
    error: error
  }
}

export const deleteItemCart = (productId) => {
  return {
    type: actionTypes.REMOVE_PRODUCT_CART,
    productId: productId
  }
}

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


export const initCarts = () => {
  return (dispatch) => {
    const carts = JSON.parse(localStorage.getItem('carts'))
    if (carts) {
      const productIds = carts.map(cart => {
        return cart.productId
      })
      axios.post('/carts/', {
        product_ids: productIds
      }).then(res => {
        const data_cart = carts.map((cart, index) => {
          return {
            product: res.data[index],
            quantity: cart.quantity
          }
        })
        dispatch(loadCartSuccess(data_cart))
      }).catch(error => {
        dispatch(loadCartFailed(error))
      })
    }
  }
}

export const removeProductCart = (productId) => {
  return (dispatch) => {
    const carts = JSON.parse(localStorage.getItem('carts'))
    const newCarts = carts.filter((item) => item.productId !== productId)
    localStorage.setItem('carts', JSON.stringify(newCarts))
    dispatch(deleteItemCart(productId))
  }
}

export const storeAddress = (addressForm) => {
  return (dispatch) => {
    const data = {
      firstName: addressForm.firstName.value,
      lastName: addressForm.lastName.value,
      address1: addressForm.address1.value,
      address2: addressForm.address2.value,
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
