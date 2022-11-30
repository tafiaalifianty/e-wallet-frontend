import styled from 'styled-components'
import colors from '../../../../../styles/Colors.style'

export const Container = styled.div`
  padding: 17px 25px;
  border-radius: 5px;
  background-color: ${colors.uiBackground2};
  border: 1px solid #ddd;
  color: #737373;
  display: flex;
  align-items: center;
  gap: 20px;
`

export const Input = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
`
