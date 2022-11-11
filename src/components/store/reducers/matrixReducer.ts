import {TAction, TMatrix, TMatrixItem} from '../../../types/types'
import {
  ADD_ROW_TO_MATRIX,
  ADD_ONE_TO_ITEM,
  ADD_MATRIX_TO_STORE,
  DELETE_ROW_FROM_MATRIX,
} from './../actions/matrixActions'


export type TMatrixReducer = {
  matrix: TMatrix
  сlosestItems: {
    item: TMatrixItem | null
    arrayOfClosestItems: TMatrixItem[]
  }
}

const initialState: TMatrixReducer = {
  matrix: [],
  сlosestItems: {
    item: null,
    arrayOfClosestItems: [],
  },
}

const matrixReducer = (state = initialState, action: TAction) => {
  switch (action.type) {
    case ADD_MATRIX_TO_STORE: {
      return {
        matrix: [...action.payload],
      }
    }
    case ADD_ONE_TO_ITEM: {
      let changedItem: TMatrixItem | undefined
      let itemIndex = 0
      let i = 0
      for (i; i < state.matrix.length; i++) {
        // eslint-disable-next-line no-loop-func
        changedItem = state.matrix[i].find((el) => {
          itemIndex = state.matrix[i].indexOf(el)
          return el.id === action.payload
        })

        if (changedItem) {
          break
        }
      }
      if (typeof state.matrix[i][itemIndex].amount === 'number') {
        state.matrix[i][itemIndex].amount =
          state.matrix[i][itemIndex].amount + 1
      }

      return {
        matrix: [...state.matrix],
      }
    }
    case ADD_ROW_TO_MATRIX: {
      const newRow = []
      for (let i = 0; i < state.matrix[0].length; i++) {
        newRow.push({
          id: (Math.random() + 1).toString(36).substring(2),
          amount: Math.floor(Math.random() * (1000 - 100) + 100),
        })
      }
      return {
        matrix: [...state.matrix, newRow],
      }
    }
    case DELETE_ROW_FROM_MATRIX: {
      if (state.matrix.length === 1) {
        return state
      } else {
        state.matrix.pop()
      }
      return {
        matrix: [...state.matrix],
      }
    }
    default:
      return state
  }
}

export default matrixReducer
