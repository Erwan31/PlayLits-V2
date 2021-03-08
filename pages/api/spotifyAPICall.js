import axios from 'axios';
import { getArrayOfArtistsIDs, getTrackID, getTrackURI } from '../utils/getters';
import { asyncGetCall, asyncLoopGetCall, asyncPostCall } from './apiCall';

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

export async function getTracksInfo() {
  
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
}

export async function getPlaylistInfo() {
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
  }
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
  return await asyncLoopGetCall({
    endPoint: `https://api.spotify.com/v1/me/tracks/contains`,
    params
  });
}


export async function getTracksAudioFeatures(playlist) {
  
  let result = [];
  const ids = playlist.items.map(track => getTrackID(track));
   const params = {
    ids
  };
  
  let afArray = await asyncLoopGetCall({
    endPoint: `https://api.spotify.com/v1/audio-features`,
    params
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
  let respArray = await asyncLoopGetCall({ endPoint: `https://api.spotify.com/v1/artists`, params: ids});

  respArray.map(arr => artists.push(...arr.artists));
  genres.artists = artists;

  return genres;
}

export async function createPlayLits({name, tracks}) {
  
  const id = window.localStorage.getItem("pl_user_id");
  const data = {
    name: "PlayLits: " + name,
    public: false
  };
  const URIs= Array.from( tracks.map( track => getTrackID(track)), element =>
  "spotify%3Atrack%3A" + element
  ).join(",");
  let allResponses = { playlistCreated: null, tracksAdded: null };

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