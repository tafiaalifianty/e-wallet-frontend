import { formatIDR } from '../../../helpers/number'
import useAppSelector from '../../../hooks/useAppSelector'
import * as S from './Header.style'

const Header = () => {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <S.Container>
      <S.UserContainer>
        <S.GreetText>Good morning, {user?.name}!</S.GreetText>
        <S.WalletNumberText>Account: {user?.wallet_number}</S.WalletNumberText>
      </S.UserContainer>
      <S.BalanceContainer>
        <S.BalanceHeaderText>Balance:</S.BalanceHeaderText>
        <S.BalanceNumberText>
          {formatIDR(user?.balance ?? 0)}
        </S.BalanceNumberText>
      </S.BalanceContainer>
    </S.Container>
  )
}

export default Header
