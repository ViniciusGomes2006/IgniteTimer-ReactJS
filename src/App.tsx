import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './style/global'
import { defaultTheme } from './style/themes/default'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes/Router'
import { CyclesContextProvider } from './contexts/CyclesContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
