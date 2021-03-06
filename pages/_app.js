import '../styles/globals.css'
import { RecoilRoot } from 'recoil';
// Material UI
import { theme }from '../styles/theme/theme'
import { MuiThemeProvider, responsiveFontSizes } from '@material-ui/core';
import Head from 'next/head';

const themeRespFont = responsiveFontSizes(theme);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* https://ahrefs.com/blog/seo-meta-tags/ */}
        <meta name="viewport" content="viewport-fit=cover" key="viewport" />
        <meta
          name="description"
          content="Reorder and sort your Spotify playlists easily! Create new playlist based on tracks characteristics, loved songs... Enjoy!"
          key="long-description"
        />
        <meta name="robots" content="index, follow" />
        <meta charset="UTF-8" />

        <link rel="icon" href="/static/images/favicon.svg" type="image/icon type" />
        
        <title>PlayLits</title>
      </Head>
      <RecoilRoot>
        <MuiThemeProvider theme={themeRespFont}>
            <Component {...pageProps} /> 
        </MuiThemeProvider>
      </RecoilRoot>
    </>
  )
}

export default MyApp
