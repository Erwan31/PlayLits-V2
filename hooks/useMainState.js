import to from "await-to-js";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { cleanHash } from "../api/hash";
import { getUserInfo, getUserPlaylists } from "../api/spotifyAPICall";
import useError from "./useError";

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
      },
  },
});

export default function useMainState() {

  const [state, setState] = useRecoilState(mainState);
  const { error, handleError } = useError();

    const setToken = (token) => {
        setState(current => ({...current, token}));
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

  // Get playlist data then
  useEffect(async () => {
    const { token, infoLoaded } = state;

    if (token.access_token !== null && !infoLoaded) {
        // let userInfo = window.localStorage.getItem("pl_user_id");
        cleanHash();

        const [err0, userInfo] = await to(getUserInfo());
        if (err0) { handleError(err0) };

        window.localStorage.setItem("pl_user_id", userInfo.id);

        const [err1, userPlaylists] = await to(getUserPlaylists(null));
        if (err1) { handleError(err1) };

        setState(current => ({ ...current, infoLoaded: true, user: userInfo, playlists: userPlaylists }));
    }
  }, [state.token]);

  return {
    state,
    setToken,
    getToken,
    addNewPlaylistItems,
  }
}


