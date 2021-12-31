import React from 'react'
import Input from './Input'
import Textarea from './Textarea'
import Select from './Select'
import RadioButtons from './RadioButtons'
import CheckboxGroup from './CheckboxGroup'
import FieldList from './FieldList.js'
import FieldListPair from './FieldListPair.js'

function FormikControl(props) {
  const { control, ...rest } = props
  switch (control) {
    case 'input':
      return <Input {...rest} />
    case 'textarea':
      return <Textarea {...rest} />
    case 'select':
      return <Select {...rest} />
    case 'radio':
      return <RadioButtons {...rest} />
    case 'checkbox':
      return <CheckboxGroup {...rest} />
    case 'fieldList':
      return <FieldList {...rest} />
    case 'fieldListPair':
      return <FieldListPair {...rest} />
    default:
      return null
  }
}

export default FormikControl
