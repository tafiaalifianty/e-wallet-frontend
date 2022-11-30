import { createGlobalStyle } from 'styled-components'
import colors from './Colors.style'

export const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    color: ${colors.text};
  }
`
