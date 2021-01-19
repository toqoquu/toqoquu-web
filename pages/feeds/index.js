import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Menu from '../../components/feeds/Menu'
import List from '../../components/feeds/List'

export default function feed() {
  return (
    <Layout>
      <Head>
        <title>Feeds | Toqoquu</title>
      </Head>
      <div className="mx-auto w-full md:max-w-screen-lg px-6">
        <div className="md:px-8">
          <Menu />
          <div className="bg-yellow-100 bg-opacity-50 p-3 rounded-3xl">
            <List />
          </div>
        </div>
      </div>
    </Layout>
  )
}
