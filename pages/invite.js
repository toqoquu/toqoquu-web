import Head from 'next/head'
import Layout from '../components/Layout'
import ContentHeader from '../components/ContentHeader'

export default function Invite() {
  return (
    <Layout>
      <div className="mb-4 relative">
        <img src="/img/image-bagikan-ke-teman-mobile.jpg" />
      </div>
      <div className="mx-auto max-w-md text-center pb-32">
        <div>
          Share Kode Referalmu
          <div className="mt-3">
            <div className="relative rounded-lg overflow-hidden w-full bg-yellow-100 bg-opacity-50">
              <input type="text" className="bg-transparent h-10 w-full outline-none px-6" placeholder="HITBARENG123" />
              <button className="absolute right-0 bg-red-400 hover:bg-red-500 h-10 text-white btn rounded-full">
                Invite Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
