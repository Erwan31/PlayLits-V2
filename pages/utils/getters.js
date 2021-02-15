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


