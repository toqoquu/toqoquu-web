import Link from 'next/link'
import Placeload from '../components/Placeload'
import  * as api from '../lib/api'
import { take } from 'lodash'

export default function Hits({ isClient }) {
  const { data, loading } = api.products.hits()
  const _data = take(data, 9)
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-1">
        {loading ?
          (
            [...Array(10).keys()].map(n => (
              <div key={n} className="text-center">
                <Placeload height={100} />
              </div>
            ))
          ) : (
          _data?.map((o, i) => (
            <div key={i}>
              <Link href={`/products/view/${o.id}`}>
                <a>
                  <div className="rounded-lg bg-blue-100 bg-opacity-50 hover:bg-opacity-100 px-3">
                    <div className="flex items-center flex-wrap -mx-2">
                      <div className="w-1/2 px-2">
                        <h3 className="text-sm">{o.name}</h3>
                      </div>
                      <div className="w-1/2 flex justify-end text-right">
                        {o.foto[0] ? (
                          <div>
                            <img
                              src={o.foto[0]?.url}
                              className="max-w-full rounded-lg h-20 object-cover w-20"
                            />
                          </div>
                        ): (
                          <img
                            src="https://via.placeholder.com/100x120.png/1D5C73/fff"
                            className="rounded-full h-10 object-cover"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  )
}
