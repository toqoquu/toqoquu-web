import Layout from '@/components/Layout'
import { InputText } from '@/components/ui'
import useFetch from 'use-http'
import { useState, createRef } from 'react'
import className from 'classnames'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function ViewTransaction({ id }) {
  const router = useRouter()
  const [item, setItem] = useState({
    nama_pemilik_rekening: '',
    nomor_rekening: '',
    nama_bank: '',
    foto: '',
    invoice_id: id,
    file_name: ''
  })
  const { get, post, loading, error } = useFetch('/Transaksi', (options) => {
    // Remove Content type from options headers
    delete options.headers['Content-Type']
    return { ...options, cachePolicy: 'no-cache' }
  })

  // Request payment confirmation.
  async function send() {
    const data = new FormData()
    data.append('nama_pemilik_rekening', item.nama_pemilik_rekening)
    data.append('nomor_rekening', item.nomor_rekening)
    data.append('nama_bank', item.nama_bank)
    data.append('invoice_id', item.invoice_id)
    data.append('foto', item.foto)
    const response = await post('/Upload-Bukti', data, { headers: { 'Content-Type': 'multipart' } })
    if (response.code === 200) {
      toast.success('Konfirmasi Terkirim', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      router.push('/accounts/notifications')
    }
  }

  const setItemState = (key, value) => {
    setItem({ ...item, [key]: value })
  }

  const setFile = (e) => {
    if (e.target.files.length) {
      setItem({
        ...item,
        file_name: e.target.files[0].name,
        foto: e.target.files[0],
      })
    }
  }

  const inputFile = createRef()

  return (
    <Layout>
      <div className="mx-auto w-full max-w-md px-3">
        <div>
          <div className="mb-2">
            <div className="mb-2">
              <span>Nama pemilik rekening</span>
            </div>
            <InputText
              value={item?.nama_pemilik_rekening}
              update={(e) => setItemState('nama_pemilik_rekening', e)}>
            </InputText>
          </div>
          <div className="mb-2">
            <div className="mb-2">
              <span>Invoice</span>
            </div>
            <InputText
              value={item?.invoice_id}
              disabled={true}
              update={(e) => setItemState('invoice_id', e)}>
            </InputText>
          </div>
          <div className="mb-2">
            <div className="mb-2">
              <span>Nomor rekening</span>
            </div>
            <InputText
              value={item?.nomor_rekening}
              update={(e) => setItemState('nomor_rekening', e)}>
            </InputText>
          </div>
          <div className="mb-2">
            <div className="mb-2">
              <span>Nama Bank</span>
            </div>
            <select
              value={item.nama_bank}
              className="w-full bg-red-100 rounded h-10 px-3 rounded-full focus:bg-red-200 border br hover:bg-red-200 border-red-200 focus:border-red-300 focus:shadow"
              onChange={e => setItemState('nama_bank', e.target.value)}
            >
              <option value="" disabled>Pilih Bank</option>
              <option value="BNI">BNI</option>
            </select>
          </div>
          <div className="mb-2 relative">
            <div className="mb-2">
              <span>File</span>
            </div>
            <InputText
              value={item?.file_name}
              disabled={true}
              update={(e) => setItemState('file_name', e)}>
            </InputText>
            <button
              className="btn bg-red-400 absolute bottom-0 right-0"
              onClick={() => inputFile.current.click()}
            >
              {item.file_name ? 'Ganti file': 'Pilih file'}
            </button>
          </div>
          <div className="mb-2 mt-4">
            <button
              disabled={loading}
              className={className({
                'btn bg-red-400 text-white w-full': true,
                'bg-opacity-25': loading,
              })}
              onClick={() => send()}
            >
              {loading? 'Mengirim' : 'Kirim bukti pembayaran'}
            </button>
          </div>
        </div>
        <input
          ref={inputFile}
          type="file"
          className="hidden"
          onChange={(e) => setFile(e)}
        />
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const id = context.params.id
  return {
    props: { id }
  }
}
