import Link from 'next/link'
import Layout from '@/components/Layout'
import ProfileCard from '@/components/accounts/ProfileCard'
import Header from '@/components/accounts/Header'
import Related from '@/components/accounts/Related'
import StatusMenu from '@/components/accounts/StatusMenu'
import Placeload from '@/components/Placeload'
import rp from '@/utils/rp'
import useFetch from 'use-http'
import { useEffect, useState } from 'react'

export default function received() {
  const { data = [], loading } = useFetch('/Transaksi/ListransaksiDiTerima', [])

  return (
    <Layout>
      <div className="mx-auto max-w-screen-xl px-6">
        <div className="flex space-x-4">
          <div className="w-1/4">
            <ProfileCard />
          </div>
          <div className="w-3/4">
            <div className="pr-16">
              <div>
                <Header title="Sampai Tujuan" />
              </div>
              <div className="bg-blue-100 px-6 py-3 rounded mb-4">
                <StatusMenu />
              </div>
              <div className="mb-4">
                {loading ? (
                  <>
                    {[...Array(3).keys()].map(n => (
                      <div key={n} className="text-center w-full mx-auto">
                        <Placeload height={100} />
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="mb-4">
                    {data?.map((o, pid) => (
                      <div key={`product-${pid}`} className="mb-3">
                        <div className="mb-3">
                          <div className="bg-yellow-100 p-6 bg-opacity-50 rounded-lg">
                            {o.product?.map((item) => (
                              <div key={`item-${item.id}`} className="mb-2 flex space-x-4 items-center hover:bg-yellow-100">
                                <div>
                                  <img src={item.foto_product} className="w-20 h-20 object-cover rounded-lg" />
                                </div>
                                <div>
                                  <span className="text-sm block">{item.nama_product}</span>
                                  <span className="text-red-400 font-semibold">{rp(item.harga_product)}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-red-400 flex items-center py-3 px-4 rounded-lg">
                          <span className="inline-block px-2 py-1 bg-white rounded mr-4">
                            Total Transaksi
                          </span>
                          <span className="text-white font-semibold">
                            {rp(o.harga_total)}
                          </span>
                          <div className="ml-auto">
                            <Link href={`/accounts/orders/${o.id}`}>
                              <a className="block text-center px-2 py-1 bg-white rounded bg-red-600 text-white">
                                Lihat Detail
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <Related />
          </div>
        </div>
      </div>
    </Layout>
  )
}
