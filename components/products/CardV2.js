import Link from 'next/link'

export default function CardV2(props) {
  const { image, discount, title, link, id } = props
  return (
    <>
      <div className="text-center">
        <Link href={`/products/view/${id}`}>
          <a className="mb-2 block">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="h-32 overflow-hidden">
                <img
                  src={image || 'https://via.placeholder.com/200x200.png/1D5C73/fff'}
                  className="max-w-full object-cover"
                />
              </div>
              <div className="absolute top-0 right-0 inline-block bg-yellow-100 text-red-700 p-2 rounded-full uppercase">
                {discount}
                <span className="block">Off</span>
              </div>
            </div>
          </a>
        </Link>
        <h3 className="mb-2">{title}</h3>
        <Link href={`/products/view/${id}`}>
          <a
            className="h-8 bg-red-600 text-white flex items-center justify-center text-sm rounded-xl hover:bg-red-500"
          >
            Beli Sekarang
          </a>
        </Link>
      </div>
    </>
  )
}
