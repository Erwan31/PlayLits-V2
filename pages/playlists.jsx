import { useEffect, useState } from 'react';
import HeaderFooter from '../Components/HeaderFooter/HeaderFooter'
import UserPlaylists from '../Components/playlists/UserPlaylists'
import SnackBarCustom from '../Components/SnackBarCustom';
import usePlaylistsSelection, { MAXSELECTION } from '../hooks/usePlaylistsSelection';


export default function Playlists() {

  const { playlistsSelection } = usePlaylistsSelection();
  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    document.body.classList.add("playlists");
    document.body.classList.remove("playlits");
  }, []);

  //Not exactly reusable for now

  useEffect(() => {
    if (playlistsSelection.selection.length === MAXSELECTION) {
      setOpenSnack(true);
    }
  }, [playlistsSelection]);

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <HeaderFooter selection={true}>
      <UserPlaylists />
      <SnackBarCustom severity="info" open={openSnack} handleClose={handleCloseSnack}>
        Congrats! 5 playlists selected, just click on "Let's Go!" now...
      </SnackBarCustom>
    </HeaderFooter>
  )
}
