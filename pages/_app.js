import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { useState } from 'react'
import '../styles/globals.css'
import { LanguageProvider } from '../contexts/LanguageContext';
// Create a custom theme with RTL support
const theme = extendTheme({
  direction: 'ltr', // default direction
  styles: {
    global: (props) => ({
      body: {
        bg: 'gray.50',
        fontFamily: props.theme.direction === 'rtl' 
          ? "'Cairo', sans-serif"
          : 'system-ui, sans-serif',
      }
    })
  }
})

function MyApp({ Component, pageProps }) {
  const [direction, setDirection] = useState('ltr');
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    const newDir = newLang === 'ar' ? 'rtl' : 'ltr';
    setLanguage(newLang);
    setDirection(newDir);
    document.documentElement.dir = newDir;
    document.documentElement.lang = newLang;
  };


  return (
    <LanguageProvider>
    <ChakraProvider theme={{ ...theme, direction }}>

      <Component {...pageProps} />
    </ChakraProvider>
    </LanguageProvider>
  )
}

export default MyApp
