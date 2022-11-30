import * as S from './Modal.style'
import { ReactComponent as IconSuccess } from '../../../assets/ic_success.svg'
import { ReactComponent as IconFailed } from '../../../assets/ic_failed.svg'
import { formatNumber } from '../../../helpers/number'
import Button from '../Button'
import Transaction from '../../../types/Transaction'

interface ModalProps {
  onClose: () => void
  error: string
  transaction: Transaction | undefined
  name: string
}

const Modal = ({ onClose, transaction, error, name }: ModalProps) => {
  return (
    <S.Container>
      <S.Overlay />
      <S.Body>
        <S.IconContainer>
          {error ? (
            <>
              <IconFailed
                width={63}
                height={63}
              />
              <S.IconText className='failed'>{name} Failed</S.IconText>
            </>
          ) : (
            <>
              <IconSuccess />
              <S.IconText>{name} Success</S.IconText>
            </>
          )}
        </S.IconContainer>
        <S.ContentContainer>
          {transaction && !error ? (
            <>
              <S.ContentRow>
                <S.ContentText>Amount</S.ContentText>
                <S.ContentText className='amount'>{formatNumber(transaction.amount)}</S.ContentText>
              </S.ContentRow>
              <S.ContentRow>
                <S.ContentText>Transaction Id</S.ContentText>
                <S.ContentText>338899318231301</S.ContentText>
              </S.ContentRow>
              <S.ContentRow>
                <S.ContentText>From</S.ContentText>
                <S.ContentText>{transaction.sender}</S.ContentText>
              </S.ContentRow>
              <S.ContentRow>
                <S.ContentText>To</S.ContentText>
                <S.ContentText>{transaction.recipient}</S.ContentText>
              </S.ContentRow>
              <S.ContentRow>
                <S.ContentText>Description</S.ContentText>
                <S.ContentText>{transaction.description}</S.ContentText>
              </S.ContentRow>
            </>
          ) : (
            <S.ErrorText>{error}</S.ErrorText>
          )}
        </S.ContentContainer>
        <S.ButtonGroup>
          {!error && (
            <Button
              btnType='normal'
              onClick={onClose}
            >
              Print
            </Button>
          )}
          <Button
            btnType='normal'
            onClick={onClose}
          >
            Close
          </Button>
        </S.ButtonGroup>
      </S.Body>
    </S.Container>
  )
}

export default Modal
