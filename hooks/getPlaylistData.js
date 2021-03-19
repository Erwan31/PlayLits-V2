import {
    areTracksSavedByUser, getArtistsGenres, getTracksAudioFeatures,
    getUserPlaylistTracks, 
} from "../api/spotifyAPICall";
import { getArrayOfGenres } from "../utils/getters";
import { dataStructureTracks } from "../utils/playlits/utils";
// Can't be used within async function
// import useMainState from "./useMainState";

export async function getPlaylistData(state) {

    const data = await getUserPlaylistTracks(state.selectedPlaylist.info);
    const audioFeatures = await getTracksAudioFeatures(data);
    // PB with get result loop -> should always return an array, period.
    const areSaved = await areTracksSavedByUser(data);
    //get tracks albums genres
    const artistsData = await getArtistsGenres(data);
    const allGenres = getArrayOfGenres(artistsData.artists);
    const genres = artistsData.artists.map(artist => artist.genres);
    
    // Initial Structure with pairing in between different arrays of dat into Objects
    const init = dataStructureTracks(data, audioFeatures, genres, areSaved);

    return init;

}

// return {
//     // data,
//     // audioFeatures,
//     // areSaved,
//     // artistsData,
//     // allGenres,
//     // genres,
//     init
// };
// import { useReducer } from "react";
// import { useRecoilState } from "recoil";
// import { mainState, selectedPlaylist, errorState } from "../utils/States/states";
// import {
//     areTracksSavedByUser, getArtistsGenres, getTracksAudioFeatures,
//     getUserPlaylistTracks
// } from "../api/spotifyAPICall";
// import { getArrayOfGenres } from "../utils/getters";

// function reducer(state, action) {
    
//     switch (action.type) {
//         case "SET_PLAYLISTDATA":
//             console.log('I wad hee', action);
//             return { ...state, playlistData: action.payload };
        
//         case "SET_AUDIOFEATURES":
//             console.log('I wad hee');
//             return { ...state, audioFeatures: action.payload };
        
//         case "SET_ARESAVED":
//             console.log('I wad hee');
//             return { ...state, areSaved: action.payload };
    
//         case "SET_ARTISTSDATA":
//             console.log('I wad hee');
//             return { ...state, artistsData: action.payload };
        
//         case "SET_GENRES":
//             console.log('I wad hee');
//             return { ...state, genres: action.payload };
        
//         case "SET_INIT_STRUCT":
//             console.log('I wad hee');
//             return { ...state, init: action.payload };
        
//         default:
//             return state;
//     }
// }

// const initialState = {
//     playlistData: {},
//     audioFeatures: [{}],
//     areSaved: [],
//     artistsData: [],
//     genres: [],
//     init: [{
//         item: null,
//         audioFeature: null,
//         genres: null,
//         isSaved: null
//     }],
// }

// export function usePlaylitsAPICall() {
    
//     const [state, setState] = useRecoilState(mainState);
//     const [playlistTracks, setPlaylistTracks] = useRecoilState(selectedPlaylist);

//     const [stateReducer, dispatch] = useReducer(reducer, initialState);
//     let { playlistData, audioFeatures, areSaved, artistsData, genres, init } = stateReducer;

//     const setUserPlaylistData = async () => {
//         const data = await getUserPlaylistTracks(state.selectedPlaylist.info);
//         console.log(data, 0);
//         dispatch({ type: 'SET_PLAYLISTDATA', payload: data });
//     }

//     const setAudioFeatures = async () => {
//         const getAudioFeatures = await getTracksAudioFeatures(playlistData);
//         dispatch({ type: 'SET_PLAYLISTDATA', payload: getAudioFeatures });
//     }
    
//     const setAreSaved = async () => {
//         // PB with get result loop -> should always return an array, period.
//         const areSaved = await areTracksSavedByUser(playlistData);
//         dispatch({ type: 'SET_PLAYLISTDATA', payload: areSaved });
//     }

//     const setArtistsData = async () => {
//         //get tracks albums genres
//         const artistsData = await getArtistsGenres(playlistData);
//         dispatch({ type: 'SET_ARTISTSDATA', payload: artistsData });
//     }

//     const setGenres = () => {
//         const allGenres = getArrayOfGenres(artistsData.artists);
//         const genresFromArtists = artistsData.artists.map(artist => artist.genres);
//         dispatch({ type: 'SET_GENRES', payload: genresFromArtists });
//     }

//     const setInitStruct = () => {
//         // Initial Structure
//         const initStruct = dataStructureTracks(data, audioFeatures, genres, areSaved);
//         dispatch({ type: 'SET_INIT', payload: initStruct });
//     }

//     const getData = async () => {
//         await setUserPlaylistData();
//         console.log(stateReducer, 1);
//         await setAudioFeatures();
//                 console.log(stateReducer, 2);
//         await setAreSaved();
//                 console.log(stateReducer, 3);
//         await setArtistsData();
//                 console.log(stateReducer, 4);
//         setGenres();
//                 console.log(stateReducer, 5);
//         setInitStruct();
//                 console.log(stateReducer, 6);

//         setPlaylistTracks(current => ({
//             ...current,
//             info: stateReducer.playlistData.info,
//             items: stateReducer.playlistData.items,
//             audioFeatures,
//             genres,
//             // allGenres
//         }));
//     }

//     return {
//         stateReducer,
//         getData
//     }
// }