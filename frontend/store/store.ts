import { Action, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import rootReducer, { RootState } from './rootReducer'

const store = configureStore({ reducer: rootReducer }, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())

export type ReduxDispatch = ThunkDispatch<RootState, any, Action>
export function useReduxDispatch(): ReduxDispatch {
  return useDispatch<ReduxDispatch>()
}

export default store
