import Link from 'next/link'
import Layout from '@/components/Layout'
import ProfileCard from '@/components/accounts/ProfileCard'
import Header from '@/components/accounts/Header'
import Related from '@/components/accounts/Related'

import useFetch from 'use-http'
import { useState } from 'react'
import { useMount } from 'react-use'

export default function chat() {
  const [chats, setChats] = useState([])

  const { loading, get } = useFetch('/Chat')

  const getItems = async () => {
    const response = await get('/GetChat')
    if (response) {
      setChats(response)
    }
  }

  useMount(() => getItems())

  return (
    <Layout>
      <div className="mx-auto max-w-screen-xl px-6">
        <div className="flex flex-wrap md:flex-nowrap space-x-4">
          <div className="w-full md:w-1/4">
            <ProfileCard />
          </div>
          <div className="w-full md:w-3/4">
            <div className="max-w-lg">
              <Header title="Chat" />
              <div className="relative w-full rounded-full overflow-hidden border-red-400 border">
                <input type="text" className="bg-white h-10 w-full outline-none px-6" placeholder="Cari chat, nama akun" />
              </div>
            </div>
            <div className="mb-4">
              <div className="text-right mb-2">
                <a href="#">
                  Tandai sudah dibaca
                </a>
              </div>
              <div className="bg-yellow-100 bg-opacity-50 rounded-lg p-4 mb-2 overflow-scroll" style={{ maxHeight: '400px' }}>
                {chats?.map(o => (
                  <Link key={o.id} href={`/accounts/chat/${o.to}`}>
                    <a key={o.id} className="flex space-x-2 mb-2">
                      <div className="p-2 w-24 w-1/6">
                        <img src={o.user?.foto} className="rounded-full w-20 h-20 object-cover" />
                      </div>
                      <div className="bg-white w-full rounded-lg p-2 px-4 w-5/6">
                        <span className="block text-gray-400 text-sm">{o.user?.email}</span>
                        <span className="block">{o.user?.name}</span>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
              <div className="flex justify-center items-center space-x-4">
                <a href="#" className="bg-red-400 w-16 py-1 rounded-full text-center text-white">1</a>
                <a href="#" className="w-16 py-1 rounded-full text-center">2</a>
                <a href="#" className="w-16 py-1 rounded-full text-center">3</a>
                <a href="#" className="w-16 py-1 rounded-full text-center">4</a>
                <a href="#" className="w-16 py-1 rounded-full text-center">5</a>
              </div>
            </div>
            <Related />
          </div>
        </div>
      </div>
    </Layout>
  )
}
