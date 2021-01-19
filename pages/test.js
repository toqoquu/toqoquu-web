import { InputNumber, Checkbox, InputText } from '@/components/ui'
import { useState } from 'react'

export default function test(props) {
  const [state, setState] = useState(4)
  const [checkbox, setCheckbox] = useState('')

  return (
    <div>
      <InputNumber value={state} update={(e) => setState(e)} min={1} max={10} />
      {checkbox}
      <Checkbox
        trueValue="Yes"
        falseValue="No"
        label="Yes"
        update={(e) => setCheckbox(e)}
        checked={checkbox == 'Yes'}
      />
    <InputText value={checkbox} update={(e) => setCheckbox(e)} />
    </div>
  )
}
