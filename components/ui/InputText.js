import className from 'classnames'
export default function InputText(props) {
  const {
    name = null,
    value = '',
    update = () => null,
    type = 'text',
    placeholder = '',
    disabled = false,
  } = props
  return (
    <div className="w-full">
      <input
        value={value}
        name={name}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        className={className({
          'w-full bg-red-100 rounded h-10 px-3 rounded-full focus:bg-red-200 border br hover:bg-red-200 border-red-200 focus:border-red-300 focus:shadow': true,
          'cursor-not-allowed bg-opacity-25 hover:bg-red-100': disabled,
          'bg-opacity-50 border-red-100': !disabled,
        })}
        onChange={(e) => update(e.target.value)}
      />
    </div>
  )
}
