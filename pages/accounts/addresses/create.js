import Layout from '@/components/Layout'
import ProfileLayout from '@/components/accounts/Layout'
import { useEffect, useState } from 'react'
import useFetch from 'use-http'
import { InputText } from '@/components/ui'
import { useRouter } from 'next/router'
import className from 'classnames'

export default function favorites() {
  const router = useRouter()
  const [address = {}, setAddress] = useState({})

  const [provinces = [], setProvinces] = useState([])
  const [cities = [], setCities] = useState([])
  const [districts = [], setDistricts] = useState([])
  const [subDistricts = [], setSubDistricts] = useState([])

  const { post, get, loading, error } = useFetch('/Alamat', { cachePolicy: 'no-cache' })

  const create = async () => {
    const res = await post('/create', address)
    if (res.code < 400) {
      router.push('/accounts/addresses')
    }
  }

  const getProvinces = async () => {
    const res = await get('/provisi')
    setProvinces(res)
  }

  const getCities = async (province) => {
    const res = await get(`/kabupaten/${province}`)
    setCities(res)
  }

  const getDistricts = async (city) => {
    if (!city) return
    const res = await get(`/kecamatan/${city}`)
    setDistricts(res)
  }

  const getSudistricts = async (district) => {
    if (!district) return
    const res = await get(`/kelurahan/${district}`)
    setSubDistricts(res)
  }

  const setAddressState = (key, value) => {
    setAddress({ ...address, [key]: value })
  }

  useEffect(() => {
    getProvinces()
  }, [])

  useEffect(() => {
    setAddressState('kota', '')
    getCities(address.provinsi)
  }, [address.provinsi])

  useEffect(() => {
    setAddressState('kecamatan', '')
    getDistricts(address.kota)
  }, [address.kota])

  useEffect(() => {
    setAddressState('kelurahan', '')
    getSudistricts(address.kecamatan)
  }, [address.kecamatan])

  const Select = ({ value, options = [], placeholder = '', onChange = function() {} }) => {
    return (
      <select
        value={value}
        placeholder={placeholder || 'Pilih'}
        className="w-full bg-red-100 rounded h-10 px-3 rounded-full focus:bg-red-200 border br hover:bg-red-200 border-red-200 focus:border-red-300 focus:shadow"
        onChange={e => onChange(e.target.value)}
      >
        <option disabled value="">Pilih</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    )
  }

  return (
    <Layout>
      <ProfileLayout>
        <div className="pr-16">
          <div>
            <div className="flex items-center">
              <h3 className="mb-3 text-xl mt-3">Tambah Alamat</h3>
            </div>
            <div className="mb-4 relative w-full md:max-w-lg">
              <div className="mb-3">
                <div className="mb-2">
                  <span>Judul Alamat</span>
                </div>
                <InputText
                  value={address?.judul_alamat}
                  placeholder="Judul alamat"
                  update={(e) => setAddressState('judul_alamat', e)}>
                </InputText>
              </div>
              <div className="mb-3">
                <div className="mb-2">
                  <span>Nama Penerima</span>
                </div>
                <InputText
                  value={address?.nama_penerima}
                  placeholder="Nama Penerima"
                  update={(e) => setAddressState('nama_penerima', e)}>
                </InputText>
              </div>
              <div className="mb-3">
                <div className="mb-2">
                  <span>Alamat</span>
                </div>
                <InputText
                  value={address?.alamat}
                  placeholder="Alamat"
                  update={(e) => setAddressState('alamat', e)}>
                </InputText>
              </div>
              <div className="mb-3">
                <div className="mb-2">
                  <span>Provinsi</span>
                </div>
                <Select
                  value={address.provinsi || ''}
                  options={provinces.map((o) => {
                    return { value: o.id, label: o.name }
                  })}
                  onChange={(e) => setAddressState('provinsi', e)}
                />
              </div>
              <div className="mb-3">
                <div className="mb-2">
                  <span>Kota</span> {address.kota} {address.kecamatan} {address.provinsi}
                </div>
                <Select
                  value={address.kota || ''}
                  options={cities.map((o) => {
                    return { value: o.id, label: o.name }
                  })}
                  onChange={(e) => setAddressState('kota', e)}
                />
              </div>
              <div className="mb-3">
                <div className="mb-2">
                  <span>Kecamatan</span>
                </div>
                <Select
                  value={address.kecamatan || ''}
                  options={districts.map((o) => {
                    return { value: o.id, label: o.name }
                  })}
                  onChange={(e) => setAddressState('kecamatan', e)}
                />
              </div>
              <div className="mb-3">
                <div className="mb-2">
                  <span>Kelurahan</span>
                </div>
                <Select
                  value={address.kelurahan || ''}
                  options={subDistricts.map((o) => {
                    return { value: o.id, label: o.name }
                  })}
                  onChange={(e) => setAddressState('kelurahan', e)}
                />
              </div>
              <div className="mb-3">
                <div className="mb-2">
                  <span>Kode Pos</span>
                </div>
                <InputText
                  value={address?.kode_pos}
                  placeholder="Kode Pos"
                  update={(e) => setAddressState('kode_pos', e)}>
                </InputText>
              </div>
              <div className="mb-3">
                <div className="mb-2">
                  <span>Patokan</span>
                </div>
                <InputText
                  value={address?.patokan}
                  placeholder="Patokan"
                  update={(e) => setAddressState('patokan', e)}>
                </InputText>
              </div>
              <div className="mb-3">
                <div className="mb-2">
                  <span>Telepon</span>
                </div>
                <InputText
                  value={address?.nomor_hp}
                  placeholder="Telepon"
                  update={(e) => setAddressState('nomor_hp', e)}>
                </InputText>
              </div>
              <div className="text-right mb-5">
                <button
                  className={className({
                    'btn bg-red-500 text-white w-32': true,
                    'opacity-50': loading,
                  })}
                  disabled={loading}
                  onClick={() => create()}>
                  {loading ? 'loading...': 'Simpan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </ProfileLayout>
    </Layout>
  )
}
