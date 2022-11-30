import * as S from './Input.style'

type InputProps = {
  label: string
  showError?: any
  errorMessage?: any
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ label, showError = false, errorMessage = '', ...props }: InputProps) => {
  return (
    <S.Container>
      <S.Label htmlFor={props.name}>{label}</S.Label>
      <S.InputContainer>
        <S.Input
          showError={showError}
          autoComplete='off'
          id={props.name}
          {...props}
        />
        {showError && <S.Error>{errorMessage}</S.Error>}
      </S.InputContainer>
    </S.Container>
  )
}

export default Input
