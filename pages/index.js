import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import ContentHeader from '../components/ContentHeader'
import BestSeller from '../components/products/BestSeller'
import Recomended from '../components/products/Recomended'
import Placeload from '../components/Placeload'
import { Banner, Sale, Category, Hit, CategoryType, Feature } from '../components'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function Home({ isClient }) {
  const [cat, setCat] = useState('list')

  const topIcons = [
    { label: 'Men Sale', icon: '/top-icon/men-sale.png', link: 'products/list-type-category/1?type=terbaru' },
    { label: 'Women Sale', icon: '/top-icon/women-sale.png', link: 'products/list-type-category/2?type=terbaru' },
    { label: 'Promo', icon: '/top-icon/discount.png', link: 'products/Product-Gratis-Ongkir?type=terbaru' },
    { label: 'Brand New', icon: '/top-icon/brand-new.png', link: 'products/Product-Brand-Baru?type=terbaru' },
    { label: 'Brand Local', icon: '/top-icon/brand-local.png', link: 'products/Product-Brand-Baru?type=terbaru' },
    { label: 'Brand Import', icon: '/top-icon/brand-import.png', link: 'products/Product-Brand-Baru?type=terbaru' },
    { label: 'Cashback', icon: '/top-icon/cashback.png', link: 'products/Product-Casback?type=terbaru' },
    { label: 'Gratis Ongkir', icon: '/top-icon/free-shipping.png', link: 'products/Product-Gratis-Ongkir?type=terbaru' },
    { label: 'COD', icon: '/top-icon/cod.png', link: 'products/Product-COD?type=terbaru' },
    { label: 'Koin Loyalty', icon: '/top-icon/coin.png', link: 'accounts/coins' },
  ]

  return (
    <Layout>
      <div className="mx-auto max-w-screen-xl md:px-6">
        <div className="bg-yellow-100 bg-opacity-50 rounded-xl md:py-4 md:px-8">
          <Feature />
          <div className="py-8 px-3 md:px-10">
            <Swiper
              spaceBetween={20}
              spaceBetween={5}
              slidesPerView={4}
              breakpoints={{
                480: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 10,
                  spaceBetween: 10,
                }
              }}
            >
              {topIcons.map(({ label, icon, link }, idx) => (
                <SwiperSlide key={idx}>
                  <div className="text-center transition-all duration-300 hover:bg-yellow-100 rounded">
                    <Link href={`/${link}`}>
                      <a>
                        <div className="h-16 overflow-hidden">
                          <img
                            src={icon}
                            alt={label}
                            className="w-16 block mb-2 h-auto mx-auto"
                          />
                        </div>
                        <span style={ {fontSize: '10px' } } className="leading-none">
                          {label}
                        </span>
                      </a>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div>
            <Banner />
          </div>
        </div>
        <div className="py-8 md:px-8">
          <ContentHeader title="Kategori">
            <div className="relative mt-4 md:mt-0 md:absolute left-0 right-0 flex justify-center">
              <div className="relative inline-flex space-x-16 text-lg">
                <CategoryType click={(e) => setCat(e)} />
              </div>
            </div>
          </ContentHeader>
          <div className="grid grid-cols-4 md:grid-cols-12 gap-1">
            <Category path={cat} />
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl py-4 md:px-8 mb-8">
          <div className="px-6 md:px-0">
            <div className="md:flex justify-center items-center py-2 px-3 bg-red-600 text-white mb-5 rounded-2xl relative">
              <h3 className="text-center uppercase font-semibold">Flazzzhaleee</h3>
              <div className="relative text-center mt-2 md:mt-0 md:absolute right-0 flex space-x-2 mr-8 justify-center">
                <span className="bg-white inline-block text-black rounded-lg px-2">01</span>
                <span className="bg-white inline-block text-black rounded-lg px-2">01</span>
                <span className="bg-white inline-block text-black rounded-lg px-2">01</span>
              </div>
            </div>
          </div>
          <div className="px-6 md:px-0">
            <Sale />
          </div>
          <Banner />
        </div>
        <div className="md:px-8 mb-8">
          <BestSeller />
        </div>
        <div className="px-8 mb-8">
          <ContentHeader title="Produk Hits" />
          <Hit />
        </div>
        <div className="px-8 mb-8">
          <ContentHeader title="Produk Rekomendasi" />
          <Recomended />
        </div>
      </div>
    </Layout>
  )
}

// export async function getStaticProps() {
//   const categories = await fetchAPI('/Category/list')
//   console.log(categories, 'xxx')
//   return {
//     props: { categories },
//   }
// }
