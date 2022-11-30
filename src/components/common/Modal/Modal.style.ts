import styled from 'styled-components'
import colors from '../../../styles/Colors.style'

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const Overlay = styled.div`
  background-color: #d9d9d9;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

export const Body = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 50px 40px;
  background-color: ${colors.uiBackground1};
  min-width: 488px;
`

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-bottom: 80px;
`

export const IconText = styled.span`
  display: block;
  font-weight: 700;
  color: ${colors.success};
  font-size: 1.9rem;

  &.failed {
    color: red;
  }
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
`

export const ContentText = styled.span`
  display: block;

  &.amount {
    font-weight: 700;
    font-size: 1.9rem;
  }
`

export const ErrorText = styled.span`
  display: block;
  margin-top: -40px;
  text-align: center;
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 43px;

  & button {
    width: 92px;
  }
`
