import { createSelector } from 'reselect'

export const cartSelector = state => state.cart.carts;
export const userSelector = state => state.auth.user;

export const headerSelector = createSelector(
  cartSelector,
  userSelector,
  (carts, user) => ({
    carts: carts,
    user: user
  })
);