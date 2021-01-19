import Link from 'next/link'
import Star from '@/components/Star'
import MaterialIcon from '@material/react-material-icon'
import { useMount } from 'react-use'
import useFetch from 'use-http'
import { useState, createRef } from 'react'
import { useLocalStorage } from 'react-use'
import { useRouter } from 'next/router'

export default function profileCard(props) {
  const router = useRouter()
  const [data, setData] = useState({})

  const { get, post, loading, error } = useFetch('/auth', (options) => {
    // Remove Content type from options headers
    delete options.headers['Content-Type']
    return { ...options, cachePolicy: 'no-cache' }
  })

  // Load init data from /auth/GetProfile.
  async function loadData() {
    const profil = await get('/GetProfile')
    setData({ ...data, ...profil })
  }

  // Request update profile photo.
  async function updatePhoto(file) {
    const data = new FormData()
    data.append('foto', file)
    await post('/Update-Foto', data, { headers: { 'Content-Type': 'multipart' } })
    loadData()
  }

  // Logout
  const { get: signOut } = useFetch('/auth/logout')
  const [token, setToken] = useLocalStorage('access_token')
  const logout =  async (e) => {
    e.preventDefault()
    await signOut()
    setToken(false)
    router.push('/')
  }

  useMount(() => { loadData() }, [])

  const inputFile = createRef()

  return (
    <div>
      <input className="hidden" type="file" ref={inputFile} onChange={(e) => updatePhoto(e.target.files[0])} />
      <div className="bg-red-600 rounded-lg overflow-hidden mb-4">
        <div className="bg-blue-200 p-4 text-center relative">
          {data?.foto && <img src={data.foto} className={`w-64 h-64 object-cover rounded-full mx-auto ${loading ? 'opacity-50' : ''}`} />}
          <span>{data?.name}</span>
          <span
            className="w-8 h-8 inline-block bg-white rounded-full absolute top-0 right-0 mr-4 mt-4 flex justify-center items-center cursor-pointer"
            onClick={() => inputFile.current.click()}
          >
            <MaterialIcon icon="edit" />
          </span>
        </div>
        <div className="px-3 py-4">
          <Link href="/accounts/profile">
            <a
              className="bg-white rounded-3xl text-center flex h-8 w-full justify-center items-center hover:bg-opacity-75"
            >
              Edit Akun
            </a>
          </Link>
          <a
            href="#"
            className="bg-white block mt-3 rounded-3xl text-center flex h-8 w-full justify-center items-center hover:bg-opacity-75"
            onClick={(e) => logout(e)}
          >
            Logout
          </a>
        </div>
      </div>
      <div className="bg-gray-200 px-3 py-4 mb-4 rounded-lg overflow-hidden text-center">
        <span className="block mb-3">Level Member</span>
        <Star value={data?.rating?.toFixed(0)} />
      </div>
      <div className="flex space-x-1">
        <div className="w-3/5">
          <div className="bg-red-100 rounded-lg py-2 px-3">
            <div>
              <img src="/icons/logo-ovo-icon.png" className="w-12" />
            </div>
            <div className="flex">
              <span>Ovo Cash</span>
              <span className="ml-auto">100.000</span>
            </div>
            <div className="flex">
              <span>Ovo Cash</span>
              <span className="ml-auto">100.000</span>
            </div>
            <a href="#" className="text-red-500 block text-center">Aktivasi</a>
          </div>
        </div>
        <div className="w-2/5">
          <div className="bg-blue-100 rounded-lg py-2 px-3 h-full">
            <div className="text-center">
              <img src="/icons/koin-saya-icon.png" className="w-12 mx-auto block" />
              <span className="block mt-2">Koin Loyalty</span>
              <span className="text-2xl">{data?.point_loyalty}</span>
            </div>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  )
}
