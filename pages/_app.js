import '../styles/tailwind.css'
import '../styles/style.css'
import 'swiper/swiper.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'pretty-checkbox/dist/pretty-checkbox.min.css'

import { ToastContainer, toast } from 'react-toastify'
import useFetch, { Provider } from 'use-http'
import { useLocalStorage } from 'react-use'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useLocalStorage('access_token')
  const router = useRouter()
  const globalOptions = {
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': token,
    },
		interceptors: {
      request: ({ options }) => {
        options.headers.Accept = 'application/json, text/plain, */*'
        return options
      },
      response: ({ response }) => {
        let res = response.data
        if (response.status === 401) {
          router.push('/login')
          setToken(false)
          return;
        }
        if (response.status >= 400) {
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          res.data = response.data
        }
        if (!res.data) {
          res.data = response.data
        }
        return res
      }
    }
	}
  return (
    <Provider url="https://api.toqoquu.xyz/api" options={globalOptions}>
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  )
}

export default MyApp
