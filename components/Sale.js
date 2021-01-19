import Placeload from '@/components/Placeload'
import CardV2 from '@/components/products/CardV2'
import  * as api from '@/lib/api'

export default function Hits({ isClient }) {
  const { data = [], loading, error } = api.products.sales()

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-5 mb-8">
        {loading ?
          (
            [...Array(12).keys()].map(n => (
              <div key={n} className="text-center">
                <Placeload height={100} />
              </div>
            ))
          ) : (
          <div>
            {data?.map((o, i) => (
              <CardV2 key={i} title={o.name} image={o.foto[0]?.url} discount={o.diskon} id={o.id} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
