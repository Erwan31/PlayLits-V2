import axios from 'axios';
import { getArrayOfArtistsIDs, getTrackID, getTrackURI } from '../utils/getters';
import { asyncGetCall, asyncPostCall } from './apiCall';

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

export async function createPlayLits({name, tracks}) {
  
  const id = window.localStorage.getItem("pl_user_id");
  console.log(id);
  let allResponses = { playlistCreated: null, tracksAdded: null };
  const data = {
        name: "PlayLits: " + name,
        public: false
  };
  const URIs= Array.from( tracks.map( track => getTrackID(track)), element =>
                "spotify%3Atrack%3A" + element
                ).join(",");

  // Create an empty playlist
  allResponses.playlistCreated = await asyncPostCall({
    endPoint: `https://api.spotify.com/v1/users/${id}/playlists`,
    data
  });

  allResponses.tracksAdded = await asyncPostCall({
    endPoint: `https://api.spotify.com/v1/playlists/${allResponses.playlistCreated.id}/tracks?uris=${URIs}`,
  });

  return allResponses;
}