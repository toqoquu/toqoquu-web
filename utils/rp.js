export const rp = (str) => {
  return new Intl.NumberFormat(['id-ID'], {
    style: 'currency',
    currency: 'IDR'
  }).format(str).replace(/(\.|,)00$/g, '')
}

export default rp
