import { atom, useRecoilState } from 'recoil';

export const localStorageState = atom({
  key: 'localStorageState',
  default: {
      user: {
          display_name: null,
          external_urls: {},
          followers: {},
          href: null,
          id: null,
          images: [],
          type: null,
          uri: null,
      },
      token: {
        access_token: null,
        token_type: null,
        expires_in: null
      },
      selectedPlaylits: []
  },
});

export const keyLocalStorage = "playlits-cache";

export default function useLocalStorage() {

    const [localStorageValue, setLocalStorageValue] = useRecoilState(localStorageState);

    const initLocalStorageValue = (values) => {
        setLocalStorageValue(current => ({
            ...current,
            ...values
        }));
    }

    const setLocalTokenState = (token) => {
        setLocalStorageValue(current => ({
            ...current,
            token
        }));
        window.localStorage.setItem(keyLocalStorage , JSON.stringify({...localStorageValue, token}));
    }

    const getLocalTokenState = () => {
        const localValues = JSON.parse(window.localStorage.getItem(keyLocalStorage ));
        if (localValues !== localStorageValue) {
            initLocalStorageValue(localValues);
        };
        return localStorageValue.token;
    }

    const setLocalUserIdState = (user) => {
        setLocalStorageValue(current => ({
            ...current,
            user
        }));
        window.localStorage.setItem(keyLocalStorage , JSON.stringify({...localStorageValue, user}));
    }

    const getLocalUserIdState = () => {
        return localStorageValue.user.id;
    }

    // Only set once, when going to ...slug
    const setPlaylistsLocalState = (playlists) => {
        setLocalStorageValue(current => ({
            ...current,
            selectedPlaylits: [...playlists]
        }));
        window.localStorage.setItem(keyLocalStorage , JSON.stringify({...localStorageValue, selectedPlaylits: [...playlists]}));
    }

    const getLocalPlaylistsState = () => {
        return localStorageValue.selectedPlaylits[0];
    }

    return {
        setLocalTokenState,
        getLocalTokenState,
        setLocalUserIdState,
        getLocalUserIdState,
        setPlaylistsLocalState,
        getLocalPlaylistsState
    }
}

// utils
export function getLocalToken() {
    return JSON.parse(window.localStorage.getItem(keyLocalStorage)).token;
}

export function getUserId() {
    return JSON.parse(window.localStorage.getItem(keyLocalStorage)).user.id;
}

export function getLocalSelectedPlaylists() {
    return JSON.parse(window.localStorage.getItem(keyLocalStorage)).selectedPlaylits;
}

