import styled from 'styled-components'
import colors from '../../../../styles/Colors.style'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  width: 100%;
`

export const Label = styled.label`
  font-weight: 700;
  font-size: 1.1rem;
`

export const InputContainer = styled.div`
  width: 100%;
`

export const Select = styled.select`
  border: 1px solid #4f4f4f;
  background-color: ${colors.uiBackground1};
  border-radius: 5px;
  padding: 11px 21px;
  color: #737373;
  width: 100%;

  &:disabled {
    background-color: #f5f5f5;
    color: #4f4f4f;
  }
`

export const Option = styled.option``

export const Error = styled.span`
  display: block;
  color: red;
  font-size: 0.75rem;
  margin-top: 3px;
`
