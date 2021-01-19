import Link from 'next/link'
import Layout from '@/components/Layout'
import ProfileLayout from '@/components/accounts/Layout'

import className from 'classnames'
import { useState } from 'react'
import { useMount } from 'react-use'
import useFetch from 'use-http'
import { toast } from 'react-toastify'
import rp from '@/utils/rp'

export default function notification() {
  const [item, setItem] = useState({
    name: '',
    email: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    nomor_hp: '',
    nama_toko: '',
    jenis_kelamin: 'Laki-laki',
  })

  const [vouchers, setVouchers] = useState([])

  const { get, loading, response, post, error } = useFetch(
    '',
    { cachePolicy: 'no-cache' },
  )

  async function loadInitalItem() {
    const profil = await get('/auth/GetProfile')
    setItem({ ...item, ...profil })
  }

  async function loadVoucher() {
    const response = await get('/Voucher/List-By-User?status=0')
    if (response) setVouchers(response)
  }

  async function updateProfil() {
    await post('/auth/ClaimLoyalty', item)
    const { data: { message, code } } =  response
    if(code < 400) {
      toast.success(message, {
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

  const setStateItem = (key, value) => {
    setItem({ ...item, [key]: value })
  }

  const icons = [
    { label: 'Tingkatkan terus transaksimu', icon: '/coins/transaction.png' },
    { label: 'Rutin Checkin tiap hari', icon: '/coins/checkin.png' },
    { label: 'Bagikan link ke temanmu untuk ikut Checkin', icon: '/coins/share.png' },
    { label: 'Follow Media Sosial Kami', icon: '/coins/follow.png' },
  ]

  useMount(() => {
    loadInitalItem()
    loadVoucher()
  }, [])

  return (
    <Layout>
      <ProfileLayout>
        <div>
          <div>
            <h3 className="mb-3 text-xl">Voucher Saya</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vouchers?.map((v, n) => (
                <div className="flex space-x-1">
                  <div key={n} className="flex space-x-3 items-center relative w-3/4">
                    <div className="bg-blue-600 w-24 h-24 flex justify-center items-center p-3 rounded-lg text-center">
                      <span className="font-semibold text-lg text-white">{v.judul}</span>
                    </div>
                    <div>

                      <span className="block text-sm font-light">Kode voucher: {v.code}</span>
                      <span className="block" style={{ fontSize: '10px' }}>Up to</span>
                      <span className="text-xl block">{rp(v.diskon)}</span>
                      <span className="font-light text-sm">Hingga: {v.expired}</span>
                    </div>
                  </div>
                  <div className="ml-auto text-right w-1/4 relative">
                    <a href="#">Pakai &gt;</a>
                    <a href="#" className="absolute bottom-0 right-0">S&amp;K</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="py-12 mb-12">
            <div className="max-w-md mx-auto">
              <div className="bg-blue-200 mx-auto w-full rounded-lg p-5 text-center text-white">
                <h4 className="font-medium text-lg mb-3">Reward Koin Saya Hari ini</h4>
                <span className="block text-4xl font-bold mb-3">{item?.point_loyalty}</span>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {[10, 20, 30, 40, 50, 100, 150].map((c, idx) => (
                    <div>
                      <div className="mb-2"><span className="block mb-0">Hari</span>{idx > 0 ? idx + 1 : 'ini'}</div>
                      <div>
                        <img src="/icons/koin-saya-icon.png" className="w-12" />
                      </div>
                      <span className="font-semibold">{c}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button className="w-full btn bg-yellow-100 text-gray-800">
                    Check-in Hari ini & Dapatkan 10 Koin
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {vouchers.map((v, n) => (
              <div className="flex space-x-1">
                <div key={n} className="flex space-x-3 items-center relative w-3/4">
                  <div className="bg-blue-600 w-24 h-24 flex justify-center items-center p-3 rounded-lg text-center">
                    <span className="font-semibold text-lg text-white">{v.judul}</span>
                  </div>
                  <div>

                    <span className="block text-sm font-light">Kode voucher: {v.code}</span>
                    <span className="block" style={{ fontSize: '10px' }}>Up to</span>
                    <span className="text-xl block">{rp(v.diskon)}</span>
                    <span className="font-light text-sm">Hingga: {v.expired}</span>
                  </div>
                </div>
                <div className="ml-auto text-right w-1/4 relative">
                  <a href="#">Pakai &gt;</a>
                  <a href="#" className="absolute bottom-0 right-0">S&amp;K</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ProfileLayout>
    </Layout>
  )
}
