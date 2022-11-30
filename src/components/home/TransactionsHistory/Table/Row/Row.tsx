import { formatTableDate } from '../../../../../helpers/datetime'
import { formatNumber } from '../../../../../helpers/number'
import Transaction from '../../../../../types/Transaction'
import * as S from './Row.style'

interface RowProps {
  transaction: Transaction
}

const Row = ({ transaction }: RowProps) => {
  return (
    <S.TableRow>
      <S.TableColumn>{formatTableDate(transaction.date)}</S.TableColumn>
      <S.TableColumn>{transaction.status === 'INCOME' ? 'CREDIT' : 'DEBIT'}</S.TableColumn>
      <S.TableColumn>
        {transaction.status === 'INCOME' ? transaction.sender : transaction.recipient}
      </S.TableColumn>
      <S.TableColumn>{transaction.description}</S.TableColumn>
      <S.TableColumn>
        {transaction.status === 'INCOME' ? (
          <S.IncomeText>+ {formatNumber(transaction.amount)}</S.IncomeText>
        ) : (
          `${formatNumber(transaction.amount)}`
        )}
      </S.TableColumn>
    </S.TableRow>
  )
}

export default Row
