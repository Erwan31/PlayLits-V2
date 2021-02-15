export function getTrackAlbumImage(item) {
    return item.track.album.images[1] || item.track.album.images[0];
}

export function getTrackName(item) {
    return item.track.name;
}

export function getArtistsNames(item) {
    // let string = '',
    // item.map.((el, i) => string + el.track.album.artists[i])
    return item.track.album.artists[0].name;
}

export function getTrackID(item){
    return item.track.id;
}

export function getPlaylistInfoLength(list) {
    return list.info.items.length;
}

export function getPlaylistID(playlist) {
    return playlist.id;
}

export function getArrayOfAudioFeature(arr, feature) {
    console.log(arr.map(track => track[feature.toLowerCase()]), feature.toLowerCase(), 'toLowerCase');
    return arr.map(track => track[feature.toLowerCase()]);
}

