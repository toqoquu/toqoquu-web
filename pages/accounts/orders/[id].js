import Link from 'next/link'
import Layout from '@/components/Layout'
import MaterialIcon from '@material/react-material-icon'
import Placeload from '@/components/Placeload'
import Start from '@/components/Star'
import useFetch from 'use-http'
import { useState } from 'react'
import {useMount} from 'react-use'
import rp from '@/utils/rp'

export default function ViewTransaction({ id }) {
  const { get, loading, response, post } = useFetch(
    `/Transaksi`,
    { cachePolicy: 'no-cache' },
  )

  const [data, setData] = useState([])

  const getInitialData = async () => {
    const initialData = await get(`/Details-Transaksi/${id}`)
    setData(initialData)
  }
  
  useMount(() => getInitialData())

  const setRating = (key, idx, value) => {
    const product = data.product
    product[idx][key] = value
    setData({ ...data, product })
  }

  const sendRating = async (idx) => {
    const { penjual_id, product } = data
    const { product_id, rating, deskripsi } = product[idx]
    await post('/Retting-Product', {
      penjual_id,
      rating,
      deskripsi,
      products_id: product_id
    })
  }

  const updateStatus = async (id) => {
    await get(`/Update-Diterima/${id}`)
    await getInitialData()
  }

  return (
    <Layout>
      {loading ? (
        <div className="mx-auto max-w-screen-lg px-6 text-gray-600">
          <Placeload height={25} />
          <Placeload height={25} />
          <Placeload height={25} />
        </div>
      ) : (
        <div className="mx-auto max-w-screen-lg px-6 text-gray-600">
          <div className="flex items-center px-6">
            <h3 className="text-xl">Detail Pesanan</h3>
            <a href="#" className="ml-auto flex items-center">
              <MaterialIcon icon='print' className="mr-2" />
              Cetak
            </a>
          </div>
          <div className="mt-2 bg-yellow-600 bg-opacity-50 rounded-2xl px-4 py-2 flex items-center text-sm">
            <div>
              Nomor Pesanan
            </div>
            <div className="ml-auto">
              {data?.invoice}
              <a href="#" className="ml-2 text-red-600">Salin</a>
            </div>
          </div>
          <div className="mt-2 bg-blue-300 bg-opacity-50 rounded-2xl px-4 py-2 flex items-center text-sm">
            <div className="text-gray-700">
              <p className="text-lg">{data?.alamat?.nama_penerima}</p>
              <p className="text-sm">{data?.alamat?.nomor_hp}</p>
              <p className="text-sm">{data?.alamat?.alamat}</p>
              <p className="text-sm">{data?.alamat?.kecamatan}, {data?.alamat?.kelurahan}</p>
              <p className="text-sm">(Patokan): {data?.alamat?.patokan}</p>
            </div>
            <div className="ml-auto">
              <a href="#" className="ml-2 text-red-600">Salin</a>
            </div>
          </div>
          <div className="mt-2 bg-yellow-600 bg-opacity-50 rounded-2xl px-4 py-2 flex items-center text-sm">
            <div>
              Total Tagihan
            </div>
            <div className="ml-auto">
              {rp(data?.harga_total)}
            </div>
          </div>
          <div className="mt-2 bg-yellow-200 bg-opacity-50 rounded-2xl px-4 py-2 flex items-center text-sm">
            Catatan: Give me best packaging.
          </div>
          <div className="mt-2 bg-blue-300 bg-opacity-50 rounded-2xl px-4 py-2 flex items-center text-sm">
            <div className="text-gray-700">
              Status Pengiriman
            </div>
            <div>
              {data?.noresi}
            </div>
            <div className="ml-auto">
              <span className="mr-3">{data?.kurir}</span>
              <span>{data?.noresi}</span>
              <a href="#" className="ml-2 text-red-600">Lacak</a>
            </div>
          </div>
          {data?.status != 2 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
              <button
                  className="bg-yellow-600 bg-opacity-50 border-0 focus:outline-none rounded-2xl px-4 py-2 hover:opacity-75"
                  onClick={() => updateStatus(data.id)}
                >
                Pesanan Telah diterima
              </button>
              <button className="bg-blue-300 border-0 focus:outline-none rounded-2xl px-4 py-2 hover:opacity-75">
                Kontak Toko Penjual
              </button>
              <button className="bg-red-400 border-0 focus:outline-none text-white rounded-2xl px-4 py-2 hover:opacity-75">
                Ajukan Komplain
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mt-4 mb-4">
                <button className="bg-blue-300 border-0 focus:outline-none rounded-2xl px-4 py-2 hover:opacity-75">
                  Kontak Toko Penjual
                </button>
              </div>
              <div>
                {data?.product?.map((item, itemIdx) => (
                  <div key={`item-${item.id}`} className="mb-4">
                    <div className="mb-2 flex items-center hover:bg-gray-100 bg-yellow-100 bg-opacity-50 rounded-lg px-6">
                      <div className="mr-5">
                        <img src={item.foto_product} className="w-20 h-20 object-cover rounded-lg" />
                      </div>
                      <div>
                        <span className="text-sm block">{item.nama_product}</span>
                        <span className="text-red-400 font-semibold">{rp(item.harga_product)}</span>
                      </div>
                      <div className="ml-auto">
                        <Start
                          value={item?.rating}
                          update={(e) => setRating('rating', itemIdx, e)}
                        />
                      </div>
                    </div>
                    <div className="relative flex space-x-2">
                      <input
                        type="text"
                        className="w-full h-10 rounded-lg border px-6"
                        value={item?.deskripsi}
                        onChange={(e) => setRating('deskripsi', itemIdx, e.target.value)}
                      />
                      <button
                        className="bg-red-300 border-0 focus:outline-none rounded-2xl px-4 py-2 hover:opacity-75"
                        onClick={() => sendRating(itemIdx)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const id = context.params.id
  return {
    props: { id }
  }
}
