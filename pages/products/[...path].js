import Link from 'next/link'
import Head from 'next/head'
import ProfileCard from '@/components/accounts/ProfileCard'
import Related from '@/components/accounts/Related'
import Layout from '@/components/Layout'
import Card from '@/components/products/Card'
import { Overlay, Checkbox } from '@/components/ui'
import MaterialIcon from '@material/react-material-icon'

import className from 'classnames'
import useFetch from 'use-http'
import { useState, useEffect } from 'react'
import { useMount } from 'react-use'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'

export default function Products(props) {
  const [state, setState] = useState([])
  const [categories, setCategory] = useState([])
  const [type, setType] = useState('')

  const { get, post, error, loading, response } = useFetch('', { cachePolicy: 'no-cache' })
  const router = useRouter()

  const getState = async () => {
    const path = router.asPath.replace('/products', '')
    const res = await get('/Product' + path)
    if (res.length) setState(res)
  }

  const getCategories = async () => {
    const res = await get('/Category/list')
    if (res.length) setCategory(res)
  }

  const like = async (id, e) => {
    if (e) {
      await get(`/Product/Unlike-product/${id}`)
    } else {
      await get(`/Product/like-product/${id}`)
    }

    getState()
  }

  const filter = (type) => {
    setType(type)
    const path = router.query.path.toString().replace(',', '/')
    router.push(`${path}?type=${type}`)
  }

  useMount(() => getCategories())

  useEffect(() => {
    if (router.query.path) {
      getState()
      setType(router.query.type)
    }
  }, [router.query.path])

  const menus = [
    {
      label: 'Kotak Masuk',
      icon: '/contact/kotak-masuk-icon.png',
      children: [
        { label: 'Chat', url: '/accounts/chat' },
        { label: 'Ulasan Saya', url: '/accounts/profile' },
        { label: 'Pusat Bantuan', url: '/accounts/profile' },
        { label: 'Komplain Pesanan', url: '/accounts/profile' },
      ]
    },
    {
      label: 'Pembelian',
      icon: '/icons/pembelian2-icon.png',
      children: [
        { label: 'Pesanan Saya', url: '/accounts/profile' },
        { label: 'Daftar Transaksi', url: '/accounts/profile' },
        { label: 'Wishlist', url: '/accounts/profile' },
        { label: 'Toko Favorit', url: '/accounts/profile' },
      ]
    },
  ]

  const filters = [
    { label: 'Terbaru', type: 'terbaru' },
    { label: 'Paling sesuai', type: 'terkait' },
    { label: 'Terlaris', type: 'terlaris' },
    { label: 'Termurah', type: 'termurah' },
  ]
  return (
    <Layout>
      <Head>
        <title>Produk | Toqoquu</title>
      </Head>
      <div className="mx-auto max-w-screen-xl px-6">
        <div className="flex flex-wrap md:flex-nowrap md:space-x-12">
          <div className="w-1/5 hidden md:block">
            <h3 className="font-medium mb-2 text-xl">Filter</h3>
            <div>
              <div className="bg-yellow-100 bg-opacity-50 rounded-lg px-3 py-2 mb-4">
                <h4 className="text-lg bg-white rounded-lg px-2 py-1 text-center mb-3">
                  Berdasarkan Kategori
                </h4>
                <div className="px-4">
                  <ul>
                    {categories.map(({ name, id}) => (
                      <li key={id} className="flex items-center mb-2">
                        <Checkbox />
                        <span>{name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-blue-100 bg-opacity-50 rounded-lg px-3 py-2 mb-4">
                <h4 className="text-lg bg-white rounded-lg px-2 py-1 text-center mb-3">
                  Berdasarkan Lokasi
                </h4>
                <div className="px-4">
                  <ul>
                    {categories.map(({ name, id}) => (
                      <li key={id} className="flex items-center mb-2">
                        <Checkbox />
                        <span>{name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-red-100 bg-opacity-50 rounded-lg px-3 py-2 mb-4">
                <h4 className="text-lg bg-white rounded-lg px-2 py-1 text-center mb-3">
                  Opsi Pengiriman
                </h4>
                <div className="px-4">
                  <ul>
                    {categories.map(({ name, id}) => (
                      <li key={id} className="flex items-center mb-2">
                        <Checkbox />
                        <span>{name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-500 bg-opacity-50 rounded-lg px-3 py-2 mb-4">
                <h4 className="text-lg rounded-lg px-2 py-1 text-center mb-3">
                  Rentan Harga
                </h4>
                <div className="px-4">
                  <button className="text-lg bg-white w-full outline-none focus:outline-none rounded-lg px-2 py-1 text-center mb-3">
                    Harga Minimum
                  </button>
                  <button className="text-lg bg-white w-full outline-none focus:outline-none rounded-lg px-2 py-1 text-center mb-3">
                    Harga Maksimum
                  </button>
                  <div className="mt-8 pb-4">
                    <button className="w-full btn bg-red-500 text-center text-white mb-3">
                      terapkan
                    </button>
                    <button className="w-full btn bg-white text-center">
                      Atur Ulang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-4/5">
            <div className="flex items-center mb-4">
              <div className="flex items-center space-x-2">
                <div>
                  <span>1 / </span>
                  <span className="text-red-400">100</span>
                </div>
                <div className="flex space-x-2">
                  <button className="flex items-center justify-center rounded-lg outline-none focus:outline-none bg-blue-100">
                    <MaterialIcon icon='keyboard_arrow_left' />
                  </button>
                  <button className="flex items-center justify-center rounded-lg outline-none focus:outline-none bg-blue-100">
                    <MaterialIcon icon='keyboard_arrow_right' />
                  </button>
                </div>
              </div>
              <div className="flex items-center ml-auto space-x-2">
                <span>Urutkan</span>
                <select
                  value={type}
                  className="bg-red-100 rounded px-3 py-2 cursor-pointer hover:bg-red-200"
                  onChange={e => filter(e.target.value)}
                >
                  {filters.map(({ label, type }) => (
                    <option key={type} value={type}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4 relative">
              <Overlay show={loading} />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                {state?.map(o => (
                  <Card
                    key={o.id}
                    id={o.id}
                    cashback={o.casback}
                    title={o.name}
                    priceBefore={o.harga_sebelum}
                    price={o.harga}
                    store={o.users?.nama_toko}
                    storeLocation={o.users?.alamat_toko}
                    image={o.foto[0]?.url}
                    like={o.like}
                    discount={o.diskon}
                    clickLike={(e) => like(o.id, e)}
                  />
                ))}
              </div>
            </div>
            <Related />
          </div>
        </div>
      </div>
    </Layout>
  )
}
