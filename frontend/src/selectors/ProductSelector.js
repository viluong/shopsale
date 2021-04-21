import { createSelector } from 'reselect'

export const productSelector = state => state.product;

export const homeSelector = createSelector(
  productSelector,
  (product) => ({
    products: product.products,
    totalCount: product.totalCount
  })
);
