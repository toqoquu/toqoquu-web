import Link from 'next/link'
import Layout from '@/components/Layout'
import ProfileCard from '@/components/accounts/ProfileCard'
import Header from '@/components/accounts/Header'
import Related from '@/components/accounts/Related'

import useFetch from 'use-http'
import { useState } from 'react'
import { useMount } from 'react-use'
import { reverse } from 'lodash'
import classname from 'classnames'

export default function chatDetail({ users_id_to }) {
  const [chats = [], setChats] = useState([])
  const [message, setMessage] = useState('')

  const { loading, post } = useFetch('/Chat')

  const getItems = async () => {
    const response = await post('/Get-Chat-Isi', { users_id_to })
    if (response) {
      setChats(response)
    }
  }

  const _sendChat = (e) => {
    if (e.key == 'Enter') {
      sendChat()
    }
  }

  const sendChat = async () => {
    if (!message) return
    const msgs = Array.isArray(chats) ? chats : []
    setChats([{ text: message, user: { _id:  users_id_to + 1 } }, ...msgs])
    setMessage('')
    await post('/create', { users_id_to, keterangan: message })
  }

  useMount(() => getItems())

  const _chats = () => Array.isArray(chats) ? reverse([...chats]) : []

  return (
    <Layout>
      <div className="mx-auto max-w-screen-xl px-6">
        <div className="flex space-x-4">
          <div className="w-1/4">
            <ProfileCard />
          </div>
          <div className="w-3/4">
            <div className="max-w-lg">
              <Header title="Chat" />
            </div>
            <div className="mb-4">
              <div className="rounded-lg p-4 mb-2 max-w-screen-sm">
                <div className="bg-yellow-100 bg-opacity-50 overflow-scroll px-6" style={{ maxHeight: '400px' }}>
                  {_chats().map((o, i) => (
                    <Link key={i} href={`/accounts/chat/${o.to}`}>
                      <div
                        key={i + '__chat'}
                        className={classname({
                          'flex': true,
                          'justify-end': users_id_to != o.user?._id
                        })}
                      >
                        <div
                          className={classname({
                            'mb-2 rounded-lg p-2 px-4': true,
                            'bg-red-300': users_id_to != o.user?._id,
                            'bg-blue-300': users_id_to == o.user?._id,
                          })}
                        >
                          <span className="block">{o.text}</span>
                        </div>
                      </div>
                    </Link>
                  )) || ''}
                </div>
                <div className="mt-2">
                  <div
                    className="relative w-full rounded-full overflow-hidden border"
                  >
                    <input
                      type="text"
                      className="bg-white h-10 w-full outline-none px-6"
                      placeholder="Kirim pesan"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => _sendChat(e)}
                    />
                    <button
                      className="btn absolute right-0 bg-red-400 text-white"
                      onClick={() => sendChat()}
                    >
                      Kirim
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Related />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const users_id_to = context.params.user_id
  return {
    props: { users_id_to }
  }
}
