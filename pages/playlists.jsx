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


  useEffect(() => {
    if (playlistsSelection.selection.length === MAXSELECTION) {
      setOpenSnack(true);
    }
    else {
      setOpenSnack(false);
    }
  }, [playlistsSelection]);

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      // return;
    }
    setOpenSnack(false);
  };

  //Not exactly reusable for now
  return (
    <HeaderFooter selection={true}>
      <UserPlaylists />
      <SnackBarCustom severity="info" open={openSnack} handleClose={handleCloseSnack}>
        Congrats! Max 5 playlists selected, just click on "Go!" now...
      </SnackBarCustom>
    </HeaderFooter>
  )
}
