import styled from 'styled-components'

export const App = styled.div`
  padding: 0px 10%;
`

export const ErrorContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;

  * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const PageContainer = styled.div`
  padding: 60px 0;
`
