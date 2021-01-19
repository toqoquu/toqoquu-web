import Link from 'next/link'
import rp from '@/utils/rp'
import MaterialIcon from '@material/react-material-icon'
import className from 'classnames'

export default function CardV2(props) {
  const {
    id,
    image,
    discount,
    title,
    link,
    priceBefore,
    price,
    store,
    like,
    storeLocation,
    cashback,
    clickLike = (e) => e,
  } = props

  const _clickLike = (e, like) => {
    e.preventDefault()
    clickLike(like)
  }
  return (
    <>
      <div className="text-right bg-red-100 rounded-2xl overflow-hidden relative pb-10">
        <Link href={`/products/view/${id}`}>
          <a className="mb-2 block">
            <div className="relative">
              <div className="mb-2 relative overflow-hidden">
                <img
                  src={image || 'https://via.placeholder.com/200x200.png/1D5C73/fff'}
                  className="w-full h-32 rounded-2xl object-cover"
                />
                {cashback ? (
                  <span className="absolute bg-red h-8 flex items-center bottom-0 bg-red-500 left-0 right-0 px-2 text-white">
                    Cashback {rp(cashback)}
                  </span>): ''
                  }
              </div>
              <div className="absolute top-0 right-0 inline-block bg-yellow-100 text-red-700 p-2 rounded-full uppercase">
                {discount}
                <span className="block">Off</span>
              </div>
            </div>
            <div className="px-2">
              <h3 className="truncate">{title}</h3>
              <div className="flex text-sm space-x-1 justify-end">
                {priceBefore &&
                  <span className="line-through">{rp(priceBefore)}</span>
                }
                <span className="text-red-500">{rp(price)}</span>
              </div>
              <div>{store}</div>
              <div className="flex items-center absolute left-0 right-0 bottom-0 px-2 py-2">
                <span
                  className="flex w-8 h-8 rounded-full flex items-center justify-center bg-white cursor-pointer"
                  onClick={(e) => _clickLike(e, like)}
                >
                  <MaterialIcon icon="favorite" className={{ "text-lg": true, 'text-red-500': like }} />
                </span>
                <span className="ml-auto">
                  {storeLocation}
                </span>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </>
  )
}
