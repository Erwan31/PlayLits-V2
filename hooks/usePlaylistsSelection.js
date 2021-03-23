import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import useLocalStorage from "./useLocalStorage";

export const playlistsSelectionState = atom({
  key: 'playlistsSelection',
    default: {
        route: null,
        selection: []
    },
});

export default function usePlaylistsSelection() {

    const [playlistsSelection, setPlaylistsSelection] = useRecoilState(playlistsSelectionState);
    const {
        setLocalTokenState,
        setLocalUserIdState,
        setPlaylistsLocalState,
    } = useLocalStorage();

    const addPlaylist = (playlist) => {
        const newSelection = [playlist, ...playlistsSelection.selection];
        const route = assembleRouteString(newSelection );
        setPlaylistsSelection(current => ({ ...current, route, selection: newSelection }));
    }

    const retrievePlaylist = (playlist) => {
         // https://stackoverflow.com/questions/64957735/typeerror-cannot-assign-to-read-only-property-0-of-object-object-array-in
        let temp = [...playlistsSelection.selection];
        let newSelection = temp.filter(item => item !== playlist);
        const route = assembleRouteString(newSelection);
        setPlaylistsSelection(current => ({ ...current, route, selection: newSelection }));
    }

    const addOrRetrievePlaylist = (playlist) => {
        console.log('alo')
        if (playlistsSelection.selection.find(el => el === playlist)) {
            retrievePlaylist(playlist);
        }
        else {
            addPlaylist(playlist);
        }
    }

    const clearPlaylistSelection = () => {
        setPlaylistsSelection(current => ({ ...current, route: null, selection: [] }));
    }

    useEffect(() =>
        console.log(playlistsSelection.selection)
    ,[playlistsSelection.selection])

    return {
        playlistsSelection,
        clearPlaylistSelection,
        addOrRetrievePlaylist,
        retrievePlaylist
    }
}

//utils
function assembleRouteString(selection) {
    return selection.map(item => item.name).join('&');
}