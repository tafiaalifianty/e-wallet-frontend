import styled from 'styled-components'
import colors from '../../../styles/Colors.style'

interface ButtonProps {
  btnType: 'primary' | 'normal'
}

export const Button = styled.button<ButtonProps>`
  background-color: ${({ btnType }) => (btnType === 'primary' ? colors.primary : 'transparent')};
  color: ${({ btnType }) => (btnType === 'primary' ? colors.onPrimary : colors.primary)};
  padding: 16px 0;
  border-radius: 5px;
  font-size: 0.9rem;
  outline: none;
  border: 1px solid ${colors.primary};
  font-weight: 700;
  transition: 250ms ease-out;

  &:hover:not([disabled]) {
    cursor: pointer;
    background-color: ${({ btnType }) => (btnType === 'primary' ? 'transparent' : colors.primary)};
    color: ${({ btnType }) => (btnType === 'primary' ? colors.primary : colors.onPrimary)};
  }

  &:disabled {
    background-color: ${colors.textMuted};
    cursor: default;
  }
`
