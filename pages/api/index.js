import axios from 'axios';
import { audioFeaturesIdsString } from '../playlits/utils';
import { getArrayOfArtistsIDs } from '../utils/getters';

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

export async function getArtistsGenres(data, token, offset = 0, limit = 100) {
  
  const ids = getArrayOfArtistsIDs(data.items).join(",");
  
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/?ids=${ids}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        }
      });

    return response.data;
  }
  catch (e) {
    console.error('getPlaylist Error', e);
    return null;
  }

}

export async function createPlayLits(token, name, tracksIDs) {
  
  let external_url;

  const responseID = await axios.get(
                          "https://api.spotify.com/v1/me",
                          {
                            headers: {
                              Authorization: "Bearer " + token,
                            }
                          });
  const dataID = await responseID.data;

  console.log(dataID);

  const CREATEPLAYLITSURL = `https://api.spotify.com/v1/users/${dataID.id}/playlists`;
  let newPlaylistID = 0;

  let URIs= Array.from( tracksIDs, element =>
          "spotify%3Atrack%3A" + element
          );
  URIs = URIs.join(",");

  //console.log("URIs", URIs);

  const data = {
      name: "Playlits: " + name,
      public: true
  };

  try{
      const response = await axios.post(
                              CREATEPLAYLITSURL, 
                              data,
                              {
                                headers: { Authorization: "Bearer " + token,
                                  'content-type': 'application/json',
                                }
                              });
      console.log(response);

    newPlaylistID = response.data.id;
    external_url = response.data.external_url.spotify;
    console.log(newPlaylistID, external_url);
  }
  catch(error){
      console.error("create playlist", error);
  };

  try{
      const ADDTRACKSURL = `https://api.spotify.com/v1/playlists/${newPlaylistID}/tracks?uris=${URIs}`;
      const response = await axios.post(
          ADDTRACKSURL,
          {},
          {
              Authorization: "Bearer " + token,
              'content-type': 'application/json',
          });
      console.log(response);
  }
  catch(error){
      console.error("add tracks to playlist", error);
  };

  return {
    url: external_url,
  }
}