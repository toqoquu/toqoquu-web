export default function Radio(props) {
  const { name = null, value = null, update = () => null } = props
  return (
    <div className="pretty p-default p-curve p-fill">
      <input
        type="radio"
        name="gender"
        value="Perempuan"
        onClick={(e) => setStateItem('jenis_kelamin', e.target.value)}
      />
      <div className="state p-info">
        <label>Perempuan</label>
      </div>
    </div>
  )
}
