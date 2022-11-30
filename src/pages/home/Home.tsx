import Header from '../../components/home/Header'
import TransactionsHistory from '../../components/home/TransactionsHistory'
import * as S from './Home.style'

const Home = () => {
  return (
    <S.Container>
      <Header />
      <TransactionsHistory />
    </S.Container>
  )
}

export default Home
