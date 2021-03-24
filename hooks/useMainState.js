import to from "await-to-js";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { cleanHash } from "../api/hash";
import { getUserInfo, getUserPlaylists } from "../api/spotifyAPICall";
import useError from "./useError";
import useLocalStorage from "./useLocalStorage";

export const mainState = atom({
  key: 'mainState',
  default: {
      infoLoaded: false,
      user: {
      },
      token: {
        access_token: null,
        expires_in: null,
        token_type: null
      },
      playlists: {
        href: null,
        items: [],
        limit: null,
        next: null,
        offset: null,
        previous: null,
        total: null
      },
      selectedPlaylist: {
        collaborative: null,
        description: null,
        external_urls: {},
        href: null,
        id: null,
        images: [],
        name: null,
        owner: {},
        primary_color: null,
        public: null,
        snapshot_id: null,
        tracks: {
          href: null,
          total: null
        },
        type: null,
        uri: null,
      },
  },
});

export default function useMainState() {

  const [state, setState] = useRecoilState(mainState);
  const { handleError } = useError();
  const {
        setLocalTokenState,
        setLocalUserIdState,
  } = useLocalStorage();

  const setToken = (token) => {
    setState(current => ({ ...current, token }));
    setLocalTokenState(token);
  }
  
  const addNewPlaylistItems = (nextPlaylists) => {
    setState(current => ({
        ...current,
        playlists: {
            items: [...current.playlists.items, ...nextPlaylists.items],
            next: nextPlaylists.next,
        },
    }));
  }

  const getToken = () => {
    return state.token;
  }

  const handlePlaylistSelect = (playlist) => () => {
    setState(current => ({ ...current, selectedPlaylist: playlist }));
  }

  // Get playlist data then
  useEffect(async () => {
    const { token, infoLoaded } = state;

    if (token.access_token !== null && !infoLoaded) {
      cleanHash();

      
      const [err0, userInfo] = await to(getUserInfo());
      if (err0) { handleError(err0) };

      setLocalUserIdState(userInfo);  

      const [err1, userPlaylists] = await to(getUserPlaylists(null, userInfo.id));
      if (err1) { handleError(err1) };

      setState(current => ({ ...current, infoLoaded: true, user: userInfo, playlists: userPlaylists }));
    }
  }, [state.token]);

  return {
    state,
    setToken,
    getToken,
    addNewPlaylistItems,
    handlePlaylistSelect
  }
}


