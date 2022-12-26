// import {  } from '../Components/HeaderFooter/HeaderFooter';
import { getUserId } from "../hooks/useLocalStorage";
import { getArrayOfArtistsIDs, getTrackID} from "../utils/getters";
import { asyncGetCall, asyncLoopGetWithIds, asyncPostCall, asyncLoopPostWithIds } from "./apiCall";

export async function loopPlaylistSelectionToGetTracks(playlistSelection) {
    let data = [];
    let index = playlistSelection.length - 1;
  
    if (playlistSelection.length === 0) {
        throw new Error("No playlist selection");
    }
  
    do {
        const temp = await getUserPlaylistTracks(playlistSelection[index]);
        if (temp && temp.items.length) data = [...data, ...temp.items];
        index--;
    } while (index > 0);

    return data;
}

export async function getUserPlaylistTracks(playlist) {

    if (playlist === undefined) {
    // ('No tracks href')
        throw new Error("No tracks href");
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
    return await asyncGetCall({ endPoint: "https://api.spotify.com/v1/me" });  
}

// export async function getLastUserPlaylist(id) {

//   let url = `https://api.spotify.com/v1/users/${id}/playlists`;

//   return await asyncGetCall({ endPoint: url, limit: 1 });  
// }

export async function getUserPlaylists(next = null, id) {

    let url = `https://api.spotify.com/v1/users/${id}/playlists`;

    if (next !== null) url = next;

    return await asyncGetCall({ endPoint: url });  
}

// Looped 50
export async function areTracksSavedByUser(items) {

    const ids = items.map(track => getTrackID(track));
    const params = {
        ids
    };
    return await asyncLoopGetWithIds({
        endPoint: "https://api.spotify.com/v1/me/tracks/contains",
        params,
    
    });
}

export async function getTracksAudioFeatures(items) {
  
    let result = [];
    const ids = items.map(track => getTrackID(track));
    const params = {
        ids
    };
  
    let afArray = await asyncLoopGetWithIds({
        endPoint: "https://api.spotify.com/v1/audio-features",
        params,
    
    });

    afArray.forEach(el =>
        result = [...result, ...el.audio_features]
    );

    return result;
}

// Looped 50
export async function getArtistsGenres(items) {
  
    const ids = getArrayOfArtistsIDs(items);
    let genres = { artists: [] };
    const artists = [];
    let respArray = await asyncLoopGetWithIds({ endPoint: "https://api.spotify.com/v1/artists", params: ids});

    respArray.map(arr => artists.push(...arr.artists));
    genres.artists = artists;

    return genres;
}

export async function createPlayLits({name, tracks}) {
  
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
        endPoint: `https://api.spotify.com/v1/users/${getUserId()}/playlists`, data
    }
    );

    allResponses.tracksAdded = await asyncLoopPostWithIds({
        endPoint: `https://api.spotify.com/v1/playlists/${allResponses.playlistCreated.id}/tracks`,
        params: { uris: URIs },
    
    });

    return allResponses;
}