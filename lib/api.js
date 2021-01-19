import useFetch from 'use-http'

const getCategoriesTypes = (options = {}) =>  useFetch('/TypeCategory/list', options, [])

const getCategories = (options = {}) => useFetch('/Category/list', options, [])

const getBanners = (options = {}) =>  useFetch('/Benner/list/Active', options, [])

const getPopularProducts = (options = {}) =>  useFetch('/Product/list-populer', options, [])

const getBestSellerProducts = (options = {}) => useFetch('/Product/list-terlaris', options, [])

const getSaleProduct = (options = {}) => useFetch('Product/Product-Promo-Or-Diskon?type=terbaru', options, [])

const findFeeds = (options = []) => useFetch('/Content/list', options)

const findOneFeed = (id, options = {}, page = []) => useFetch(`Content/detail/${id}`, options, page)

const createCommentFeed = () => {

}

const likeFeed = () => useFetch(`Content/Like-Content`)

const getCarts = (options = {}) => useFetch('/Card/list', options, [])


export {
  getCategoriesTypes,
  getCategories,
  getPopularProducts,
  getBestSellerProducts,
  getSaleProduct,
  findFeeds,
  findOneFeed,
  createCommentFeed,
  likeFeed,
  getBanners,
}

const banners = {
  find: getBanners,
}

const categories = {
  find: getCategories,
  types: getCategoriesTypes,
}

const products = {
  hits: getPopularProducts,
  bestSellers: getBestSellerProducts,
  sales: getSaleProduct,
}

const feeds = {
  find: findFeeds,
  findOne: findOneFeed,
  createComment: createCommentFeed,
  like: likeFeed,
}

const carts = {
  find: getCarts,
}

export {
  categories,
  products,
  feeds,
  banners,
  carts,
}
