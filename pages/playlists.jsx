import { useEffect } from 'react';
import HeaderFooter from '../Components/HeaderFooter/HeaderFooter'
import UserPlaylists from '../Components/playlists/UserPlaylists'
import SnackBarCustom from '../Components/SnackBarCustom';

export default function Playlists() {

  useEffect(() => {
    document.body.classList.add("playlists");
    document.body.classList.remove("playlits");
  }, []);

  return (
    <HeaderFooter selection={true}>
      <UserPlaylists />
      <SnackBarCustom severity="info">
        Congrats! 5 playlists selected, just click on "Let's Go!" now...
      </SnackBarCustom>
    </HeaderFooter>
  )
}
