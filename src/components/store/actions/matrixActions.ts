import {TMatrix} from '../../../types/types'

export const ADD_MATRIX_TO_STORE = 'ADD_MATRIX_TO_STORE'
export const ADD_ONE_TO_ITEM = 'ADD_ONE_TO_ITEM'
export const ADD_ROW_TO_MATRIX = 'ADD_ROW_TO_MATRIX'
export const DELETE_ROW_FROM_MATRIX = 'DELETE_ROW_FROM_MATRIX'

export const addMatrixToStore = (payload: TMatrix) => ({
  type: ADD_MATRIX_TO_STORE,
  payload,
})

export const addOneToItem = (payload: string) => ({
  type: ADD_ONE_TO_ITEM,
  payload,
})

export const addRowToMatrix = () => ({type: ADD_ROW_TO_MATRIX})

export const deleteRowFromMatrix = () => ({type: DELETE_ROW_FROM_MATRIX})
