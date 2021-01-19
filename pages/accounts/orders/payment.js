import Link from 'next/link'
import Layout from '../../../components/Layout'
import ContentHeader from '../../../components/ContentHeader'
import Related from '../../../components/accounts/Related'

export default function notification() {
  const address = {
    name: 'Ardian Riawan',
    phone: '+62 3232 1234',
    address: 'Jl. Semesta Pamekasan Timur 23, Jakarta Selatan',
  }
  const items = [
    {
      number: 'INV12121-121212',
      price: 'Rp. 250.000',
      courier: 'JNE',
      shipping: 'Rp. 22.000',
      total: 'Rp. 277.000',
    }
  ]

  return (
    <Layout>
      <div className="mx-auto max-w-screen-lg px-6">
        <div>
          <h3 className="px-12 mb-4">
            Segera Lakukan Pembayaran
          </h3>
          <div className="p-6 bg-blue-100 rounded-lg mb-6">
            <div className="flex space-x-4">
              <div className="w-1/3">
                <div className="p-6 bg-yellow-100 bg-opacity-50 rounded-lg text-center">
                  <span className="block mb-2">
                    Nomor Pesanan Anda
                  </span>
                  <div className="flex justify-center space-x-2 text-xs">
                    <span>INV12121-121212</span>
                    <a href="#" className="text-red-500">Salin</a>
                  </div>
                </div>
              </div>
              <div className="w-2/3">
                <div className="p-6 bg-yellow-100 bg-opacity-75 rounded-lg text-center">
                  <div className="flex space-x-3 justify-center mb-2">
                    <span>No Rek Pembayaran BCA: 0123 456 789</span>
                    <a href="#" className="text-red-500">Salin</a>
                  </div>
                  <div className="flex justify-center space-x-2 text-xs">
                    <span>an: PT lorem Ipsum</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-24">
            <div className="max-w-sm w-full mx-auto bg-red-100 rounded-lg mb-4">
              <div className="text-center">
                <span className="inline-block w-64 py-1 bg-red-400 text-white rounded-lg">
                  Total Tagihan
                </span>
              </div>
              <div className="py-6 text-center">
                <div className="text-4xl">
                  Rp 100.<span className="text-red-400">123</span>
                </div>
                <a href="#" className="text-red-500">Salin</a>
              </div>
              <div className="w-64 mx-auto text-xs text-center text-gray-700 pb-2">
                Wajib untuk memasukan angka tepat seperti yang tertera diatas untuk memudahkan proses konfirmasi.
              </div>
            </div>
            <div className="text-center mb-4">
              <Link href="/accounts/orders/1">
                <a className="text-center px-6 py-1 w-64 bg-red-400 rounded-lg text-white inline-block hover:bg-red-300">
                  Lanjutkan Pembayaran
                </a>
              </Link>
            </div>
            <div className="text-center">
              <Link href="/accounts/orders/1">
                <a className="text-center px-6 py-1 w-64 bg-blue-200 rounded-lg inline-block hover:bg-blue-100">
                  Butuh Bantuan?
                </a>
              </Link>
            </div>
          </div>
        </div>
        <Related />
      </div>
    </Layout>
  )
}
