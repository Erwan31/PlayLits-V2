import {
    areTracksSavedByUser, getArtistsGenres, getTracksAudioFeatures,
    getUserPlaylistTracks, loopPlaylistSelectionToGetTracks,
} from "../api/spotifyAPICall";
import { getArrayOfGenres } from "../utils/getters";
import { dataStructureTracks } from "../utils/playlits/utils";
import { getLocalSelectedPlaylists } from "./useLocalStorage";
// Can't be used within async function
// import useMainState from "./useMainState";

export async function getPlaylistData(playlistsSelection) {

    // In case of page refresh -> choice in between current state or localStorage data
    const selectedPlaylists = playlistsSelection.selection.length > 0 ? playlistsSelection.selection : getLocalSelectedPlaylists();

    // Async calls
    const items = await loopPlaylistSelectionToGetTracks(selectedPlaylists);
    // const data = await getUserPlaylistTracks(selectedPlaylist);

    // console.log(data, 'D', playlistsSelection, selectedPlaylists);

    const audioFeatures = await getTracksAudioFeatures(items);
    // PB with get result loop -> should always return an array, period.
    const areSaved = await areTracksSavedByUser(items);
    //get tracks albums genres
    const artistsData = await getArtistsGenres(items);

    // Used previously when sorting genres
    // const allGenres = getArrayOfGenres(artistsData.artists);
    const genres = artistsData.artists.map(artist => artist.genres);
    
    // Initial Structure with pairing in between different arrays of dat into Objects
    const init = dataStructureTracks(items, audioFeatures, genres, areSaved);

    return init;
}