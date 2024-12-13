import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '../styles/globals.css'
// Optional: Create a custom theme
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50'
      }
    }
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp