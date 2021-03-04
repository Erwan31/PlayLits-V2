import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { audioFeaturesIdsString } from '../playlits/utils';
import { mainState } from '../States/states';
import { getArrayOfArtistsIDs, getTrackID, getTrackURI } from '../utils/getters';


export async function asyncGetCall( {endPoint = null, offset = 0, limit = 25} ) {
  
  if (endPoint === null) {
    throw new Error('Endpoint expected');
  }
  
  const token = window.localStorage.getItem("pl_token");
  const myHeader = {
    Authorization: "Bearer " + token,
    'content-type': 'application/json',
  };
  let response;

  try {
    response = await axios.get(
      endPoint,
      {
        headers: myHeader
      });
  }
  catch (e) {
    console.error('Error GET', e);
    return null;
  }

  return response.data;
}

export async function asyncPostCall( {endPoint = null, data, offset = 0, limit = 25} ) {
  const [state, mainState] = useRecoilState(mainState);
  const { token } = state;
  const myHeader = {
    Authorization: "Bearer " + token,
    'content-type': 'application/json',
  };
  const myParams = {
    offset: offset,
    limit: limit
  };

  let response;

  try {
    response = await axios.post(
      endPoint,
      data,
      {
        headers: myHeader,
        params: myParams,
      });
  }
  catch (e) {
    console.error('Error POST', e);
    return null;
  }

  return response;
}

export async function getUserInfo() {
  return await asyncGetCall({ endPoint: 'https://api.spotify.com/v1/me' });  
}

export async function getUserPlaylists(next = null) {

  const id = window.localStorage.getItem("pl_user_id");
  let url = `https://api.spotify.com/v1/users/${id}/playlists`;

  if (next !== null) url = next;

  return await asyncGetCall({ endPoint: url });  
  // try {
  //   const userPlaylists = await axios.get(
  //     url,
  //     {
  //       headers: {
  //         Authorization: "Bearer " + token
  //       }
  //     });

  //   return userPlaylists.data;
  // }
  // catch (e) {
  //   console.error('getUserInfo Error', e);
  //   return null;
  // }
}

// Looped 50
export async function areTracksSavedByUser(token, playlist) {

  const ids = playlist.items.map(track => getTrackID(track));
  const result = [];
  const APILIMIT = 50;
  let maxIteration = Math.floor(playlist.items.length / APILIMIT) + 1;
  let iteration = 0;

  do {
    const spliceIds = ids.slice(iteration * APILIMIT, (iteration + 1) * APILIMIT).join(',');
    iteration++;

    try {
      const bool = await axios.get(
        `https://api.spotify.com/v1/me/tracks/contains?ids=${spliceIds}`,
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
      // console.log("more playlists...", error);
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

export async function getUserPlaylistTracks(playlist, token, offset = 0, limit = 20) {

  const headers = { Authorization: "Bearer " + token };
  const result = {
    info: {
      href: null,
      next: null,
      previous: null,
      total: null,
    },
    items: null,
  };

  try {
    const tracks = await axios.get(
      playlist.tracks.href,
      {
        headers: headers,
      });

    result.info = {
      href: tracks.data.href,
      next: tracks.data.next,
      previous: tracks.data.previous,
      total: tracks.data.total,
    };
    result.items = tracks.data.items;
  }
  catch (e) {
    console.error('getPlaylist Error', e);
    return null;
  }

  while (result.info.next !== null) {
    try {
      const tracks = await axios.get(
        result.info.next,
        {
          headers: { headers }
        });

      result.info = {
        href: tracks.data.href,
        next: tracks.data.next,
        previous: tracks.data.previous,
        total: tracks.data.total,
      };
      result.items.push(tracks.data.items);
    }
    catch (e) {
      console.error('getPlaylist Error', e);
      return null;
    }
  }

  return result;

}

export async function getTracksAudioFeatures(playlist, token, offset = 0, limit = 100) {
  
  const ids = playlist.items.map(track => getTrackID(track));
  const result = [];
  const APILIMIT = 50;
  let maxIteration = Math.floor(playlist.items.length / APILIMIT) + 1;
  let iteration = 0;

  do {
    const spliceIds = ids.slice(iteration* APILIMIT, (iteration + 1) * APILIMIT).join(',');
    iteration++;

    try {
      const af = await axios.get(
        `https://api.spotify.com/v1/audio-features/?ids=${spliceIds}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          }
        });
      result.push(...af.data.audio_features);
    }
    catch (e) {
      console.error('getPlaylist Error', e);
      return null;
    }
  } while (maxIteration > iteration);
  return result;
}

// Looped 50
export async function getArtistsGenres(data, token, offset = 0, limit = 100) {
  
  const ids = getArrayOfArtistsIDs(data.items); //.join(",");
  const result = { artists: [] };
  const APILIMIT = 50;
  let maxIteration = Math.floor(data.items.length / APILIMIT) + 1;
  let iteration = 0;

  do {
    const spliceIds = ids.slice(iteration* APILIMIT, (iteration + 1) * APILIMIT).join(',');
    iteration++;
  
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/?ids=${spliceIds}`,
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