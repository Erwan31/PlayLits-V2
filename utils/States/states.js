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
    audioFeatures: [],
    genres: [],
    allGenres: []
  },
  init: [{
    item: null,
    audioFeature: null,
    genres: null,
    isSaved: null
  }],
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
      // tracks: [0, 10],
      danceability: [0, 1],
      energy: [0, 1],
      valence: [0, 1],
      instrumentalness: [0, 1],
      liveness: [0, 1],
      acousticness: [0, 1],
      liveness: [0, 1],
      speechiness: [0, 1],
  //   },
  //   reverse: null,
  },
  // genres: {},
});

export const errorState = atom({
  key: 'error',
  default: {
    hasError: false,
    info: {},
  }
});

export const SLIDERSINIT = {
  danceability: 0,
  energy: 0,
  valence: 0,
  instrumentalness: 0,
  liveness: 0,
  crises: 0,
  acousticness: 0,
  liveness: 0,
  speechiness: 0,
};