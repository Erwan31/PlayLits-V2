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
    href: null,
    items: [],
    limit: null,
    next: null,
    offset: null,
    previous: null,
    total: null,
  }
});

export const slidersState = atom({
  key: 'slidersState',
  default: {
    
  }
});