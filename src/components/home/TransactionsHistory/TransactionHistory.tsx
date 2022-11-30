import Spinner from '../../../components/common/Spinner'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import useAppSelector from '../../../hooks/useAppSelector'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { getTransactions } from '../../../store/slices/transactionSlice'
import Transaction, {
  TransactionFilterTime,
  TransactionSortBy,
  TransactionSortDirection,
} from '../../../types/Transaction'
import Filter from './Filter'
import Table from './Table'
import * as S from './TransactionHistory.style'

const TransactionsHistory = () => {
  const { transactions, error, loading } = useAppSelector((state) => state.transactions)
  const dispatch = useAppDispatch()
  const [filterType, setFilterType] = useState({
    filterTime: TransactionFilterTime.Last10Transactions,
    sortBy: TransactionSortBy.DATE,
    sortDirection: TransactionSortDirection.DESC,
    search: '',
  })
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions)

  useEffect(() => {
    dispatch(getTransactions())
  }, [])

  useEffect(() => {
    let filtered: Transaction[] = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(filterType.search.toLowerCase())
    )
    switch (filterType.filterTime) {
      case TransactionFilterTime.ThisMonth:
        filtered = filtered.filter((transaction) => {
          return (
            moment(transaction.date).format('MMMM') === moment().format('MMMM') &&
            moment(transaction.date).format('YYYY') === moment().format('YYYY')
          )
        })
        break
      case TransactionFilterTime.LastMonth:
        filtered = filtered.filter((transaction) => {
          return (
            moment(transaction.date).format('MMMM') ===
              moment().subtract(1, 'months').format('MMMM') &&
            moment(transaction.date).format('YYYY') ===
              moment().subtract(1, 'months').format('YYYY')
          )
        })
        break
      case TransactionFilterTime.ThisYear:
        filtered = filtered.filter((transaction) => {
          return moment(transaction.date).format('YYYY') === moment().format('YYYY')
        })
        break
      case TransactionFilterTime.LastYear:
        filtered = filtered.filter((transaction) => {
          return (
            moment(transaction.date).format('YYYY') === moment().subtract(1, 'years').format('YYYY')
          )
        })
        break
      case TransactionFilterTime.Last10Transactions:
        filtered = filtered.slice(0, filtered.length >= 10 ? 10 : filtered.length)
    }

    switch (filterType.sortDirection) {
      case TransactionSortDirection.DESC:
        filtered = filtered.sort((a, b) => (a[filterType.sortBy] > b[filterType.sortBy] ? -1 : 1))
        break
      case TransactionSortDirection.ASC:
        filtered = filtered.sort((a, b) => (a[filterType.sortBy] > b[filterType.sortBy] ? 1 : -1))
        break
    }

    setFilteredTransactions(filtered)
  }, [filterType, transactions])

  const handleFilterTypeChange = (
    type: 'filterTime' | 'sortBy' | 'sortDirection',
    value: TransactionFilterTime | TransactionSortBy | TransactionSortDirection
  ) => {
    setFilterType({
      ...filterType,
      [type]: value,
    })
  }

  const handleSearchChange = (search: string) => {
    setFilterType({
      ...filterType,
      search,
    })
  }

  return (
    <S.Container>
      <Filter
        handleDropdownChange={handleFilterTypeChange}
        handleSearchChange={handleSearchChange}
      />
      {loading ? (
        <S.CenterContainer>
          <Spinner />
        </S.CenterContainer>
      ) : error ? (
        <S.CenterContainer>{error}</S.CenterContainer>
      ) : (
        <Table transactions={filteredTransactions} />
      )}
    </S.Container>
  )
}

export default TransactionsHistory
