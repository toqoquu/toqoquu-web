import Link from 'next/link'
import Layout from '../../components/Layout'
import ProfileCard from '../../components/accounts/ProfileCard'
import Header from '../../components/accounts/Header'
import Related from '../../components/accounts/Related'
import StatusMenu from '@/components/accounts/StatusMenu'
import { Overlay } from '@/components/ui'

import { useState } from 'react'
import { useMount } from 'react-use'
import useFetch from 'use-http'
import { omit } from 'lodash'
export default function notification() {
  const [state, setState] = useState([])
  const [meta, setMeta] = useState({})
  const { get, error, loading, response } = useFetch('/Notifikasi/list')

  const getState = async () => {
    const res = await get()
    if (res && res.data?.length){
      setState(res.data)
      setMeta(omit(res, ['data']))
    }
  }

  useMount(() => getState())

  const getLink = (type = null, target = null) => {
    if (type == '2') {
      return `/accounts/voucher`
    } else {
      return `/products/view/${target}`
    }
  }
  return (
    <Layout>
      <div className="mx-auto max-w-screen-xl px-3 md:px-6">
        <div className="flex flex-wrap md:flex-nowrap md:space-x-4">
          <div className="w-full md:w-1/4">
            <ProfileCard />
          </div>
          <div className="w-full md:w-3/4">
            <div className="md:pr-16">
              <div>
                <Header title="Notifikasi" />
              </div>
              <div className="bg-blue-100 md:px-6 py-3 rounded mb-4 px-3">
                <StatusMenu />
              </div>
              <div className="mb-4">
                <div className="bg-yellow-100 bg-opacity-50 rounded-lg p-4 mb-2">
                  {state.map(o => (
                    <div key={o.id} className="flex space-x-2 mb-2">
                      <div className="bg-white rounded-lg p-2 w-24">
                        <img src="/menu/chat.jpg" className="max-w-full rounded-full" />
                      </div>
                      <Link href={getLink(o.type, o.tujuan_id)}>
                        <a className="bg-white w-full rounded-lg p-2 px-4">{o.keterangan}</a>
                      </Link>
                    </div>
                  ))}
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
