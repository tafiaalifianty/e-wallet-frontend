import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import transactionsReducer from './slices/transactionSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

const store = setupStore()

export default store

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch
