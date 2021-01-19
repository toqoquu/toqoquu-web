import Placeload from '../components/Placeload'
import  * as api from '../lib/api'
import { take, takeRight } from 'lodash'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function Feature() {
  const { data, loading } = api.banners.find()
  const _right = takeRight(data)

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[...Array(5).keys()].map(idx => (
            <Placeload key={idx} height="200px" />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap -mx-1">
          <div className="w-full md:w-2/3 px-1">
            <div className={'md:rounded-3xl md:rounded-lg overflow-auto'}>
              <Swiper
                spaceBetween={20}
                spaceBetween={5}
                slidesPerView={1}
                breakpoints={{
                  480: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  }
                }}
              >
                {data.map(({ url, id }) => (
                  <SwiperSlide key={id}>
                    <div
                      className="md:rounded-lg bg-gray-800 w-full"

                    >
                      <a href="#">
                        <img
                          src={url}
                          className="w-full object-cover h-48 md:h-64"
                        />
                      </a>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="hidden md:block w-1/3 px-1">
            {_right.map(({ url, id }) => (
              <div
                key={id}
                className="overflow-hidden h-64 items-center rounded-2xl bg-center flex items-center bg-gray-800"

              >
                <a href="#" className="object-cover">
                  <img
                    src={url}
                    className="object-cover h-64"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
