import styled from 'styled-components'
import colors from '../../../../styles/Colors.style'

export const Table = styled.table`
  width: 100%;
`
export const TableHead = styled.thead`
  text-align: left;
`

export const TableHeadColumn = styled.th`
  padding: 20px;
  border: 1px solid ${colors.border};
`

export const TableBody = styled.tbody`
  & > *:nth-child(odd) {
    background-color: ${colors.uiBackground3};
  }
`
