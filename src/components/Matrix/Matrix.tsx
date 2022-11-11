import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import MatrixForm from '../MatrixForm/MatrixForm'
import MatrixRow from '../MatrixRow/MatrixRow'
import RowOfAverages from '../RowOfAverages/RowOfAverages'

import {
  addMatrixToStore,
  addRowToMatrix,
  deleteRowFromMatrix,
} from '../store/actions/matrixActions'

import {
  addClosestItem,
  addClosestItemArray,
} from '../store/actions/closestItemsReducer'

import './Matrix.css'

import {TState} from '../store'
import {TMatrix, TMatrixItem} from '../../types/types'

export type TParams = {
  m: string
  n: string
  x: string
}

const Matrix = () => {
  const currentMatrixState = useSelector((state: TState) => state.matrix)
  const closestItemsState = useSelector((state: TState) => state.closestItems)
  const dispatch = useDispatch()

  const [incomingParameters, setIncomingParameters] = useState<
    TParams | undefined
  >()
  const [startMatrix, setStartMatrix] = useState<TMatrix>([])

  //сlosestItems
  useEffect(() => {
    if (closestItemsState.сlosestItems.item) {
      let itemForClosest = closestItemsState.сlosestItems.item
      let fullArrayReversed: TMatrixItem[] = []
      let arrayOfClosestItems: TMatrixItem[] = []
      for (let i = 0; i < currentMatrixState.matrix.length; i++) {
        fullArrayReversed = [
          ...fullArrayReversed,
          ...currentMatrixState.matrix[i],
        ]
      }

      fullArrayReversed.splice(
        fullArrayReversed.indexOf(
          fullArrayReversed.find(
            (el) => el.amount === itemForClosest
          ) as TMatrixItem
        ),
        1
      )

      if (incomingParameters) {
        for (let i = 0; i < +incomingParameters.x; i++) {
          const item = fullArrayReversed.sort(
            (a, b) =>
              Math.abs(itemForClosest - a.amount) -
              Math.abs(itemForClosest - b.amount)
          )[0]

          arrayOfClosestItems.push(item)
          const myIndex = fullArrayReversed.indexOf(item)
          if (myIndex !== -1) {
            fullArrayReversed.splice(myIndex, 1)
          }
        }
      }
      dispatch(addClosestItem(null))
      dispatch(addClosestItemArray(arrayOfClosestItems))
    }
  }, [
    closestItemsState.сlosestItems.item,
    currentMatrixState.matrix,
    dispatch,
    incomingParameters,
  ])

  //startMatrix
  const generateStartMatrix = (m: number, n: number) => {
    const finalMatrix = []
    for (let i = 0; i < m; i++) {
      const row = []
      for (let j = 0; j < n; j++) {
        row.push({
          id: (Math.random() + 1).toString(36).substring(2),
          amount: Math.floor(Math.random() * (1000 - 100) + 100),
        })
      }
      finalMatrix.push(row)
      setStartMatrix([...finalMatrix])
    }
  }

  useEffect(() => {
    if (!startMatrix.length && incomingParameters) {
      generateStartMatrix(+incomingParameters.m, +incomingParameters.n)
    }
    dispatch(addMatrixToStore(startMatrix))
  }, [startMatrix, dispatch, incomingParameters])

  const renderMatrixRows = () => {
    return currentMatrixState.matrix.map((el) => {
      return (
        <MatrixRow
          arr={el}
          key={Math.floor(Math.random() * (2000000 - 10000000)) + 10000000}
        />
      )
    })
  }

  return (
    <div>
      {!incomingParameters ? (
        <MatrixForm setIncomingParameters={setIncomingParameters} />
      ) : (
        <>
          <div className='matrix__buttons_area'>
            <button
              className='matrix__buttons_area__button'
              onClick={() => dispatch(addRowToMatrix())}
            >
              Add new row to the end
            </button>

            <button
              className='matrix__buttons_area__button'
              onClick={() => dispatch(deleteRowFromMatrix())}
            >
              Delete last row
            </button>
          </div>
          {renderMatrixRows()}
          <RowOfAverages arr={currentMatrixState.matrix} />
        </>
      )}
    </div>
  )
}

export default Matrix
