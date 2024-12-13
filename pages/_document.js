import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/logo.png" />
        <meta name="description" content="Plastic Detection System for Environmental Analysis" />
        <meta name="theme-color" content="#319795" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
