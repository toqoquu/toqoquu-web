import Link from 'next/link'

export default function CardV1(props) {
  const { image, discount, title, link, id } = props
  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden mb-2 pb-2">
        <div className="text-center">
          <Link href={`/products/view/${id}`}>
            <a>
              <div className="h-32 overflow-hidden rounded-2xl flex items-center mb-2">
                <img
                  src={image || 'https://via.placeholder.com/200x150.png/1D5C73/fff'}
                  className="max-w-full object-cover"
                />
              </div>
              <span className="uppercase text-lg text-red-600">{discount}</span>
            </a>
          </Link>
        </div>
      </div>
      <h3 className="text-center text-sm">{title}</h3>
    </>
  )
}
