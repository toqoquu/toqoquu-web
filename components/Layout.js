import Head from 'next/head'
import Header from './Header'

export default function layout(props) {
  const prop = { showMenus: true, ...props }
  return (
    <div className="x">
      <Head>
        <title className="next-head">Toqoquu</title>
      </Head>
      <Header showMenus={prop.showMenus} />
      <div>
        {props.children}
      </div>
    </div>
  )
}
