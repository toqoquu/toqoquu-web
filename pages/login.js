import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/Layout'
import classNames from 'classnames'
import useFetch from 'use-http'
import { useLocalStorage } from 'react-use'
import { useRouter } from 'next/router'

export default function Invite() {
  const [credentials, setState] = useState({ email: '', password: '' })
  const [value, setValue] = useLocalStorage('access_token', '')
  const handleInput = (key, value) => {
    setState({ ...credentials, [key]: value })
  }

  const [request, response] = useFetch('/auth/login')

  const login = async () => {
    await request.post(credentials)
    setValue('Bearer ' + response.data?.access_token)
    if (!request.error) {
      window.location.href = '/'
    }
  }

  return (
    <Layout showMenus={false}>
      <Head>
        <title>Login | Toqoquu</title>
      </Head>
      <div className="mt-6 bg-no-repeat bg-cover bg-left bg-red-200 bg-login">
        <div className="mx-auto max-w-screen-xl flex space-x-1 py-12 px-6">
          <div className="w-full md:w-1/2">
            <div className="bg-white pt-16 pb-20 px-12 rounded-2xl relative">
              <h1 className="text-red-400 text-4xl mb-3 font-semibold text-center mb-16">Log in</h1>
              <div className="mb-12">
                <div className="mb-4">
                  <input
                    value={credentials.email}
                    type="text"
                    className="h-16 text-center text-3xl rounded-2xl bg-blue-100 bg-opacity-50 w-full"
                    placeholder="Email"
                      onInput={(e) => handleInput('email', e.target.value)}
                  />
                </div>
                <div>
                  <input
                    value={credentials.password}
                    type="password"
                    className="h-16 text-center text-3xl rounded-2xl bg-blue-100 bg-opacity-50 w-full"
                    placeholder="Password"
                    onInput={(e) => handleInput('password', e.target.value)}
                  />
                </div>
              </div>
              <div className="text-center">
                <button
                  className={classNames({
                    'bg-red-300 text-white h-16 px-16 rounded-2xl hover:bg-red-400 focus:outline-none': true,
                    'opacity-25': request.loading,
                  })}
                  disabled={request.loading}
                  onClick={login}
                >
                  {request.loading ? 'Loading...' : 'Login'}
                </button>
              </div>
              <div
                className="lg:text-2xl font-light absolute bottom-0 right-0 left-0 flex justify-center mb-4 flex items-center"
              >
                <span className="text-sm">Don't have account yet?</span>
                <Link href="/register">
                  <a className="ml-3">Register Here</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
