export function getTrackAlbumImage(item) {
    return item.track.album.images[1] || item.track.album.images[0];
}

export function getTrackName(item) {
    return item.track.name;
}

export function getArtistsNames(item) {
    let artists = '';

    item.track.album.artists.map((artist, index) => {
        if (index === 0) {
            artists = artist.name.toString();
        }
        else {
            artists += ', ' + artist.name.toString();
        }
    });
    
    return artists;
}

export function getTrackID(item) {
    if (item.hasOwnProperty('audioFeature')) return item.audioFeature.id;
    if (item.hasOwnProperty('track')) return item.track.id;
    if (item.hasOwnProperty('item')) return item.item.track.id;
    return item.id;
}

export function getTrackURI(item) {
    if (item.hasOwnProperty('item')) return item.item.track.uri;
    return item.id;
}

export function getPreviewUrl(item) {
    if (item.hasOwnProperty('track')) return item.track.preview_url;
    if (item.hasOwnProperty('item')) return item.item.track.preview_url;
    return null;
}

export function getLength(list) {
    if (list.length > 0) return list.length;
    return list.info.total;
}

export function getSpotifyURL(data) {
    if (data.hasOwnProperty('playlistCreated')) return data.playlistCreated.data.external_urls.spotify;
    if (data.hasOwnProperty('data')) return data.data.external_urls.spotify;
    if (data.hasOwnProperty('external_urls')) return data.external_urls.spotify;
    if(data.hasOwnProperty('item')) return data.item.track.external_urls.spotify;
}

export function getPlaylistID(playlist) {
    return playlist.id;
}

export function getArrayOfAudioFeature(arr, feature) {
    return arr.map(track => track.audioFeature[feature]);
}

export function getArrayOfArtistsIDs(arr) {
    return arr.map(obj => obj.track.artists[0].id);
}

export function getArrayOfGenres(arr) {
    const join = []; // content {genre: null, ids: []}

    arr.map(artist => {
        const id = artist.id;
        artist.genres.forEach(el => {
            let joinEl = join.find(genreEl => genreEl.genre === el);
            if (joinEl === undefined) {
                join.push({ genre: el, ids: [id] });
            }
            else {
                const index = join.indexOf(joinEl);
                join[index] = { genre: el, ids: [...joinEl.ids, id] };
            }
        })
    });

    return join;
}

export function filterGenres(arr) {
    const join = [];
    arr.forEach(el => !join.includes(el) && join.push(el));
    return join;
}

export function getLinearColor(color) {

    const init = hexToRgb(color);
    const rgbArr = [init];

    for (let index = 1; index < 5; index++) {
        rgbArr.push({ r: rgbArr[index - 1].r * 1.1, g: rgbArr[index - 1].g * 1.1, b: rgbArr[index - 1].b * 1.3 });
    }

    return `linear-gradient(to right, rgb(${rgbArr[0].r}, ${rgbArr[0].g}, ${rgbArr[0].b}), rgb(${rgbArr[1].r}, ${rgbArr[1].g}, ${rgbArr[1].b}), rgb(${rgbArr[2].r}, ${rgbArr[2].g}, ${rgbArr[2].b}), rgb(${rgbArr[3].r}, ${rgbArr[3].g}, ${rgbArr[3].b}), rgb(${rgbArr[4].r}, ${rgbArr[4].g}, ${rgbArr[4].b}))`;
}

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export function linkToSpotify(data) {
    window.open(getSpotifyURL(data), '_blank');
}

