export function audioFeaturesIdsString(tracks) {

    let idsAF = [];

    //Get tracks ids and request audio features
    for(let i = 0; i < tracks.items.length; i++){
        if(tracks.items[i].track.id !== null) idsAF.push(tracks.items[i].track.id);
    }
    return idsAF.join(",");
}

export function changeTracksNumber(list, limits) {

    const length = list.length;
    let min = limits[0];
    let max = limits[1];

    // New filtering based on the double thumb range of track change
    if ((max - min) !== length) {
        // To always have a minimum of 10 tracks inside the playlist
        // Manage collisions of the thumbs
        if (max - min < 10) {
            if (max + 5 < length) {
                max = max + 5;
                min = min - 5;
            }
            else {
                max = length;
                min = length - 10;
            }

            if (min - 5 < 0) {
                max = 10;
                min = 0;
            }
        }

        list = list.slice(min, max);
    }

    return list;
}

export function newSortListBySliderMove(slidersValues, previousList, list, sliderModified) {

    let sorted = list;

    sorted = sorted.filter(track => track.audioFeature[sliderModified] < slidersValues[sliderModified].max)
                .filter(track => track.audioFeature[sliderModified] > slidersValues[sliderModified].min);

    if (sorted.length < 10) sorted = previousList;

    return sorted;
}

export const reverseOrder = (arr) => {
    // Used with reverse state condition
    const sorted = arr.reverse();
    return sorted;
}

export function dataStructureTracks(items, audioFeatures, genres, areSaved) {
    const struct = items.map((el, index) =>
    ({
        item: items[index],
        audioFeature: audioFeatures[index],
        genres: genres[index],
        isSaved: areSaved[index]
    }))

    return struct;
}