import Link from 'next/link'
import Layout from '@/components/Layout'
import ProfileLayout from '@/components/accounts/Layout'
import Menu from '@/components/accounts/Menu'
import Card from '@/components/products/Card'
import { Overlay } from '@/components/ui'
import { useEffect, useState } from 'react'
import useFetch from 'use-http'

export default function favorites() {
  const [addresses = [], setAddresses] = useState([])

  const { get, loading, error } = useFetch('/Alamat', { cachePolicy: 'no-cache' })

  const getAddresses = async () => {
    const res = await get('/list')
    setAddresses(res)
  }

  const deleteAddress = async (e, id) => {
    e.preventDefault()
    const res = await get(`/delete/${id}`)
    getAddresses()
  }

  useEffect(() => {
    getAddresses()
  }, [])

  return (
    <Layout>
      <ProfileLayout>
        <div className="pr-16">
          <div>
            <div className="flex items-center">
              <h3 className="mb-3 text-xl mt-3">Alamat</h3>
              <Link href="/accounts/addresses/create">
                <a className="btn bg-red-500 ml-auto text-white">
                  Tambah alamat
                </a>
              </Link>
            </div>
            <div className="mb-4 relative">
              <Overlay show={loading} />
              <div className="text-sm">
                {addresses && Array.isArray(addresses) && addresses.map((o) => (
                  <div className="border-b px-4 py-4 mb-3 flex flex-wrap">
                    <div className="w-1/2">
                      <div className="flex items-center mb-2">
                        <span className="w-24 text-gray-400">Nama</span>
                        <span>{o.judul_alamat}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="w-24 text-gray-400">Telepon</span>
                        <span>{o.nomor_hp}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24 text-gray-400">Alamat</span>
                        <div>
                          <div>{o.alamat}</div>
                          <div>{o.kota} - {o.kecamatan}</div>
                          <div>{o.provinsi}</div>
                          <div>{o.kode_pos}</div>
                          <div>Patokan ({o.patokan})</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2 flex space-x-4 justify-end">
                      <a className="underline">Edit</a>
                      <a href="#" className="underline" onClick={e => deleteAddress(e, o.id)}>Hapus</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ProfileLayout>
    </Layout>
  )
}
