import { createSelector } from 'reselect'

export const addressSelector = state => state.cart.address;
export const cartSelector = state => state.cart.carts;

export const reviewOrderSelector = createSelector(
  addressSelector,
  cartSelector,
  (address, carts) => ({
    address: address,
    carts: carts
  })
)