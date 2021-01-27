import { createSelector } from 'reselect'

export const addressSelector = state => state.cart.address;

export const checkoutSelector = createSelector(
  addressSelector,
  (address) => ({
    address: address
  })
)