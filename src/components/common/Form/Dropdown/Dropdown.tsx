import * as S from './Dropdown.style'

export interface DropdownOptions {
  value: any
  text: string
}

type DropdownProps = {
  label: string
  options: DropdownOptions[]
  showError?: any
  errorMessage?: any
} & React.SelectHTMLAttributes<HTMLSelectElement>

const Dropdown = ({
  label,
  options,
  showError = false,
  errorMessage = '',
  ...props
}: DropdownProps) => {
  const renderOptions = () => {
    return options.map((option) => (
      <S.Option
        key={option.value}
        value={option.value}
      >
        {option.text}
      </S.Option>
    ))
  }
  return (
    <S.Container>
      <S.Label htmlFor={props.name}>{label}</S.Label>
      <S.InputContainer>
        <S.Select
          autoComplete='off'
          id={props.name}
          {...props}
        >
          {renderOptions()}
        </S.Select>
        {showError && <S.Error>{errorMessage}</S.Error>}
      </S.InputContainer>
    </S.Container>
  )
}

export default Dropdown
