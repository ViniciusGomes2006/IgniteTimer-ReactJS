import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './style/global'
import { defaultTheme } from './style/themes/default'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes/Router'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  )
}
