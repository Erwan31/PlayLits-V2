import {atom,} from "recoil";
//
// export const selectedPlaylist = atom({
//     key: "selectedPlaylist",
//     default: {
//         info: {
//             href: null,
//             limit: null,
//             next: null,
//             offset: null,
//             previous: null,
//             total: null,
//         },
//         items: [],
//         audioFeatures: [],
//         genres: [],
//         allGenres: []
//     },
//     init: [{
//         item: null,
//         audioFeature: null,
//         genres: null,
//         isSaved: null
//     }],
// });

export const featureFlippingState = atom({
    key: "featureFlipping",
    default: false,
});

export const SLIDERSINIT = {
    key: 0,
    tempo: 0,
    danceability: 0,
    energy: 0,
    valence: 0,
    instrumentalness: 0,
    crises: 0,
    acousticness: 0,
    liveness: 0,
    speechiness: 0,
};