import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import useLocalStorage from "./useLocalStorage";

export const playlistsSelectionState = atom({
  key: 'playlistsSelection',
    default: {
        route: null,
        name: null,
        selection: [],
        max: 5
    },
});

export const MAXSELECTION = 5;

export default function usePlaylistsSelection() {

    const [playlistsSelection, setPlaylistsSelection] = useRecoilState(playlistsSelectionState);
    const {
        setLocalTokenState,
        setLocalUserIdState,
        setPlaylistsLocalState,
    } = useLocalStorage();

    const addPlaylist = (playlist) => {
        if (playlistsSelection.selection.length < MAXSELECTION) {
            const newSelection = [playlist, ...playlistsSelection.selection];
            const route = assembleRouteString(newSelection);
            const name = assembleNameString(newSelection);
            setPlaylistsSelection(current => ({ ...current, route: route, name: name, selection: newSelection }));
        }
    }

    const retrievePlaylist = (playlist) => {
         // https://stackoverflow.com/questions/64957735/typeerror-cannot-assign-to-read-only-property-0-of-object-object-array-in
        let temp = [...playlistsSelection.selection];
        let newSelection = temp.filter(item => item !== playlist);
        const route = assembleRouteString(newSelection);
        const name = assembleNameString(newSelection);
        setPlaylistsSelection(current => ({ ...current, route:  route, name: name, selection: newSelection }));
    }

    const addOrRetrievePlaylist = (playlist) => {
        if (playlistsSelection.selection.find(el => el === playlist)) {
            retrievePlaylist(playlist);
        }
        else {
            addPlaylist(playlist);
        }
    }

    const initPlaylistSelection = () => {
        setPlaylistsSelection(current => ({ ...current, name: null, route: null, selection: [] }));
    }

    return {
        playlistsSelection,
        initPlaylistSelection,
        addOrRetrievePlaylist,
        retrievePlaylist
    }
}

//utils
function assembleRouteString(selection) {
    return selection.map(item => item.name).join('+');
}

function assembleNameString(selection) {
    return selection.map(item => item.name).join(', ');
}