import {
    areTracksSavedByUser, getArtistsGenres, getTracksAudioFeatures,
    getUserPlaylistTracks, 
} from "../api/spotifyAPICall";
import { getArrayOfGenres } from "../utils/getters";
import { dataStructureTracks } from "../utils/playlits/utils";
import { getLocalSelectedPlaylists } from "./useLocalStorage";
// Can't be used within async function
// import useMainState from "./useMainState";

export async function getPlaylistData(state) {

    // In case of page refresh -> choice in between current state or localStorage data
    const selectedPlaylist = state.selectedPlaylist.id !== null ? state.selectedPlaylist : getLocalSelectedPlaylists();

    // Async calls
    const data = await getUserPlaylistTracks(selectedPlaylist);
    const audioFeatures = await getTracksAudioFeatures(data);
    // PB with get result loop -> should always return an array, period.
    const areSaved = await areTracksSavedByUser(data);
    //get tracks albums genres
    const artistsData = await getArtistsGenres(data);

    // Used previously when sorting genres
    // const allGenres = getArrayOfGenres(artistsData.artists);
    const genres = artistsData.artists.map(artist => artist.genres);
    
    // Initial Structure with pairing in between different arrays of dat into Objects
    const init = dataStructureTracks(data, audioFeatures, genres, areSaved);

    return init;
}