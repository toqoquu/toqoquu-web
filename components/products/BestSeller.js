import Link from 'next/link'
import CardV1 from './CardV1'
import ContentHeader from '../ContentHeader'
import Placeload from '../Placeload'

import useFetch from 'use-http'
import { take } from 'lodash'

export default function bestSeller({ isClient }) {
  const { data = [], loading } = useFetch('/Product/list-terlaris', [])
  const _data = take(data, 9)
  return (
    <div>
      <ContentHeader title="Produk Terlaris" />
      {loading ? (
        <div className="grid grid-cols-6 gap-5">
          {[...Array(6).keys()].map(n => (
            <div key={n} className="text-center">
              <Placeload height={100} />
              <Placeload height={10} width={50} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="bg-red-100 bg-opacity-50 p-3 rounded-3xl overflow-hidden"
        >
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 md:gap-5"
          >
            {_data?.map((o, i) => (
              <div
                key={i}
                className={ `${i == 0 ? 'row-span-1 md:row-span-2 col-span-2 md:mb-0 mb-5' : ''}`}
              >
                {i == 0 ? (
                  <Link href={`/products/view/${o.id}`}>
                    <a
                      className="flex items-center justify-center bg-red-200 w-full h-full rounded-2xl overflow-hidden"
                    >
                      <img
                        src={o.foto[0]?.url || 'https://via.placeholder.com/200x200.png/1D5C73/fff'}
                        className="max-w-full object-cover md:h-full"
                      />
                    </a>
                  </Link>
                ) : (
                  <CardV1
                    id={o.id}
                    title={o.name}
                    discount={`${o.diskon} OFF`}
                    image={o.foto[0]?.url}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
