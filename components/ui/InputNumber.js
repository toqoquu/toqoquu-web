import MaterialIcon from '@material/react-material-icon'
import className from 'classnames'
import { useState } from 'react'

export default function InputNumber(props) {
  const { value = 0, update = () => false, min = 1, max = 10, increment = (e) => e, decrement = (e) => e } = props

  const disabledClass = className({
    'bg-opacity-50': value <= min && value >= max,
  })

  const classes = className({
    'outline-none focus:outline-none border-0 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center': true,
  })

  const _decrement = (val) => {
    if (val > min) {
      update(value - 1)
    } else {
      update(min)
    }
    decrement()
  }

  const _increment = (val) => {
    if (val < max) {
      update(value + 1)
    } else {
      update(max)
    }
    increment()
  }

  return (
    <div className="flex space-x-1 text-white">
      <button
        className={`${classes} ${value <= min ? 'bg-opacity-50 cursor-not-allowed' : ''}`}
        disabled={value <= min}
        onClick={() => _decrement(value - 1)}
      >
        <MaterialIcon icon="remove" />
      </button>
      <div className="text-black font-semibold w-6 text-center">{value}</div>
      <button
        className={`${classes} ${value >= max ? 'bg-opacity-50 cursor-not-allowed' : ''}`}
        disabled={value >= max}
        onClick={() => _increment(value + 1)}
      >
        <MaterialIcon icon="add" />
      </button>
    </div>
  )
}
