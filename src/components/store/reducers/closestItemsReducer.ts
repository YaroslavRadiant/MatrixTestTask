import {TAction, TMatrixItem} from './../../../types/types'
import {
  ADD_CLOSEST_ITEM,
  ADD_CLOSEST_ITEM_ARRAY,
} from './../actions/closestItemsReducer'

export type TClosestItemsReducer = {
  сlosestItems: {
    item: number | null
    arrayOfClosestItems: TMatrixItem[]
  }
}

const initialState: TClosestItemsReducer = {
  сlosestItems: {
    item: null,
    arrayOfClosestItems: [],
  },
}

const closestItemsReducer = (state = initialState, action: TAction) => {
  switch (action.type) {
    case ADD_CLOSEST_ITEM: {
      return {
        ...state,
        сlosestItems: {...state.сlosestItems, item: action.payload},
      }
    }
    case ADD_CLOSEST_ITEM_ARRAY: {
      return {
        ...state,
        сlosestItems: {
          ...state.сlosestItems,
          arrayOfClosestItems: [...action.payload],
        },
      }
    }
    default:
      return state
  }
}

export default closestItemsReducer
