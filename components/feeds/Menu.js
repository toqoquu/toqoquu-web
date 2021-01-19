
import Carousel, { consts } from 'react-elastic-carousel'
import ContentHeader from '../ContentHeader'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function feedMenu(props) {
  const feedOptions = [
    { label: 'Timeline', icon: '', link: 'a', color: 'bg-red-300' },
    { label: 'Explore', icon: '', link: 'b', color: 'bg-pink-300' },
    { label: 'Fashion', icon: '', link: 'c', color: 'bg-green-300' },
    { label: 'Giveaway', icon: '', link: '', color: 'bg-red-500' },
    { label: 'Cashback', icon: '', link: '', color: 'bg-yellow-300' },
    { label: 'Voucher', icon: '', link: '', color: 'bg-red-300' },
    { label: 'Voucher', icon: '', link: '', color: 'bg-red-300' },
    { label: 'Voucher', icon: '', link: '', color: 'bg-red-300' },
    { label: 'Voucher', icon: '', link: '', color: 'bg-red-300' },
    { label: 'Voucher', icon: '', link: '', color: 'bg-red-300' },
    { label: 'Voucher', icon: '', link: '', color: 'bg-red-300' },
  ]
  const carouselArrow = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? '<' : '>'
    return (
      <button onClick={onClick} disabled={isEdge} className="outline-none">
        {pointer}
      </button>
    )
  }
  return (
    <>
      <ContentHeader title="Feed" />
      <div className="mb-4 bg-blue-100 rounded-3xl p-2">
        <Swiper
          spaceBetween={20}
          spaceBetween={1}
          slidesPerView={3}
          loop={true}
          breakpoints={{
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 10,
            }
          }}
        >
          {feedOptions.map(({ label, icon, link, color}, idx) => (
            <SwiperSlide key={idx}>
              <div key={idx} className={`bg-red-400 text-white rounded-full px-4 py-1 outline-none ${color}`}>
                <div className="flex items-center">
                  <span className="mr-2">{label}</span>
                  <span className="inline-block rounded-full w-6 h-6 bg-white ml-auto" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}
