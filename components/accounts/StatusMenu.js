import Link from 'next/link'

export default function StatusMenu(props) {
  const status = [
    { label: 'Belum Bayar', link: '/accounts/orders/unpaid', icon: '/status/belum-bayar-icon.png' },
    { label: 'Di Proses', link: '/accounts/orders/packed', icon: '/status/diproses-icon.png' },
    { label: 'Dikirim', link: '/accounts/orders/sent', icon: '/status/dikirim-icon.png' },
    { label: 'Sampai Tujuan', link: '/accounts/orders/received', icon: '/status/sampai-tujuan-icon.png' },
    { label: 'Penilaian', link: '/accounts/orders/unpai3d', icon: '/status/penilaian-icon.png' },
  ]
  return (
    <div className="grid grid-cols-5 gap-3">
      {status.map(({ label, link, icon }, i) => (
        <Link key={i} href={link}>
          <a className="hover:opacity-75">
            <div className="bg-white rounded-lg p-2 mb-2">
              <img src={icon} className="max-w-full" />
            </div>
            <span className="block text-center text-xs md:text-md">{label}</span>
          </a>
        </Link>
      ))}
    </div>
  )
}
