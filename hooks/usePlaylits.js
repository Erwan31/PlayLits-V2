const initialState = {
    initStruct: [],
    onlySaved: false,
    sortedTracks: [],
    featureSorting: {
        feature: null,
        prevFeature: null,
        direction: 'none'
    },
    slidersValues: {
        acousticness: { min: null, max: null },
        danceability: { min: null, max: null },
        energy: { min: null, max: null },
        instrumentalness: { min: null, max: null },
        liveness: { min: null, max: null },
        valence: { min: null, max: null },
        speechiness: { min: null, max: null }
    }
}

export function usePlaylits({}) {
    
}