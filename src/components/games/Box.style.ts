import styled from 'styled-components'
import colors from '../../styles/Colors.style'
import GameValue from '../../types/GameValue'

type GameValueStyleProps = Pick<GameValue, 'isOpen' | 'isChosen'>

export const Container = styled.div<GameValueStyleProps>`
  font-weight: bold;
  background-color: transparent;
  border-radius: 15px;

  &:hover {
    cursor: ${({ isOpen }) => (isOpen ? 'default' : 'pointer')};
  }

  & > * {
    transform: ${({ isOpen }) => (isOpen ? 'rotateY(180deg)' : 'rotateY(0deg)')};
  }

  & .back {
    color: ${({ isChosen }) => (isChosen ? 'white' : colors.text)};
    background-color: ${({ isChosen }) => (isChosen ? '#27ae60' : colors.uiBackground1)};
  }
`

export const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0px 13px 19px rgba(0, 0, 0, 0.15);
  background-color: transparent;
  border-radius: 15px;
`

const absolute = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Front = styled(absolute)`
  background-color: ${colors.uiBackground1};
  border: 1px solid #939393;
`

export const Back = styled(absolute)`
  transform: rotateY(180deg);
`
