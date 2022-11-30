import styled, { keyframes } from 'styled-components'
import colors from '../../../styles/Colors.style'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.div`
  border: 16px solid ${colors.textMuted};
  border-top: 16px solid ${colors.success};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`
