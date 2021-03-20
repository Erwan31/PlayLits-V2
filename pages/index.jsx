import HeaderFooter from '../Components/HeaderFooter/HeaderFooter'
import LoginPages from '../Components/index/LoginPages'
import WelcomeCarousel from '../Components/index/WelcomeCarousel'
// import { Scrollbars } from 'react-custom-scrollbars';

export default function Home() {

  return (
    <HeaderFooter>
      <div style={{ marginTop: 80, marginLeft: '1.5rem', marginRight: '1.5rem' }}>
        <WelcomeCarousel />
      </div>
      <LoginPages />
    </HeaderFooter>
  )
}
