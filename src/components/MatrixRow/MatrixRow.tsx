import {useState} from 'react'
import MatrixItem from '../MatrixItem/MatrixItem'
import {addClosestItemArray} from '../store/actions/closestItemsReducer'

import {TMatrixItem} from '../../types/types'

import './MatrixRow.css'

type TProps = {
  arr: TMatrixItem[]
}

const MatrixRow: React.FC<TProps> = ({arr}) => {
  const [hoverSum, setHoverSum] = useState(false)
  const matrixRowSum = arr.reduce((acc, item) => acc + item.amount, 0)

  const renderMatrixItem = () => {
    return arr.map((el) => {
      return (
        <MatrixItem
          id={el.id}
          amount={Math.floor((el.amount / matrixRowSum) * 100)}
          key={el.id}
          isSumHovered={hoverSum}
        />
      )
    })
  }

  return (
    <div className='matrix_row'>
      {hoverSum
        ? renderMatrixItem()
        : arr.map((el) => {
            return <MatrixItem id={el.id} amount={el.amount} key={el.id} />
          })}

      <div
        className='matrix_row__sum'
        onMouseEnter={() => setHoverSum(true)}
        onMouseLeave={() => {
          addClosestItemArray([])
          setHoverSum(false)
        }}
      >
        <p>{matrixRowSum}</p>
      </div>
    </div>
  )
}

export default MatrixRow
