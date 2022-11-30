import styled from 'styled-components'
import colors from '../../../../../styles/Colors.style'

export const TableRow = styled.tr`
  height: 48px;
`

export const TableColumn = styled.td`
  padding: 0 20px;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid ${colors.border};
`

export const IncomeText = styled.span`
  color: ${colors.income};
`
