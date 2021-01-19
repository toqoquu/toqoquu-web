import Link from 'next/link'
import { useLocalStorage } from 'react-use'
import useFetch from 'use-http'

export default function header(props) {
  const [token, setToken] = useLocalStorage('access_token', '')

  const { showMenus } = props
  const leftNav = [
    { label: 'Jual', link: '#' },
    { label: 'Ikuti Kami', link: '#' },
    { label: 'Download', link: '#' },
  ]

  const rightNav = [
    { label: 'Daftar', link: 'register' },
    { label: 'Masuk', link: 'login' },
  ]

  const menus = [
    { label: 'Love', link: '/accounts/favorites', icon: '/menu/love.jpg' },
    { label: 'Feed', link: '/feeds', icon: '/menu/feed.jpg' },
    { label: 'Chat', link: '/accounts/chat', icon: '/menu/chat.jpg' },
    { label: 'Notification', link: '/accounts/notifications', icon: '/menu/notification.jpg' },
    { label: 'Profile', link: '/accounts/profile', icon: '/menu/profile.jpg' },
    { label: 'Help', link: '/help', icon: '/menu/help.jpg' },
    { label: 'Cart', link: '/cart', icon: '/menu/cart.jpg' },
  ]

  const { get: signOut } = useFetch('/auth/logout')
  const logout =  async (e) => {
    e.preventDefault()
    await signOut()
    setToken(false)
    window.location.href = '/'
  }

  const RenderMenu = () => {
    if (process.browser) {
      if (token) {
        return <a href="#" className="text-white hover:underline text-sm" onClick={(e) => logout(e)}>Logout</a>
      } else {
        return (
          <>
            <Link href="/register">
              <a className="text-white hover:underline text-sm">Register</a>
            </Link>
            <Link href="/login">
              <a className="text-white hover:underline text-sm">Login</a>
            </Link>
          </>
        )
      }
    }
    return ""
  }

  return (
    <div className="mb-1">
      <div className="bg-red-400 py-4 relative">
        <div className="max-w-screen-lg mx-auto px-6">
          <div className="flex flex-wrap h-20 -mx-6">
            <div className="hidden md:block md:w-1/3 px-6">
              <div className="flex space-x-4">
                {leftNav.map(({ label, link}) => (
                  <a key={label} href={link} className="text-white hover:underline text-sm">{label}</a>
                ))}
              </div>
            </div>
            <div className="max-w-full-sm mx-auto md:w-1/3 px-6">
              <div className="flex items-center justify-center">
                <Link href="/">
                  <a>
                    <img src="/logo.png" className="w-64 h-auto relative z-10 hover:opacity-75" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3 px-6">
              <div className="space-x-4 justify-end items-end flex">
                <RenderMenu />
              </div>
            </div>
          </div>
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              className="w-full block outline-none h-10 px-3 rounded-full text-sm text-gray-600 border border-black relative z-10"
              placeholder="Search product"
            />
          </div>
        </div>
      </div>
      { showMenus &&
        <div className="grid grid-cols-7 py-4 max-w-md m-auto px-6 gap-3">
          {menus.map(({ label, link, icon }) => (
            <Link key={label} href={link}>
              <a title={label} rel="internal">
                <img src={icon} alt={label} className="w-10 h-auto rounded-lg hover:opacity-75" />
              </a>
            </Link>
          ))}
        </div>
      }
    </div>
  )
}
