import Link from 'next/link'
import Layout from '../../../components/Layout'
import ContentHeader from '../../../components/ContentHeader'
import { useLocalStorage, useMount } from 'react-use'
import { useState, useEffect } from 'react'
import { isEmpty, sum } from 'lodash'
import useFetch from 'use-http'
import rp from '@/utils/rp'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function transactions() {
  const router = useRouter()
  const [products] = useLocalStorage('cart')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [addresses = [], setAddresses] = useState([])
  const [address, setAddress] =  useState({
    alamat: '',
    id: '',
    judul_alamat: '',
    nomor_hp: '',
  })

  const [req, setReq] = useState({
    alamat_id: 0,
    metode_pembayaran: 'Transfer',
    bank_id: 0,
    product: '',
    jumlah: '',
    kurir: 'JNE',
    harga_kurir: '10000',
    harga_total_perbarang: 0,
    harga_total_keseluruhan: 0,
  })

  const { post, get, getloading, error } = useFetch('', { cachePolicy: 'no-cache' })

  const setReqValue = (key, value) => {
    setReq({ ...req, [key]: value })
  }

  const setSelectedAddress = (val) => {
    setReqValue('alamat_id', val)
    const _address = addresses.find((o) => o.id == val)
    setAddress(_address)
  }

  const postTransaction = async () => {
    const response = await post('/Transaksi/CommitTransaksi', req)
    if (response.invoice) {
      router.push(`/accounts/orders/${response.invoice}/confirm`)
    }
  }

  const postQuery = async (q) => {
    const response = await post('/Transaksi/query', q)
    if (!response) return
    setSelectedProducts(response)
    const totals = []
    response.forEach((r) => {
      r.product.forEach((p) => {
        totals.push(p.harga_total)
      })
    })

    const { product, jumlah } = q

    setReq({
      ...req,
      product,
      jumlah,
      harga_total_perbarang: totals.toString(),
      harga_total_keseluruhan: sum(totals)
    })
  }

  const getAddresses = async (q) => {
    const response = await get('/Alamat/list')
    setAddresses(response)
  }

  useEffect(() => {
    if (Array.isArray(products)) {
      const product = products.map((p) => p.product).toString()
      const jumlah = products.map((p) => p.qty).toString()
      postQuery({ product, jumlah })
    }
    getAddresses()
  }, [])

  return (
    <Layout>
      <div className="mx-auto max-w-screen-lg px-6">
        <div className="mb-4">
          <h3 className="px-16 mb-4 text-2xl">Pesanan Saya</h3>
          <div className="bg-blue-100 rounded-lg text-gray-700 py-4 px-16 relative">
            <div>
              <div className="flex items-center flex-wrap md:flex-nowrap md:space-x-2">
                <span className="w-full block mb-3 md:w-1/2 text-center md:text-left">Alamat Pengiriman</span>
                <div className="w-full fle md:justify-end md:w-1/2">
                  <select
                    value={req.alamat_id}
                    className="bg-red-100  w-full rounded h-10 px-3 rounded-full focus:bg-red-200 border br hover:bg-red-200 border-red-200 focus:border-red-300 focus:shadow"
                    onChange={e => setSelectedAddress(e.target.value)}
                  >
                    <option disabled value={0}>Pilih Alamat</option>
                    {Array.isArray(addresses) && addresses?.map((o, i) => (
                      <option key={i} value={o.id}>{o.judul_alamat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex-1">
                {!isEmpty(address) && <div>
                  <span className="text-xl block">{address?.judul_alamat}</span>
                  <span className="block text-sm">{address?.nomor_hp}</span>
                  <p className="block text-sm">{address?.alamat}</p>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <ContentHeader title="Detail Transaksi" />
          <div className="rounded-lg overflow-scroll -mt-3">
            <table className="w-full table-auto table">
              <thead>
                <tr className="bg-red-100 rounded-lg py-6">
                  <th className="font-light">
                    Tagihan
                  </th>
                  <th className="font-light">
                    Jasa Pengiriman
                  </th>
                  <th className="font-light">
                    Biaya Pengiriman
                  </th>
                  <th className="font-light">
                    Total Tagihan
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(selectedProducts) && selectedProducts?.map((o, i) => (
                  <tr key={i} className="bg-yellow-100 text-center">
                    <td className="px-2 w-20">{rp(o.total_harga)}</td>
                    <td className="px-2 w-20">
                      <span className="bg-red-100 w-32 inline-block rounded-full text-center">
                        JNE
                      </span>
                    </td>
                    <td className="px-2 w-32">{rp('10000')}</td>
                    <td className="px-2 w-32">{rp(o.total_harga + 10000)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-4 justify-end">
            <div>
              <div className="flex flex-wrap md:space-x-6 items-center mb-6 justify-center">
                <span className="block text-center">
                  Metode Pembayaran
                </span>
                <select
                  value={req.bank_id}
                  className="bg-red-100 rounded h-10 px-3 rounded-full focus:bg-red-200 border br hover:bg-red-200 border-red-200 focus:border-red-300 focus:shadow"
                  onChange={e => setReqValue('bank_id', e.target.value)}
                >
                  <option disabled value={0}>Pilih Metode Pembayaran</option>
                  <option value={1}>Transafer Bank BCA</option>
                  <option value={2}>COD</option>
                </select>
              </div>
              <div className="text-right">
                <button
                    className="text-center px-6 py-2 w-64 bg-red-500 rounded-lg text-white w-full md:inline-block hover:bg-red-400"
                    onClick={e => postTransaction()}
                  >
                  Lanjutkan Pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
