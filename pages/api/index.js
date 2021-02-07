import axios from 'axios';
import { audioFeaturesIdsString } from '../playlits/utils';

export async function getUserInfo(token) {

    // Make a call using the token
  try {
    const userInfo = await axios.get(
      'https://api.spotify.com/v1/me',
      {
        headers: {
          Authorization: "Bearer " + token
        }
      });
    
    return userInfo;
  }
  catch (e) {
    console.error('getUserInfo Error', e);
    return null;
  }
  
}

export async function getUserPlaylists(id, token) {

  try {
    const userPlaylists = await axios.get(
      `https://api.spotify.com/v1/users/${id}/playlists`,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      });

    return userPlaylists.data;
  }
  catch (e) {
    console.error('getUserInfo Error', e);
    return null;
  }
}

export async function getUserPlaylistsNew(id, offset) {

    let items = null;
    let data = null;

    // Get up to 100 tracks from playlist 
    const token = this.state.token;
    const headerContent = {
        Authorization: "Bearer " + token
    };

    try{
      const response = await axios.get(`https://api.spotify.com/v1/users/${id}/playlists`,
                                        {
                                          headers: headerContent, 
                                          params: {offset: offset }
                                        });
      data = await response.data;
    }
    catch(error){
      console.log("more playlists...", error);
      this.setState({
        no_data: true,
      });
    }
  
    items = data.items;

    if(items !== null){
      let limit = data.limit;
      let playlists = this.state.playlists;
      playlists.push(...items);
      this.setState({ limit, playlists });
    }

    return items;
}

export async function getUserPlaylistTracks(playlist, token) {

  try {
    const tracks = await axios.get(
      playlist.tracks.href,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      });

    return tracks.data;
  }
  catch (e) {
    console.error('getPlaylist Error', e);
    return null;
  }
}

export async function getTracksAudioFeatures(playlist, token) {

  const ids = audioFeaturesIdsString(playlist);
  console.log(ids, 'ids');

  try {
    const af = await axios.get(
      `https://api.spotify.com/v1/audio-features/?ids=${ids}`,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      });

    return af.data;
  }
  catch (e) {
    console.error('getPlaylist Error', e);
    return null;
  }
}