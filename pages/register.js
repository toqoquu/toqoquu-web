import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/Layout'
import classNames from 'classnames'
import useFetch from 'use-http'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function Invite() {
  const router = useRouter()
  const [credentials, setState] = useState({
    email: '',
    password: '',
    name: '',
    password_confirmation: '',
  })
  const handleInput = (key, value) => {
    setState({ ...credentials, [key]: value })
  }

  const [request, response] = useFetch('/auth/signup', { cachePolicy: 'no-cache' })

  const register = async () => {
    await request.post(credentials)
    if (!request.error) {
      toast.success('Register sukses, silahkan login.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      router.push('/login')
    }
  }

  return (
    <Layout showMenus={false}>
      <Head>
        <title>Register | Toqoquu</title>
      </Head>
      <div className="mt-6 bg-no-repeat bg-cover bg-left bg-red-200 bg-register">
        <div className="mx-auto max-w-screen-xl flex space-x-1 py-12 px-6">
          <div className="w-full md:w-1/2">
            <div className="bg-white pt-16 pb-20 px-12 rounded-2xl relative">
              <h1
                className="text-red-400 text-4xl mb-3 font-semibold text-center mb-16"
              >
                Sign Up
              </h1>
              <div className="mb-12">
              <div className="mb-4">
                  <input
                    value={credentials.name}
                    type="text"
                    className="h-16 text-center text-3xl rounded-2xl bg-blue-100 bg-opacity-50 w-full"
                    placeholder="name"
                      onInput={(e) => handleInput('name', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    value={credentials.email}
                    type="text"
                    className="h-16 text-center text-3xl rounded-2xl bg-blue-100 bg-opacity-50 w-full"
                    placeholder="Email"
                      onInput={(e) => handleInput('email', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    value={credentials.password}
                    type="password"
                    className="h-16 text-center text-3xl rounded-2xl bg-blue-100 bg-opacity-50 w-full"
                    placeholder="Password"
                    onInput={(e) => handleInput('password', e.target.value)}
                  />
                </div>
                <div>
                  <input
                    value={credentials.password_confirmation}
                    type="password"
                    className="h-16 text-center text-3xl rounded-2xl bg-blue-100 bg-opacity-50 w-full"
                    placeholder="Password Confirmation"
                    onInput={(e) => handleInput('password_confirmation', e.target.value)}
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
                  onClick={register}
                >
                  {request.loading ? 'Loading...' : 'Register'}
                </button>
              </div>
              <div
                className="lg:text-2xl font-light absolute bottom-0 right-0 left-0 flex justify-center mb-4 flex items-center"
              >
                <span className="text-sm">Already have account?</span>
                <Link href="/login">
                  <a className="ml-3">Login Here</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
