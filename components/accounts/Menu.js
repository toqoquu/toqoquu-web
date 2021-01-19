import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'

export default function AccountMenu() {
  const menus = [
    { label: 'Akun Saya', url: '/accounts/profile', color: 'bg-red-300' },
    { label: 'Alamat', url: '/accounts/addresses', color: 'bg-green-300' },
    { label: 'Password', url: '/accounts/profile', color: 'bg-red-500' },
    { label: 'Notifikasi', url: '/accounts/notifications', color: 'bg-yellow-300' },
    { label: 'Voucher Saya', url: '/accounts/voucher', color: 'bg-blue-400' },
    { label: 'Koin Loyalti', url: '/accounts/coins', color: 'bg-ref-200' },
  ]

  return (
    <Swiper
      spaceBetween={20}
      spaceBetween={1}
      slidesPerView={2}
      loop={true}
      breakpoints={{
        480: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 10,
        }
      }}
    >
      {menus?.map(({ url, color, label }, idx) => (
        <SwiperSlide key={idx}>
          <Link href={url}>
            <a>
              <div
                key={idx}
                className={`bg-red-400 hover:bg-opacity-75 text-white rounded-full px-4 py-1 outline-none ${color}`}
              >
                <div className="flex items-center justify-center">
                  <span className="mr-2">{label || ''}</span>
                </div>
              </div>
            </a>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
