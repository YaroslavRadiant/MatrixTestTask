import {TMatrixItem} from '../../../types/types'

export const ADD_CLOSEST_ITEM = 'ADD_CLOSEST_ITEM'
export const ADD_CLOSEST_ITEM_ARRAY = 'ADD_CLOSEST_ITEM_ARRAY'

export const addClosestItem = (payload: number | null) => ({
  type: ADD_CLOSEST_ITEM,
  payload,
})

export const addClosestItemArray = (payload: TMatrixItem[]) => ({
  type: ADD_CLOSEST_ITEM_ARRAY,
  payload,
})
