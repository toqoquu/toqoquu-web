import Head from 'next/head'
import Layout from '../components/Layout'
import ContentHeader from '../components/ContentHeader'

export default function Help() {
  const topIcons = [
    { label: 'Akun Saya', icon: '/icons/akun-saya-icon.png', link: '#' },
    { label: 'Pembelian/Penjualan', icon: '/icons/pembelian2-icon.png', link: '#' },
    { label: 'Pembayaran', icon: '/icons/pembayaran-icon.png', link: '#' },
    { label: 'Pengiriman', icon: '/icons/pengiriman-icon.png', link: '#' },
    { label: 'Pengembalian Dana', icon: '/icons/pengembalian-dana.png', link: '#' },
    { label: 'Komplain Pesanan', icon: '/icons/komplain-pesanan-icon.png', link: '#' },
  ]

  const items = [
    { text: 'Berapa lama waktu pengiriman pesanan saya?', link: '#' },
    { text: 'Mengapa saya tidak bisa log in?', link: '#' },
    { text: 'Bagaimana cara saya membuat akun baru?', link: '#' },
    { text: 'Bagaimana cara melacak status pesanan?', link: '#' },
    { text: 'Apa itu Point Loyalti?', link: '#' },
    { text: 'Bagaimana cara mengontak Customer Care?', link: '#' },
    { text: 'Mengapa saya tidak bisa rendem Koin Loyalti?', link: '#' },
    { text: 'Mengapa saya tidak bisa menerima kode OTP?', link: '#' },
  ]

  const bannerStyle = {
    top: '50%',
    transform: 'translateY(-50%)',
  }

  return (
    <Layout>
      <div className="mb-4 relative">
        <img src="/img/complain.png" />
        <div style={bannerStyle} className="absolute left-0 right-0 px-24 flex justify-end"></div>
      </div>
      <div className="">
        <div className="text-center mb-6">
          <h1 className="font-semibold mb-6 text-lg">
            Step 1
          </h1>
          <div className="text-gray-500">
            Pilih Transaksi yang bermasalah
          </div>
        </div>
        <div className="max-w-screen-md mx-auto pb-8">
          <div className="bg-yellow-100 bg-opacity-75 rounded-lg py-3 mb-4 relative">
          <input type="checkbox" className="absolute left-0 top-0 ml-5 mt-5" />
            <div className="flex space-x-3 px-6 pl-12">
              <div className="w-2/3">
                <div className="mb-2">
                  INV/202020203023/xx/IV/232323232
                </div>
                <div className="flex space-x-4 items-center">
                  <div className="flex items-center w-1/2">
                    <a href="#" className="mr-2">
                      <img
                        src="https://via.placeholder.com/70x70.png/1D5C73/fff"
                        className="max-w-full rounded"
                      />
                    </a>
                    <div className="w-full">
                      <span className="text-xs">Nama Toko</span>
                      <div className="bg-gray-300 rounded-lg h-8 w-full">
                      </div>
                    </div>
                  </div>
                  <div className="text-xs w-1/2">
                    <a href="#" className="block mb-2">Chat Toko</a>
                    <a href="#" className="block">Kunjungi Toko</a>
                  </div>
                </div>
              </div>
              <div className="text-right w-1/3">
                12 Apr 2020
              </div>
            </div>
            <div className="px-6 mt-3">
              <div className="bg-white rounded-lg p-6">
                <div className="flex mb-8">
                  <div className="flex items-center w-1/2">
                    <a href="#" className="mr-2">
                      <img
                        src="https://via.placeholder.com/70x70.png/1D5C73/fff"
                        className="max-w-full rounded"
                      />
                    </a>
                    <div className="w-full">
                      <span>Nama Produk</span>
                      <div>Deskripsi Produk</div>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div className="flex space-x-6">
                      <span className="text-xs text-gray-600">
                        Total Pesanan
                      </span>
                      <div className="text-red-400">
                        Rp. 54.000
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 items-center">
                  <div className="w-2/3 flex space-x-2 items-center">
                    <img src="/status/dikirim-icon.png" className="w-12" />
                    <span className="text-xs">
                      Paket telah sampai ditujuan
                    </span>
                    <span className="bg-blue-100 rounded-full inline-block p-1 px-2 text-xs">
                      Terkikirim
                    </span>
                  </div>
                  <div className="w-1/3 text-right">
                    <a href="#" className="ml-auto text-white bg-red-400 inline-block px-2 py-1 text-xs rounded-full">
                      Konfirmasi Pesanan diterima
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-4">
            <a href="#" className="bg-red-400 w-16 py-1 rounded-full text-center text-white">1</a>
            <a href="#" className="w-16 py-1 rounded-full text-center">2</a>
            <a href="#" className="w-16 py-1 rounded-full text-center">3</a>
            <a href="#" className="w-16 py-1 rounded-full text-center">4</a>
            <a href="#" className="w-16 py-1 rounded-full text-center">5</a>
          </div>
        </div>
      </div>
    </Layout>
  )
}
