import { atom, useRecoilState } from "recoil";

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

    const setToken = (token) => {
        setState(current => ({...current, token}));
    }

    const getToken = () => {
        return state.token;
    }

    return {
        state,
        setToken,
        getToken,
    }
}


