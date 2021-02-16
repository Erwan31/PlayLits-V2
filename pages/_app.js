import '../styles/globals.css'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
// Material UI
import {theme }from '../styles/theme/theme'
import { MuiThemeProvider } from '@material-ui/core';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <MuiThemeProvider theme={theme}>
        <Component {...pageProps} />
      </MuiThemeProvider>
    </RecoilRoot>
  )
}

export default MyApp
