import Link from 'next/link'
import useFetch from 'use-http'
import { take } from 'lodash'
import className from 'classnames'

export default function Recomended() {
  const { data = [], loading } = useFetch('/Product/list', [])
  const _data = take(data, 3)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
      {_data.map(o => (
        <Link key={o.id} href={`/products/view/${o.id}`}>
          <a>
            <div
              className="bg-yellow-100 hover:bg-opacity-100 hover:shadow bg-opacity-50 rounded-3xl p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                {o.foto?.map((f, idx) => (
                  <div
                    key={`${idx}-photo`}
                    className={className({ 'col-span-2 row-span-2': idx == 0 })}
                  >
                    <img
                      src={f.url}
                      className={className({ 'rounded-2xl object-cover': true, 'h-48 w-full': idx ==  0 })}
                    />
                  </div>
                ))}
              </div>
              <h3 className="text-sm text-center">
                {o.name}
              </h3>
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}
