import * as S from './Button.style'

type ButtonProps = {
  children: React.ReactNode
  btnType: 'primary' | 'normal'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children, btnType = 'normal', ...props }: ButtonProps) => {
  return (
    <S.Button
      btnType={btnType}
      {...props}
    >
      {children}
    </S.Button>
  )
}

export default Button
