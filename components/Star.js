import MaterialIcon from '@material/react-material-icon'
import className from 'classnames'
import { useEffect, useState } from 'react'

export default function Star(props) {
  const { value, update = () => false } = props

  const getColor = (i, val) => {
    return i + 1 <= val ? 'text-yellow-500' : 'text-gray-500'
  }
  return (
    <div>
      {[...Array(5).keys()].map(idx => (
        <MaterialIcon
          key={idx}
          icon='star_rate'
          className={className({
            'cursor-pointer': true,
            [getColor(idx, value)]: true,
          })}
          onClick={(e) => update(idx + 1)}
        />
      ))}
    </div>
  )
}
