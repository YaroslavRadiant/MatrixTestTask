import {combineReducers, createStore} from 'redux'
import closestItemsReducer, {
  TClosestItemsReducer,
} from './reducers/closestItemsReducer'
import matrixReducer, {TMatrixReducer} from './reducers/matrixReducer'

export type TState = {
  matrix: TMatrixReducer
  closestItems: TClosestItemsReducer
}

const rootReducer = combineReducers({
  matrix: matrixReducer,
  closestItems: closestItemsReducer,
})

export const store = createStore(rootReducer)
