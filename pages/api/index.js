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

export async function getUserPlaylistsNew(id, offset = 0, limit = 25) {

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
                                          params: {
                                            offset: offset,
                                            limit: limit
                                          }
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

export async function getUserPlaylistTracks(playlist, token, offset = 0, limit = 100) {

  try {
    const tracks = await axios.get(
      playlist.tracks.href,
      {
        headers: {
          Authorization: "Bearer " + token,
          // params: {
          //   offset: offset,
          //   limit: limit
          // }
        }
      });

    return {
      info: {
        href: tracks.data.href,
        next: tracks.data.next,
        previous: tracks.data.previous,
        total: tracks.data.total,
      },
      items: tracks.data.items,
    };
  }
  catch (e) {
    console.error('getPlaylist Error', e);
    return null;
  }
}

export async function getTracksAudioFeatures(playlist, token, offset = 0, limit = 100) {
  
  const ids = audioFeaturesIdsString(playlist);

  try {
    const af = await axios.get(
      `https://api.spotify.com/v1/audio-features/?ids=${ids}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        }
      });

    return af.data.audio_features;
  }
  catch (e) {
    console.error('getPlaylist Error', e);
    return null;
  }
}