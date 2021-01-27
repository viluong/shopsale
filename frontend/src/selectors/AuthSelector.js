import { createSelector } from 'reselect'

export const openSelector = state => state.auth.openSignIn
export const loadingSelector = state => state.auth.loading

export const authSelector = createSelector(
  openSelector,
  loadingSelector,
  (open, loading) => ({
    open: open,
    loading: loading
  })
)