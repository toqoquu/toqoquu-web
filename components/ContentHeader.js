export default function contentHeader(props) {
  return (
    <div className="flex flex-wrap justify-center md:justify-start mb-5 relative items-center">
      <h3
        className="bg-red-400 text-white w-64 rounded-xl h-10 flex items-center px-4 justify-center md:justify-start"
      >
        {props.title}
      </h3>
      {props.children}
    </div>
  )
}
