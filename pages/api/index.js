import axios from 'axios';
import { audioFeaturesIdsString } from '../playlits/utils';
import { getArrayOfArtistsIDs, getTrackID, getTrackURI } from '../utils/getters';

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

export async function areTracksSavedByUser(token, playlist) {

  const ids = playlist.items.map(track => getTrackID(track));
  const result = [];
  let maxIteration = Math.floor(playlist.items.length / 50) + 1;
  let iteration = 0;
  console.log(maxIteration, 'numIteration')

  do {
    const modIds = ids.splice(iteration, (iteration + 1) * 50).join(',');
    iteration++;

    try {
      const bool = await axios.get(
        `https://api.spotify.com/v1/me/tracks/contains?ids=${modIds}`,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        });
      result.push(...bool.data);
    }
    catch (e) {
      console.error('getbool isTrackSaved Error', e);
      return null;
    }
  } while (maxIteration > iteration);
  
  return result;

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
  
  const ids = getArrayOfArtistsIDs(data.items); //.join(",");
  const result = {artists: []};
  let maxIteration = Math.floor(data.items.length / 50) + 1;
  let iteration = 0;
  console.log(maxIteration, 'numIteration')

  do {
    const modIds = ids.splice(iteration, (iteration + 1) * 50).join(',');
    iteration++;
  
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/?ids=${modIds}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          }
        });
      result.artists.push(...response.data.artists);
    }
    catch (e) {
      console.error('getPlaylist Error', e);
      return null;
    }
  } while (maxIteration > iteration);
  
  return result;

}

export async function createPlayLits(token, name, tracks) {
  
  let allResponses = { playlistCreated: null, tracksAdded: null };
  const headers = { Authorization: "Bearer " + token };

  // TO PUT INTO AN ISOLATED FCT COMPARING WITH CURRENT STATE
  const responseID = await axios.get(
                          "https://api.spotify.com/v1/me",
                          {headers: headers});
  const dataID = await responseID.data;

  try {
      const CREATEPLAYLITSURL = `https://api.spotify.com/v1/users/${dataID.id}/playlists`;
      const data = {
        name: "PlayLits: " + name,
        public: false
      };
      const response = await axios.post(
                              CREATEPLAYLITSURL, 
                              data,
                              {
                                headers: headers,
                                'content-type': 'application/json',
                              });
    allResponses.playlistCreated = response;
    console.log(allResponses.playlistCreated, allResponses.playlistCreated.data.id);
  }
  catch(error){
      console.error("create playlist", error);
  };

  try {
    let URIs= Array.from( tracks.map( track => getTrackID(track)), element =>
                "spotify%3Atrack%3A" + element
                );
        URIs = URIs.join(",");
    // const URIs = encodeURIComponent(tracks.map(track => getTrackURI(track)).join(','));
    // console.log(URIs, 'URIS')
    const ADDTRACKSURL = `https://api.spotify.com/v1/playlists/${allResponses.playlistCreated.data.id}/tracks?uris=${URIs}`;
    console.log(ADDTRACKSURL, 'ATU');
      const response = await axios.post(
          ADDTRACKSURL,
          {},
          {
              headers: headers,
              'content-type': 'application/json',
          });
    allResponses.tracksAdded = response;
  }
  catch(error){
      console.error("add tracks to playlist", error);
  };

  return allResponses;
}