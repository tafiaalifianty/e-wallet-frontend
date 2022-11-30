import styled from 'styled-components'

export const Container = styled.div`
  max-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;

  & h1 {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 24px;
  }

  & span {
    display: block;
    margin-bottom: 12px;
  }
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const BoxesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr 1fr;
  gap: 50px;
  width: 550px;

  & > * {
    aspect-ratio: 1;
  }
`

export const ErrorContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
