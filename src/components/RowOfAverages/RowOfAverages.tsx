import {TMatrix, TMatrixItem} from '../../types/types'
import './RowOfAverages.css'

type TProps = {
  arr: TMatrix
}

const RowOfAverages: React.FC<TProps> = ({arr}) => {
  const averageArray: TMatrix = []
  const finalArrayOfAverages: number[] = []

  if (arr.length) {
    for (let i = 0; i < arr[0].length; i++) {
      const callArray: TMatrixItem[] = []
      for (let j = 0; j < arr.length; j++) {
        callArray.push(arr[j][i])
      }
      averageArray.push(callArray)
    }
    for (let i = 0; i < averageArray.length; i++) {
      finalArrayOfAverages.push(
        Math.round(
          averageArray[i].reduce((acc, num) => {
            return acc + num.amount
          }, 0) / arr.length
        )
      )
    }
  }

  const renderAverages = () => {
    return finalArrayOfAverages.map((el) => {
      return (
        <div
          className='row_of_average__item'
          key={Math.floor(Math.random() * (2000000 - 10000000)) + 10000000}
        >
          {el}
        </div>
      )
    })
  }
  return <div className='row_of_average'>{renderAverages()}</div>
}

export default RowOfAverages
