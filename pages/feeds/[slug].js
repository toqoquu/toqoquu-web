import Head from 'next/head'
import MaterialIcon from '@material/react-material-icon'
import Layout from '../../components/Layout'
import Menu from '../../components/feeds/Menu'
import List from '../../components/feeds/List'
import Detail from '../../components/feeds/Detail'

import useFetch from 'use-http'
import { useState } from 'react'
import { useMount } from 'react-use'

export default function ViewFeed({ slug }) {
  const [data, setData] = useState([])

  const { get, loading, response, post } = useFetch(
    `/Content/detail/${slug}`,
    { cachePolicy: 'no-cache' },
  )

  const getInitialData = async () => {
    const initialData = await get()
    setData(initialData)
  }

  useMount(() => getInitialData())

  return (
    <Layout>
      <Head>
        <title>{data?.name} | Toqoquu</title>
      </Head>
      <div className="mx-auto max-w-screen-lg px-6">
        <div className="px-8 mb-8">
          <Menu />
          <Detail data={data} />
        </div>
        <div className="px-8">
          <List />
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const slug = context.params.slug
  return {
    props: { slug }
  }
}
