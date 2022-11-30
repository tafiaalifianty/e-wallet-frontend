import { useFormik } from 'formik'
import * as S from './Form.style'
import Input from './Input'
import Dropdown, { DropdownOptions } from './Dropdown'
import Button from '../Button'

export interface FormFieldConfig {
  name: string
  label: string
  type: 'dropdown' | 'input'
  inputType?: string
  options?: DropdownOptions[]
  disabled?: boolean
}
interface FormProps {
  validationSchema: any
  onSubmit: (values: any) => any
  initialValues: any
  formFieldConfigs: FormFieldConfig[]
  btnText: string
  btnDisable?: boolean
}

const Form = ({
  initialValues,
  validationSchema,
  onSubmit,
  formFieldConfigs,
  btnText,
  btnDisable = false,
}: FormProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit,
  })

  const renderFields = () => {
    return formFieldConfigs.map((field) => {
      return field.type === 'input' ? (
        <Input
          key={field.name}
          label={field.label}
          name={field.name}
          onChange={formik.handleChange}
          value={formik.values[field.name]}
          onBlur={formik.handleBlur}
          showError={formik.errors[field.name]}
          errorMessage={formik.errors[field.name]}
          type={field.inputType ?? 'text'}
          disabled={field.disabled}
        />
      ) : (
        <Dropdown
          key={field.name}
          label={field.label}
          name={field.name}
          onChange={formik.handleChange}
          value={formik.values[field.name]}
          onBlur={formik.handleBlur}
          showError={formik.errors[field.name]}
          errorMessage={formik.errors[field.name]}
          options={field.options ?? []}
          disabled={field.disabled}
        />
      )
    })
  }
  return (
    <S.Form onSubmit={formik.handleSubmit}>
      {renderFields()}

      <Button
        btnType='primary'
        type='submit'
        disabled={btnDisable}
      >
        {btnText}
      </Button>
    </S.Form>
  )
}

export default Form
