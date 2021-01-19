export default function Overlay({ show }) {
  return (
    <div className={`absolute top-0 bottom-0 left-0 right-0 bg-white bg-opacity-50 z-10 ${show ? 'block' : 'hidden'}`} />
  )
}
