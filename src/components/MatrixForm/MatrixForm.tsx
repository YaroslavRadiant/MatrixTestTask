import {useState} from 'react'
import {validClosestItemsValue, validColRowValue} from '../../utils/Regex'

type TForm = {
  rows: string
  columns: string
  closest: string
}

type TProps = {
  setIncomingParameters: (value: {m: string; n: string; x: string}) => void
}

const MatrixForm: React.FC<TProps> = ({setIncomingParameters}) => {
  const [form, setForm] = useState<TForm>({
    rows: '',
    columns: '',
    closest: '',
  })
  const [rowsInputErr, setRowsInputErr] = useState(false)
  const [colsInputErr, setColsInputErr] = useState(false)
  const [closestItemsInputErr, setClosestItemsInputErr] = useState(false)
  const {rows, columns, closest} = form

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const settingIncomingParameters = () => {
    if (!validColRowValue.test(rows)) {
      setRowsInputErr(true)
      return
    }
    setRowsInputErr(false)
    if (!validColRowValue.test(columns)) {
      setColsInputErr(true)
      return
    }
    setColsInputErr(false)

    if (
      !validClosestItemsValue.test(closest) ||
      (+rows * +columns) / 2 < +closest ||
      +closest < 0 ||
      !closest
    ) {
      setClosestItemsInputErr(true)
      return
    }

    setIncomingParameters({
      m: rows,
      n: columns,
      x: closest,
    })
  }

  return (
    <div className='matrix__input_area'>
      <label className='input_area__label'>
        Number of rows in matrix (1-100) M{' '}
      </label>
      <input
        className='input_area__input'
        type='text'
        name='rows'
        value={form.rows}
        onChange={handleChange}
      />
      {rowsInputErr && (
        <label className='input_area__error_label'>Invalid value </label>
      )}
      
      <label className='input_area__label'>
        Number of columns in matrix(1-100) N
      </label>
      <input
        className='input_area__input'
        type='text'
        name='columns'
        value={form.columns}
        onChange={handleChange}
      />
      {colsInputErr && (
        <label className='input_area__error_label'>Invalid value </label>
      )}

      <label className='input_area__label'>
        Number of closest Items( Xmax = M*N/2 ) X
      </label>
      <input
        className='input_area__input'
        type='text'
        name='closest'
        value={form.closest}
        onChange={handleChange}
      />
      {closestItemsInputErr && (
        <label className='input_area__error_label'>Invalid value </label>
      )}
      <button
        className='matrix__input_area__button'
        onClick={settingIncomingParameters}
      >
        Create matrix
      </button>
    </div>
  )
}

export default MatrixForm
