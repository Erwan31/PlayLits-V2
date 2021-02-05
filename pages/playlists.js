// import { Scrollbars } from 'react-custom-scrollbars';
// import { useRouter } from 'next/router'
import UserPlaylists from './Components/playlists/UserPlaylists'
import HeaderFooter from './Components/HeaderFooter/HeaderFooter'

export default function Playlists() {

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
        <UserPlaylists />
      {/* </Scrollbars> */}
    </HeaderFooter>
  )
}
