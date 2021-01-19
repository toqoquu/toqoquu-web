import Link from 'next/link'
import ProfileCard from '@/components/accounts/ProfileCard'
import Related from '@/components/accounts/Related'
import className from 'classnames'

export default function AccountLayout(props) {
  const menus = [
    {
      label: 'Kotak Masuk',
      icon: '/contact/kotak-masuk-icon.png',
      children: [
        { label: 'Chat', url: '/accounts/chat' },
        { label: 'Ulasan Saya', url: '/accounts/profile' },
        { label: 'Pusat Bantuan', url: '/accounts/profile' },
        { label: 'Komplain Pesanan', url: '/accounts/profile' },
      ]
    },
    {
      label: 'Pembelian',
      icon: '/icons/pembelian2-icon.png',
      children: [
        { label: 'Pesanan Saya', url: '/accounts/profile' },
        { label: 'Daftar Transaksi', url: '/accounts/profile' },
        { label: 'Wishlist', url: '/accounts/favorites' },
        { label: 'Toko Favorit', url: '/accounts/profile' },
      ]
    },
  ]
  return (
    <div className="mx-auto max-w-screen-xl px-3 md:px-6">
      <div className="flex flex-wrap md:flex-nowrap md:space-x-4 mb-4 md:mb-0">
        <div className="w-full md:w-1/4">
          <ProfileCard>
            <div className="mb-6 md:mb-0">
              {menus.map(({label, icon, children}, idx) => (
                <div
                  key={idx}
                  className={className({
                    'px-12 py-6 rounded-2xl': true,
                    'bg-red-100': idx > 0,
                  })}
                >
                  <h3 className="flex items-center mb-3">
                    <img src={icon} className="mr-3 w-10" />
                    <span>{label}</span>
                  </h3>
                  {children.length &&
                    <div>
                      {children.map((child, cidx) => (
                        <Link key={cidx} href={child.url}>
                          <a className="block py-2 px-3 text-gray-700 hover:text-black">
                            {child.label}
                          </a>
                        </Link>
                      ))}
                    </div>
                  }
                </div>
              ))}
            </div>
          </ProfileCard>
        </div>
        <div className="w-full md:w-3/4">
          {props.children}
          <Related />
        </div>
      </div>
    </div>
  )
}
