import Transaction from '../../../../types/Transaction'
import Row from './Row/Row'
import * as S from './Table.style'

interface TableProps {
  transactions: Transaction[]
}

const Table = ({ transactions }: TableProps) => {
  const renderTransactions = () => {
    return transactions.map((transaction) => (
      <Row
        key={transaction.id}
        transaction={transaction}
      />
    ))
  }

  return (
    <S.Table cellSpacing={0}>
      <S.TableHead>
        <tr>
          <S.TableHeadColumn>Date & Time</S.TableHeadColumn>
          <S.TableHeadColumn>Type</S.TableHeadColumn>
          <S.TableHeadColumn>From/To</S.TableHeadColumn>
          <S.TableHeadColumn>Description</S.TableHeadColumn>
          <S.TableHeadColumn>Amount</S.TableHeadColumn>
        </tr>
      </S.TableHead>
      <S.TableBody>{renderTransactions()}</S.TableBody>
    </S.Table>
  )
}

export default Table
