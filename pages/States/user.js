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
      user: {},
      token: {},
      playlists: {}
  },
});


export const slidersState = atom({
  key: 'slidersState',
  default: {
    
  }
})