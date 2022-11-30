import Navbar from './components/common/Navbar'
import Home from './pages/home'
import NotFound from './pages/notFound'
import Topup from './pages/topup'
import Transfer from './pages/transfer'
import { Route, Routes } from 'react-router-dom'
import { GlobalStyle } from './styles/Global.style'
import * as S from './App.style'
import { useEffect } from 'react'
import { useAppDispatch } from './hooks/useAppDispatch'
import { login } from './store/slices/authSlice'
import useAppSelector from './hooks/useAppSelector'
import LoadingOverlay from './components/common/LoadingOverlay'
import Games from './pages/games/Games'

const App = () => {
  const { loginLoading, error } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(login())
  }, [])

  return loginLoading ? (
    <LoadingOverlay />
  ) : error ? (
    <S.ErrorContainer>
      <p>{error}</p>
    </S.ErrorContainer>
  ) : (
    <S.App>
      <GlobalStyle />
      <Navbar />
      <S.PageContainer>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/topup'
            element={<Topup />}
          />
          <Route
            path='/transfer'
            element={<Transfer />}
          />
          <Route
            path='/games'
            element={<Games />}
          />
          <Route
            path='*'
            element={<NotFound />}
          />
        </Routes>
      </S.PageContainer>
    </S.App>
  )
}

export default App