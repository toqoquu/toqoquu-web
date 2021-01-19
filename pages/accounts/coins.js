import Link from 'next/link'
import Layout from '@/components/Layout'
import ProfileLayout from '@/components/accounts/Layout'

import className from 'classnames'
import { useState } from 'react'
import { useMount } from 'react-use'
import useFetch from 'use-http'
import { toast } from 'react-toastify'

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

  const { get, loading, response, post, error } = useFetch(
    `auth`,
    { cachePolicy: 'no-cache' },
  )

  useMount(() => { loadInitalItem() }, [])

  async function loadInitalItem() {
    const profil = await get('/GetProfile')
    setItem({ ...item, ...profil })
  }

  async function updateProfil() {
    await post('/ClaimLoyalty', item)
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

  return (
    <Layout>
      <ProfileLayout>
        <div>
          <div>
            <h3 className="mb-3 text-xl">Koin Loyalti</h3>
            <div className="bg-yellow-100 bg-opacity-50 rounded-lg p-4 mb-6">
              <div className="max-w-sm mx-auto">
                <div className="bg-blue-200 mx-auto w-full rounded-lg p-5 text-center">
                  <div className="inline-flex items-center">
                    {[...Array(3).keys()].map(idx => (
                      <div key={idx}>
                        <img
                          src="/icons/koin-saya-icon.png"
                          className={className({
                            'w-12': idx !== 1,
                            'w-16': idx === 1,
                          })}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="mb-3">Koin Tersedia:</p>
                  <div className="inline-block rounded-lg bg-white px-8 py-4 text-yellow-400 text-2xl font-semibold">
                    {item.point_loyalty}
                  </div>
                  <div className="text-sm mt-2">Koin akan berakhir pada 20/20/20</div>
                </div>
                <button className="btn bg-red-400 w-full block mt-6 text-white">
                  Dapatkan Lebih Banyak Koin
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {icons.map(({ icon, label }, idx) => (
                <div key={idx} className="text-center px-4">
                  <img
                    src={icon}
                    className="w-16 block mx-auto text-center mb-2"
                  />
                  <span className="text-gray-600">{label}</span>
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
                    <div key={idx}>
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
        </div>
      </ProfileLayout>
    </Layout>
  )
}
