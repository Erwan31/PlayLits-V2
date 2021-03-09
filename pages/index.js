import HeaderFooter from '../Components/HeaderFooter/HeaderFooter'
import LoginPages from '../Components/index/LoginPages'
import WelcomeCarousel from '../Components/index/WelcomeCarousel'
// import { Scrollbars } from 'react-custom-scrollbars';

export default function Home() {

  return (
      <HeaderFooter>
      {/* <Scrollbars
        autoHeight
        autoHeightMin={450}
        autoHeightMax={"100vh"}
        autoHide
        autoHideTimeout={500}
        autoHideDuration={200}
      > */}
      <div style={{marginTop: 80 }}></div>
      <WelcomeCarousel />
      <LoginPages />
      
      {/* </Scrollbars> */}
    </HeaderFooter>
  )
}
