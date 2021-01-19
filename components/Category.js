import Placeload from '../components/Placeload'
import Link from 'next/link'
import useFetch from 'use-http'
import { useEffect } from 'react'

export default function Category({ path }) {
  const { get, data = [], loading, error } = useFetch('/Category')
  useEffect(() => {
    get(`/${path}`)
  }, [path])

  return (
    <>
      {loading && !data.length ? (
        [...Array(10).keys()].map(n => (
          <div key={n} className="text-center">
            <Placeload height={100} />
            <Placeload height={10} width={50} />
          </div>
        ))
      ) : (
        <>
          {!error &&
            data?.map(({ name, id, typeCategory, url}, idx) => (
              <div key={idx} className="text-center">
                <Link href={`/products/list-category/${id}?type=terbaru`}>
                  <a>
                    <img
                      src={url}
                      className="max-w-full rounded-2xl mx-auto block mb-2"
                    />
                    <span className="text-xs">{name}</span>
                  </a>
                </Link>
              </div>
            ))
          }
        </>
      )}
    </>
  )
}
