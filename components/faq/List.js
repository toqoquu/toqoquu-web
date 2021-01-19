import Placeload from '../../components/Placeload'
import useFetch from 'use-http'
import { useEffect, useState } from 'react'

export default function Category({ id }) {
  const { get, data = [], loading } = useFetch(`/Info/list-Info-Category`)
  const [state, setState] = useState(null)

  useEffect(async () => {
    if (id) {
      await get(`/${id}`)
      console.log(data)
    }
  }, [id])

  const toggle = (e, id) => {
    e.preventDefault()
    setState(id)
  }

  return (
    <>
      {loading ? (
        [...Array(2).keys()].map(n => (
          <div key={n} className="text-center max-w-md w-full mx-auto">
            <Placeload height={10} />
          </div>
        ))
      ) : (
        data?.map(({ name, keterangan, id }, idx) => (
          <div key={idx} className="text-center mb-12">
            <a href="#" className="text-gray-800 block hover:text-opacity-75" onClick={(e) => toggle(e, id)}>
              {name}
            </a>
            { state == id && <span className="text-gray-400 text-sm">{keterangan}</span> }
          </div>
        ))
      )}
    </>
  )
}
