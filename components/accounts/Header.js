import Link from 'next/link'

export default function profileHeader(props) {
  const { title, showMenu = true } = props
  return (
    <div className="mb-2">
      <h3 className="mb-2 text-2xl">{title}</h3>
      {showMenu &&
        <div className="max-w-lg">
          <div className="mb-3">
            <button className="btn bg-red-400 hover:bg-red-600 text-white rounded-lg">
              Pembelian
            </button>
          </div>
        </div>
      }
    </div>
  )
}
