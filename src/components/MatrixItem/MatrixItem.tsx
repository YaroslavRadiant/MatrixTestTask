import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {TState} from '../store'

import {
  addClosestItem,
  addClosestItemArray,
} from '../store/actions/closestItemsReducer'
import {addOneToItem} from '../store/actions/matrixActions'

import './MatrixItem.css'

type TProps = {
  id: string
  amount: number | null
  isSumHovered?: boolean
}
const MatrixItem: React.FC<TProps> = ({id, amount, isSumHovered}) => {
  const dispatch = useDispatch()
  const currentClosestItemsState = useSelector(
    (state: TState) => state.closestItems.сlosestItems.arrayOfClosestItems
  )

  const [isItemHovered, setIsItemHovered] = useState(false)

  useEffect(() => {
    if (isItemHovered && !currentClosestItemsState.length) {
      dispatch(addClosestItem(amount))
    }
  }, [amount, currentClosestItemsState.length, dispatch, isItemHovered])

  const isItemClosest = currentClosestItemsState.find(
    (el) => el.amount === amount
  )

  const itemStyle = () => {
    let style = {}
    if (!isSumHovered) {
      style = {backgroundSize: '0px 100%'}
    } else {
      style = {backgroundSize: `${amount}% 100%`}
    }
    if (isItemClosest && !isItemHovered) {
      style = {...style, backgroundColor: 'purple'}
    } else {
      style = {...style}
    }
    return style
  }
  
  return (
    <div
      className={
        !isSumHovered ? 'matrix_item' : 'matrix_item__hovered_sum matrix_item'
      }
      style={itemStyle()}
      onClick={() => {
        dispatch(addClosestItem(amount))
        dispatch(addOneToItem(id))
      }}
      onMouseEnter={() => setIsItemHovered(true)}
      onMouseLeave={() => {
        dispatch(addClosestItemArray([]))
        dispatch(addClosestItem(null))
      }}
    >
      {!isSumHovered ? amount : amount + '%'}
    </div>
  )
}

export default MatrixItem
