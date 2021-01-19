import Link from 'next/link'
import Head from 'next/head'
import Related from '@/components/accounts/Related'
import Layout from '@/components/Layout'
import Star from '@/components/Star'
import MaterialIcon from '@material/react-material-icon'

import rp from '@/utils/rp'
import { toast } from 'react-toastify'
import className from 'classnames'
import useFetch from 'use-http'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Products({ id }) {
  const [data, setData] = useState([])

  const [selectedImage, setSelectedImage] = useState(0)

  const { get, loading, response, post } = useFetch(
    '',
    { cachePolicy: 'no-cache' },
  )

  const getInitialData = async () => {
    const initialData = await get(`/Product/detail/${id}`)
    setData(initialData)
  }

  const _clickLike = (e, like) => {
    e.preventDefault()
  }

  const like = async (e, isLike) => {
    e.preventDefault()
    if (isLike) {
      await get(`/Product/Unlike-product/${data.id}`)
    } else {
      await get(`/Product/like-product/${data.id}`)
    }

    getInitialData()
  }

  const addCart = async (e, products_id) => {
    e.preventDefault()
    const res = await post('/Card/create', { products_id })

    if (res.code < 400) {
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const setImage = (e, i) => {
    e.preventDefault()
    setSelectedImage(i)
  }

  useEffect(() => getInitialData(), [id])

  return (
    <Layout>
      <Head>
        <title>{data?.name || 'Product'} | Toqoquu</title>
      </Head>
      <div className="mx-auto max-w-screen-lg px-6">
        <div className="bg-yellow-100 py-6 rounded-2xl bg-opacity-50 mb-12">
          <div className="mx-auto px-6">
            <div className="flex flex-wrap md:flex-nowrap md:space-x-6">
              <div className="w-full mb-6 md:mb-0 md:w-1/2">
                <div className="flex space-x-2">
                  <div className="w-1/5">
                    <div>
                      {data?.foto?.map((f, i) => (
                        <div key={f.id} className="mb-2 cursor-pointer" onClick={(e) => setImage(e, i)}>
                          <img
                            src={f.url} alt={f.deskripsi}
                            className="h-20 w-20 object-cover rounded"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                    </div>
                  </div>
                  <div className="w-4/5">
                    {data?.foto?.length && <img src={data?.foto[selectedImage]?.url} className="max-w-full h-64 object-cover rounded-lg" />}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex space-x-4 mb-2 text-sm">
                  <span className="px-3 py-1 rounded-lg bg-blue-300">{data?.type_categories_id}</span>
                  <span className="px-3 py-1 rounded-lg bg-red-300">{data?.categories_id}</span>
                </div>
                <div>
                  <h1 className="text-xl md:text-3xl">{data?.name}</h1>
                  <div className="flex items-center mb-4">
                    <Star value={data?.rating} />
                    <div className="ml-auto text-xl md:text-3xl flex space-x-2">
                      <span className="text-sm">Harga</span>
                      <span>{data.harga ? rp(data.harga) : null}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div>{data?.users?.nama_toko}</div>
                    <div className="ml-auto">
                      {data.total_pembelian} terjual
                    </div>
                  </div>
                  <div className="flex items-center mb-12">
                    <div>{data?.users?.alamat_toko} {data.like ? 'xxx': 'bbb'}xx</div>
                    <div className="ml-auto">
                      <span
                        className="flex w-8 h-8 rounded-full flex items-center justify-center bg-red-200 cursor-pointer"
                        onClick={(e) => like(e, data.like)}
                      >
                        <MaterialIcon icon="favorite" className={{ "text-lg": true, 'text-red-500': data?.like }} />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center bg-blue-300 px-2 py-1 rounded-lg space-x-2">
                    <div className="bg-white rounded-lg px-2 py-1 text-sm">Promo toko</div>
                    <div className="text-sm">
                      Gratis ongkir dengan minimal pembeli Rp.100.000
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 bg-white mt-6 rounded-2xl">
              <div className="flex flex-wrap md:flex-nowrap md:space-x-3">
                <div className="w-full mb-4 md:mb-0 md:w-1/2">
                  <h4 className="mb-3 text-xl">Detail Deskripsi</h4>
                  <div>
                    <p>{data.deskripsi}</p>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  {data.spesifikasi?.map(d => (
                    <div key={d.id} className="mb-1 md:text-right">
                      <h4 className="mb-1 text-xl">{d.type_spesifikasi}</h4>
                      <span>{d.deskripsi}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mx-auto text-center">
                <button
                  className={ className({ 'btn bg-red-400 text-white': true, 'bg-opacity-25 cursor-not-allowed': loading }) }
                  disabled={loading}
                  onClick={(e) => addCart(e, data.id)}
                >
                  Tambah ke keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
        <Related />
      </div>
    </Layout>
  )
}


export async function getServerSideProps(context) {
  const id = context.params.id
  return {
    props: { id }
  }
}
