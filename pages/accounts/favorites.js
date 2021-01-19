import Link from 'next/link'
import Layout from '@/components/Layout'
import ProfileLayout from '@/components/accounts/Layout'
import Menu from '@/components/accounts/Menu'
import Card from '@/components/products/Card'
import { Overlay } from '@/components/ui'

import className from 'classnames'
import { useState } from 'react'
import { useMount } from 'react-use'
import useFetch from 'use-http'

export default function favorites() {
  const [state, setState] = useState([])
  const { get, error, loading, response } = useFetch('/Product', { cachePolicy: 'no-cache' })

  const getState = async () => {
    const res = await get('/list-favorit')
    if (res.length) setState(res)
  }

  const like = async (id, e) => {
    if (e) {
      await get(`/Unlike-product/${id}`)
    } else {
      await get(`/like-product/${id}`)
    }

    getState()
  }

  useMount(() => getState())

  return (
    <Layout>
      <ProfileLayout>
        <div className="pr-16">
          <div>
            <h3 className="mb-3 text-xl mt-3">Wishlist</h3>
            <div className="mb-4 relative">
              <Overlay show={loading} />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                {state?.map((o, i) => (
                  <Card
                    key={i}
                    title={o.product?.name}
                    priceBefore={o.product?.harga_sebelum}
                    price={o.product?.harga}
                    store={o.users?.nama_toko}
                    storeLocation={o.product?.users?.alamat_toko}
                    image={o.product?.foto[0]?.url}
                    like={o.product?.like}
                    discount={o.product?.diskon}
                    clickLike={(e) => like(o.product.id, e)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </ProfileLayout>
    </Layout>
  )
}
