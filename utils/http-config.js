import { useLocalStorage } from 'react-use'
const [value] = useLocalStorage('access_token')

export default {
  interceptors: {
    request: ({ options }) => {
      options.headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': value,
      }
      return options
    },
    response: ({ response }) => {
      let res = response.data
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
