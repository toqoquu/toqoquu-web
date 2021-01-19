import Placeload from '../components/Placeload'
import  * as api from '../lib/api'
import { take } from 'lodash'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function Banner() {
  const { data, loading } = api.banners.find()
  return (
    <>
      {loading ? (
        <div className="grid grid-cols-3 gap-3">
          {[...Array(3).keys()].map(idx => (
            <div key={idx}>
              <Placeload height="200px" />
            </div>
          ))}
        </div>
      ) : (
        <Swiper
          spaceBetween={20}
          spaceBetween={1}
          loop={true}
          breakpoints={{
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            }
          }}
        >
          {data?.map(({ id, url }, idx) => (
            <SwiperSlide key={id}>
              <a href="#">
                <img
                  src={url}
                  className="w-full h-48 md:h-64 md:rounded-2xl object-cover"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  )
}
