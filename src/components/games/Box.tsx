import { formatNumberWithout2Zeros } from '../../helpers/number'
import GameValue from '../../types/GameValue'
import * as S from './Box.style'

interface BoxProps {
  gameValue: GameValue
  handleClick: () => void
}

const Box = ({ gameValue, handleClick }: BoxProps) => {
  return (
    <S.Container
      isOpen={gameValue.isOpen}
      isChosen={gameValue.isChosen}
      onClick={handleClick}
    >
      <S.Inner>
        <S.Front></S.Front>
        <S.Back className='back'>{formatNumberWithout2Zeros(gameValue.value)}</S.Back>
      </S.Inner>
    </S.Container>
  )
}

export default Box
