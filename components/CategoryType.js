import Placeload from '../components/Placeload'
import  * as api from '../lib/api'
import { take } from 'lodash'

export default function CategoryType(props) {
  const { click = () => null } = props
  const { data, loading } = api.categories.types()
  const clickMenu = (e, id) => {
    e.preventDefault()
    return click(`list-by-Type-Category/${id}`)
  }
  return (
    <>
      {loading ? (
        <>
          {[...Array(3).keys()].map(idx => (
            <Placeload key={idx} height="10px" />
          ))}
        </>
      ) : (
        <>
          {data?.map(({ id, name }) => (
            <a key={id} href="#" onClick={(e) => clickMenu(e, id)}>
              {name}
            </a>
          ))}
        </>
      )}
    </>
  )
}
