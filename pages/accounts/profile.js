import Link from 'next/link'
import Layout from '@/components/Layout'
import ProfileLayout from '@/components/accounts/Layout'
import Menu from '@/components/accounts/Menu'
import { InputText } from '@/components/ui'

import className from 'classnames'
import { useState } from 'react'
import { useMount } from 'react-use'
import useFetch from 'use-http'
import { toast } from 'react-toastify'
import { Swiper, SwiperSlide } from 'swiper/react'

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
    await post('/Update-New', item)
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
  return (
    <Layout>
      <ProfileLayout>
        <div className="md:pr-16">
          <div>
            <Menu />
            <h3 className="mb-3 text-xl mt-3">Akun Saya</h3>
            <div>
              <div className="flex space-x-2 items-center max-w-lg mb-3">
                <div className="w-2/5 text-right mr-3">
                  <span>Nama</span>
                </div>
                <InputText
                  value={item?.name}
                  update={(e) => setStateItem('name', e)}>
                </InputText>
              </div>
              <div className="flex space-x-2 items-center max-w-lg mb-3">
                <div className="w-2/5 text-right mr-3">
                  <span>Email</span>
                </div>
                <InputText
                  value={item?.email}
                  update={(e) => setStateItem('email', e)}>
                </InputText>
              </div>
              <div className="flex space-x-2 items-center max-w-lg mb-3">
                <div className="w-2/5 text-right mr-3">
                  <span>Nomor Telepon</span>
                </div>
                <InputText
                  value={item?.nomor_hp}
                  update={(e) => setStateItem('nomor_hp', e)}>
                </InputText>
              </div>
              <div className="flex space-x-2 items-center max-w-lg mb-3">
                <div className="w-2/5 text-right mr-3">
                  <span>Nama Toko</span>
                </div>
                <InputText
                  value={item?.nama_toko}
                  update={(e) => setStateItem('nama_toko', e)}>
                </InputText>
              </div>
              <div className="flex space-x-2 items-center max-w-lg mb-3">
                <div className="w-2/5 text-right mr-3">
                  <span>Jenis Kelamin</span>
                </div>
                <div className="w-full">
                  <div className="pretty p-default p-curve p-fill">
                    <input
                      type="radio"
                      name="gender"
                      value="Laki-laki"
                      onClick={(e) => setStateItem('jenis_kelamin', e.target.value)}
                    />
                    <div className="state p-info">
                      <label>Laki-laki</label>
                    </div>
                  </div>
                  <div className="pretty p-default p-curve p-fill">
                    <input
                      type="radio"
                      name="gender"
                      value="Perempuan"
                      onClick={(e) => setStateItem('jenis_kelamin', e.target.value)}
                    />
                    <div className="state p-info">
                      <label>Perempuan</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 items-center max-w-lg mb-3">
                <div className="w-2/5 text-right mr-3">
                  <span>Tangal Lahir</span>
                </div>
                <div className="w-full">
                  <InputText
                    value={item?.tanggal_lahir}
                    type="date"
                    update={(e) => setStateItem('tanggal_lahir', e)}>
                  </InputText>
                </div>
              </div>
              <div className="flex space-x-2 items-center max-w-lg mb-3">
                <div className="w-2/5 text-right mr-3">
                  <span className="hidden">Simpan</span>
                </div>
                <div className="w-full">
                  <button
                    className={className({
                      'btn bg-red-500 text-white w-32': true,
                      'opacity-50': loading,
                    })}
                    disabled={loading}
                    onClick={() => updateProfil()}>
                    {loading ? 'loading...': 'Simpan'}
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
