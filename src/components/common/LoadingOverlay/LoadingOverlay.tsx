import * as S from './LoadingOverlay.style'
import { ReactComponent as Logo } from '../../../assets/logo.svg'
import Spinner from '../Spinner'

const LoadingOverlay = () => {
  return (
    <S.Container>
      <S.Overlay />
      <S.Body>
        <Spinner />
        <Logo />
      </S.Body>
    </S.Container>
  )
}

export default LoadingOverlay
