import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

export const mainState = atom({
  key: 'mainState',
    default: {
      user: {
        config: {},
        data: {},
        header: {},
        request: {}
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

export const selectedPlaylist = atom({
  key: 'selectedPlaylist',
  default: {
    info: {
      href: null,
      limit: null,
      next: null,
      offset: null,
      previous: null,
      total: null,
    },
    items: [],
    audioFeatures: []
  }
});

export const slidersState = atom({
  key: 'slidersState',
  default: {
    // tracks: {
    //   min: null,
    //   max: null,
    // },
    // filtered: {
    //   number: null,
    // },
    // coeff: {
      tracks: [null, null],
      valence: null,
      energy: null,
      valence: null,
      instrumentalness: null,
      liveness: null,
      crises: null,
      acousticness: null,
      liveness: null,
      speechiness: null,
  //   },
  //   reverse: null,
  },
  // genres: {},
});