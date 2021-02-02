import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import LoginPages from './Components/index/LoginPages'
import WelcomeCarousel from './Components/index/WelcomeCarousel'
// import { Scrollbars } from 'react-custom-scrollbars';

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>PlayLits</title>
        <link rel="icon" href="/images/logo.svg" />
      </Head>

      <Header />

      {/* <Scrollbars
        autoHeight
        autoHeightMin={450}
        autoHeightMax={"100vh"}
        autoHide
        autoHideTimeout={500}
        autoHideDuration={200}
      > */}
      <WelcomeCarousel />
      <LoginPages />
      
      {/* </Scrollbars> */}
      
      <Footer />
    </div>
  )
}
