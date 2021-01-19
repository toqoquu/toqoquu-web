import Head from 'next/head'
import Layout from '../components/Layout'
import ContentHeader from '../components/ContentHeader'
import Placeload from '../components/Placeload'
import { List } from '../components/faq'
import { useState } from 'react'
import useFetch from 'use-http'

export default function Help() {
  const bannerStyle = {
    top: '50%',
    transform: 'translateY(-50%)',
  }
  const [state, setState] = useState({})
  const { data = [], loading } = useFetch('/InfoCategory/list', [])
  const handleClick = (e, id) => {
    e.preventDefault()
    setState(id)
  }
  return (
    <Layout>
      <Head>
        <title>Help | Toqoquu</title>
      </Head>
      <div className="mb-4 relative">
        <img src="/img/image-bantuan.png" />
        <div style={bannerStyle} className="absolute left-0 right-0 px-24 flex justify-end">
          <div className="relative w-full md:w-1/2 rounded-lg overflow-hidden">
            <input type="text" className="bg-white h-10 w-full outline-none px-6" placeholder="Cari topik" />
            <button className="absolute right-0 bg-red-300 hover:bg-red-400 h-10 text-white btn">
              Cari
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-6 mb-8">
        <h1 className="text-3xl text-center mb-4">
          Kategori
        </h1>
        <div className="bg-yellow-100 bg-opacity-50 rounded py-8 mb-8 px-3">
          <div className="max-w-screen-lg mx-auto grid grid-cols-3 md:grid-cols-7 gap-3">
            {loading ? (
              [...Array(7).keys()].map(n => (
                <div key={n} className="text-center">
                  <Placeload height={100} />
                  <Placeload height={10} width={50} />
                </div>
              ))
            ) : (
              data?.map((o, idx) => (
                <div key={idx} className="text-center">
                  <a href="#" onClick={(e) => handleClick(e, o)}>
                    <img
                      src={o.url}
                      className="max-w-full rounded-2xl mx-auto block mb-2 w-12"
                    />
                    <span className="text-xs">{o.name}</span>
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
        <h3 className="text-3xl text-center mb-8">
          {state?.name}
        </h3>
        <div>
          <List id={state?.id} />
        </div>
      </div>
      <div>
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl text-center mb-4">
            Contact Us
          </h1>
        </div>
        <div className="bg-red-200 py-8 px-3">
          <div className="max-w-screen-xl mx-auto text-center">
            <div className="flex space-x-10 justify-center">
              <div className="bg-blue-100 rounded-lg flex p-2 items-center w-56 flex-wrap text-left cursor-pointer">
                <div className="w-1/4">
                  <img src="/contact/kotak-masuk-icon.png" className="w-10" />
                </div>
                <div className="w-3/4">
                  <h4>Email</h4>
                  <span className="text-xs">
                    Tuliskan pertanyaanmu sekarang
                  </span>
                </div>
              </div>
              <div className="bg-blue-100 rounded-lg flex p-2 items-center w-56 flex-wrap text-left cursor-pointer">
                <div className="w-1/4">
                  <img src="/contact/kotak-masuk-icon.png" className="w-10" />
                </div>
                <div className="w-3/4">
                  <h4>Telepon</h4>
                  <span className="text-xs">
                    Telepon untuk informasi lebih lanjut
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
