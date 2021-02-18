import { createSelector } from 'reselect'

export const cartSelector = state => state.cart;
export const orderSelector = state => state.order;
export const checkoutSelector = createSelector(
  cartSelector,
  orderSelector,
  (cart, order) => ({
    address: order.address,
    carts: cart.carts,
    loading: order.loading,
    error: order.error,
    orderName: order.orderName
  })
)