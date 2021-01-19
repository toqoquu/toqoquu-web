import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/Layout'
import ContentHeader from '../components/ContentHeader'
import Related from '../components/accounts/Related'
import { Checkbox, InputNumber, InputText, Loader, Button } from '@/components/ui'
import rp from '@/utils/rp'
import useFetch from 'use-http'
import { useMount, useLocalStorage, useUpdateEffect } from 'react-use'
import { debounce, sum, flattenDeep } from 'lodash'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function cart() {
  const router = useRouter()

  const { get, post, loading } = useFetch('', { cachePolicy: 'no-cache' })

  const [selectedCart, setSelectedCart] = useLocalStorage('cart', '')

  const [data = [], setData] = useState([])

  const [products, setProduct] = useState([])

  const getCart = async() => {
    const res = await get('/Card/list')
    if (res) setData(res)
  }

  const deleteCart = async (e) => {
    await get(`/Card/delete/${e}`)
    getCart()
  }

  const productList = flattenDeep(data.map((o) => {
    const _products = []
    o.product.map((p) => {
      _products.push(p)
    })
    return _products
  }))

  const computedProducts = () => {
    return products.map((o) => {
      return { product: o.id, qty: o.jumlah_pembelian, total: o.total_harga }
    })
  }

  const setSelected = async (e) => {
    if (products.map(p => p.id).includes(e.id)) {
      const arr = [ ...products ]
      const index = arr.indexOf(e)
      arr.splice(index, 1)
      setProduct(arr)
    } else {
      setProduct([...products, e])
    }
  }

  const selectAll = (e) => {
    if (e) {
      setProduct(productList)
    } else {
      setProduct([])
    }
  }

  const updateCart = debounce(async (card_id, type, products_id) => {
    await post('/Card/Tambah-Kurang-Product', { products_id, type, card_id })
    setProduct([])
    getCart()
  })

  useEffect(() => {
    getCart()
  }, [])

  useEffect(() => {
    setSelectedCart(computedProducts())
  }, [computedProducts().length])

  const submit = async () => {
    const product = selectedCart.map((p) => p.product).toString()
    const jumlah = selectedCart.map((p) => p.qty).toString()
    const response = await post('/Transaksi/query', { jumlah, product })
    if (!response.code) {
      router.push('/accounts/orders/checkout')
    }
  }

  return (
    <Layout>
      <Head>
        <title>Shopping Cart | Toqoquu</title>
      </Head>
      <div className="mx-auto max-w-screen-lg px-6 relative">
        <div className="relative overflow-hidden">
          <h3 className="px-12 text-xl mb-2">
            Keranjang Saya
          </h3>
          <div className="bg-blue-100 rounded-lg mb-2">
            <div className="flex space-x-6 text-gray-600 py-2 px-3">
              <div className="w-1/12">
                <Checkbox
                  checked={productList.length == products.length}
                  update={(e) => selectAll(e)}
                />
              </div>
              <div className="w-4/12">
                Checklist Produk
              </div>
              <div className="w-2/12">
                Harga Satuan
              </div>
              <div className="w-2/12">
                Jumlah
              </div>
              <div className="w-2/12">
                Total Harga
              </div>
              <div className="w-1/12 text-center">
                <a href="#">Edit</a>
              </div>
            </div>
          </div>
          <div className="relative">
          <div className={`absolute top-0 bottom-0 left-0 right-0 bg-white bg-opacity-50 z-10 ${loading ? 'block' : 'hidden'}`} />
          {data?.map((o, idx) => (
            <div key={o?.id}>
              <div className="flex space-x-4 items-center bg-red-400 px-3 py-2 w-1/2 rounded-lg mb-2 text-white">
                <Checkbox />
                <span>{o?.penjual}</span>
              </div>
              {o?.product?.map((p) => (
                <div key={p.id + '_product'}>
                  <div className="bg-yellow-100 bg-opacity-50 rounded-lg mb-2">
                    <div className="flex space-x-6 text-gray-600 py-2 px-3 items-center">
                      <div className="w-1/12">
                        <Checkbox
                          checked={products.map((nP) => nP.id).includes(p.id)}
                          update={(e) => setSelected(e)}
                          value={p}
                        />
                      </div>
                      <div className="w-4/12">
                        <div className="flex space-x-3 items-center">
                          <div className="w-32 overflow-hidden">
                            <img
                              src={p?.foto[0]?.url}
                              className="rounded-lg h-16 w-16 object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm">{p?.name}</h4>
                            <span className="text-xs" style={{ lineHeight: '0' }}>{p?.deskripsi}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-2/12">
                        {rp(p?.harga)}
                      </div>
                      <div className="w-2/12">
                        <InputNumber
                          value={p.jumlah_pembelian}
                          className="bg-red-200 rounded text-center py-1 w-16"
                          max={p.stock}
                          increment={() => updateCart(o?.id, 1, p?.id)}
                          decrement={() => updateCart(o?.id, 2, p?.id,)}
                        />
                      </div>
                      <div className="w-2/12">
                        {rp(p?.total_harga)}
                      </div>
                      <div className="w-1/12 text-center">
                        <a
                          href="#"
                          onClick={(e) => {
                            deleteCart(o?.id)
                            e.preventDefault()
                          }}
                        >
                          Hapus
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4 items-center bg-blue-300 px-3 py-2 w-1/2 rounded-lg mb-2">
                    <span className="bg-white px-3 py-1 text-xs rounded-lg text-gray-800">
                      Promo Toko:
                    </span>
                    <div className="text-xs">

                      {p?.casback ? (<span>Cashback {rp(p.casback)}</span>) : 'Tidak ada promosi'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          </div>
          <div className="bg-yellow-100 bg-opacity-50 rounded-lg px-6 py-4">
            <div className="flex space-x-4 items-end">
              <div className="w-6/12">
                <Checkbox
                  label="Pilih semua"
                  checked={productList.length == products.length}
                  update={(e) => selectAll(e)}
                />
              </div>
              <div className="w-4/12">
                <div className="text-right">
                  <div className="flex space-x-2 mb-4 items-center flex-end">
                    <div>
                      <span>Voucher</span>
                    </div>
                    <div className="px-2 h-8 w-full">
                      <InputText placeholder="Masukan/Pilih Voucher" />
                    </div>

                  </div>
                </div>
                <div className="mb-4 text-sm text-right">Tukar Koin Loyalti Kamu</div>
                <div className="text-sm text-right">Subtotal untuk Produk ({computedProducts().length} produk)</div>
              </div>
              <div className="w-2/12 text-right">
                {computedProducts().length && rp(sum(computedProducts().map((o) => o.total)))}
              </div>
            </div>
          </div>
        </div>
        <div className="text-right mt-4">
          <button
            className="btn bg-red-400 text-white rounded-lg"
            onClick={e => submit(e)}
          >
            Checkout
          </button>
        </div>
        <Related />
      </div>
    </Layout>
  )
}
