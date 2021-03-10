import '../styles/globals.css'
import { RecoilRoot } from 'recoil';
// Material UI
import { theme }from '../styles/theme/theme'
import { MuiThemeProvider } from '@material-ui/core';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <title>PlayLits</title>
      </Head>
      <RecoilRoot>
        <MuiThemeProvider theme={theme}>
            <Component {...pageProps} />
        </MuiThemeProvider>
      </RecoilRoot>
    </>
  )
}

export default MyApp
