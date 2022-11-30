import React from 'react'
import {
  TransactionFilterTime,
  TransactionSortBy,
  TransactionSortDirection,
} from '../../../../types/Transaction'
import Dropdown from './Dropdown'
import * as S from './Filter.style'
import Search from './Search'

const filterOptions: Array<{
  text: string
  value: TransactionFilterTime
}> = [
  {
    text: 'Last 10 Transactions',
    value: TransactionFilterTime.Last10Transactions,
  },
  { text: 'This Month', value: TransactionFilterTime.ThisMonth },
  { text: 'Last Month', value: TransactionFilterTime.LastMonth },
  { text: 'This Year', value: TransactionFilterTime.ThisYear },
  { text: 'Last Year', value: TransactionFilterTime.LastYear },
]

const sortByOptions: Array<{
  text: string
  value: TransactionSortBy
}> = [
  { text: 'Date', value: TransactionSortBy.DATE },
  { text: 'Amount', value: TransactionSortBy.AMOUNT },
]

const sortDirectionOptions: Array<{
  text: string
  value: TransactionSortDirection
}> = [
  { text: 'Descending', value: TransactionSortDirection.DESC },
  { text: 'Ascending', value: TransactionSortDirection.ASC },
]

interface FilterProps {
  handleDropdownChange: (type: any, value: any) => void
  handleSearchChange: (query: string) => void
}

const Filter = ({ handleDropdownChange, handleSearchChange }: FilterProps) => {
  return (
    <S.Container>
      <S.FilterItemContainer>
        <S.Text>Show</S.Text>
        <Dropdown
          onChange={(e) => handleDropdownChange('filterTime', e.target.value)}
          options={filterOptions}
        />
      </S.FilterItemContainer>
      <S.FilterItemContainer>
        <S.Text>Sort By</S.Text>
        <S.RightFilterContainer>
          <Dropdown
            onChange={(e) => handleDropdownChange('sortBy', e.target.value)}
            options={sortByOptions}
          />
          <Dropdown
            onChange={(e) => handleDropdownChange('sortDirection', e.target.value)}
            options={sortDirectionOptions}
          />
          <Search handleChange={handleSearchChange} />
        </S.RightFilterContainer>
      </S.FilterItemContainer>
    </S.Container>
  )
}

export default Filter
