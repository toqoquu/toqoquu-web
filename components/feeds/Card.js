import Link from 'next/link'
import MaterialIcon from '@material/react-material-icon'
import { toast } from 'react-toastify'
import  * as api from '../../lib/api'

export default function feedCard(props) {
  const { image, href, fullHeight, id } = props
  const [request, response] = api.feeds.like()
  const like = async (e) => {
    e.preventDefault()
    await request.get(`/${id}`)
    const { error } = request
    if(!error) {
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }
  return (
    <div className="bg-red-500 rounded-2xl text-center pb-2 p-1 h-full relative pb-10">
      <Link href={href}>
        <a className="mb-2 h-full justify-center overflow-hidden rounded-2xl flex items-center">
          <img
            src={image}
            className="object-cover w-full"
          />
        </a>
      </Link>
      <div className="flex justify-center space-x-3 absolute bottom-0 mb-2 left-0 right-0">
        <a href="#" onClick={like}>
          <MaterialIcon
            icon="favorite"
            className="text-white"
          />
        </a>
        <MaterialIcon icon="share" className="text-white" />
      </div>
    </div>
  )
}
