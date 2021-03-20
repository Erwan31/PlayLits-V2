// import {  } from '../Components/HeaderFooter/HeaderFooter';
import { getArrayOfArtistsIDs, getTrackID} from '../utils/getters';
import { asyncGetCall, asyncLoopGetWithIds, asyncPostCall, asyncLoopPostWithIds } from './apiCall';

export async function getUserPlaylistTracks(playlist) {

  if (playlist === undefined) {
    // ('No tracks href')
    throw new Error('No tracks href');
  }

  const result = {
    info: {
      href: null,
      next: playlist.tracks.href,
      previous: null,
      total: null,
    },
    items: [],
  };

  do {
    let respObj;

    // Need the try catch here??
    try {
      respObj = await asyncGetCall({ endPoint: result.info.next});
    }
    catch (e) {
      throw e;
    }
      
    result.info = {
      href: respObj.href,
      next: respObj.next,
      previous: respObj.previous,
      total: respObj.total,
    };
    result.items.push(...respObj.items);
    
  }while(result.info.next !== null);    

  return result; 
}

export async function getUserInfo() {
  return await asyncGetCall({ endPoint: 'https://api.spotify.com/v1/me' });  
}

export async function getUserPlaylists(next = null) {

  const id = window.localStorage.getItem("pl_user_id");
  let url = `https://api.spotify.com/v1/users/${id}/playlists`;

  if (next !== null) url = next;

  return await asyncGetCall({ endPoint: url });  
}

// Looped 50
export async function areTracksSavedByUser(playlist) {

  const ids = playlist.items.map(track => getTrackID(track));
  const params = {
    ids
  };
  return await asyncLoopGetWithIds({
    endPoint: `https://api.spotify.com/v1/me/tracks/contains`,
    params,
    
  });
}


export async function getTracksAudioFeatures(playlist) {
  
  let result = [];
  const ids = playlist.items.map(track => getTrackID(track));
  const params = {
    ids
  };
  
  let afArray = await asyncLoopGetWithIds({
    endPoint: `https://api.spotify.com/v1/audio-features`,
    params,
    
  });

  afArray.forEach(el =>
    result = [...result, ...el.audio_features]
  );

  return result;
}

// Looped 50
export async function getArtistsGenres(data) {
  
  const ids = getArrayOfArtistsIDs(data.items);
  let genres = { artists: [] };
  const artists = [];
  let respArray = await asyncLoopGetWithIds({ endPoint: `https://api.spotify.com/v1/artists`, params: ids});

  respArray.map(arr => artists.push(...arr.artists));
  genres.artists = artists;

  return genres;
}

export async function createPlayLits({name, tracks}) {
  
  const id = window.localStorage.getItem("pl_user_id");
  const data = {
    name: name, //"PlayLits: " +
    public: false
  };
  const URIs = Array.from(tracks.map(track => getTrackID(track)), element =>
    "spotify%3Atrack%3A" + element
  ); //.join(",");
  let allResponses = { playlistCreated: null, tracksAdded: null };

  // Create an empty playlist
  allResponses.playlistCreated = await asyncPostCall({
    endPoint: `https://api.spotify.com/v1/users/${id}/playlists`, data
  }
    );

  allResponses.tracksAdded = await asyncLoopPostWithIds({
    endPoint: `https://api.spotify.com/v1/playlists/${allResponses.playlistCreated.id}/tracks`,
    params: { uris: URIs },
    
  });

  return allResponses;
}