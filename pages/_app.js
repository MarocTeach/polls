import React from 'react'
import NextApp from 'next/app'
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  theme,
} from '@chakra-ui/core'
import Container from '../components/Container'

class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <CSSReset />
        <ColorModeProvider>
          <Container>
            <Component {...pageProps} />
          </Container>
        </ColorModeProvider>
      </ThemeProvider>
    )
  }
}

export default App
