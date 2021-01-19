import Placeload from '../../components/Placeload'
import Card from '../../components/feeds/Card'
import  * as api from '../../lib/api'
import { take } from 'lodash'
import useFetch from 'use-http'

export default function feedList() {
  const { loading, error, data = [] } = api.feeds.find()
  function classes(i) {
    if (i === 0 || i === 13) {
      return 'row-span-2 h-full col-span-2'
    }
  }
  return (
    <>
    {loading ? (
      <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
        {[...Array(6).keys()].map(n => (
          <div key={n} className="text-center">
            <Placeload height={100} />
            <Placeload height={10} width={50} />
          </div>
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {data?.map(({ url, id }, i) => (
          <div key={i} className={ classes(i) }>
            <Card
              href={`/feeds/${id}`}
              id={id}
              image={url || 'https://via.placeholder.com/200x210.png/f0f0f0/000'}
            />
          </div>
        ))}
      </div>
    )}
    </>
  )
}
