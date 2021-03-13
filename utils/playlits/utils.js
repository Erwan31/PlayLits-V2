import { getArrayOfAudioFeature, getTrackID } from "../getters";

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

export function computeSlidersValues(list){
    //Compute average on the list of each feature and store them
    const minAndMax = {
        acousticness: { min: null, max: null },
        danceability: { min: null, max: null },
        energy: { min: null, max: null },
        instrumentalness: { min: null, max: null },
        liveness: { min: null, max: null },
        valence: { min: null, max: null },
        speechiness: { min: null, max: null }
    };

    console.log(Math.min(...getArrayOfAudioFeature(list, 'acousticness')))
    for (const property in minAndMax) {
        minAndMax[property] = {
            min: Math.min(...getArrayOfAudioFeature(list, property)),
            max: Math.max(...getArrayOfAudioFeature(list, property)),
        };
    }
    
    console.log(minAndMax, 'M&M');
    return minAndMax;
}

export function newSortList(slidersValues, previousList, list) {

    let sorted = list;

    console.log('before', sorted);

    for (const property in slidersValues) {
        sorted = sorted.filter(track =>
            track.audioFeature[property] < (slidersValues[property].max + 0.00001)
        )
        .filter(track =>
            track.audioFeature[property] > (slidersValues[property].min - 0.00001)
        );
    }

    if (sorted.length < 10) sorted = previousList;

    console.log('after', sorted);

    return sorted;
}

export function newSortListBySliderMove(slidersValues, previousList, list, sliderModified) {

    let sorted = list;

    sorted = sorted.filter(track => track.audioFeature[sliderModified] < slidersValues[sliderModified].max)
                .filter(track => track.audioFeature[sliderModified] > slidersValues[sliderModified].min);

    if (sorted.length < 10) sorted = previousList;

    return sorted;
}

export function sortList(slidersValues, list) {
    const sortedIDs = sortedIdsList(slidersValues, list);
    const sorted = sortedIDs.map(item => list.filter(track => getTrackID(track.item) === item.id)[0]);

    return sorted
}

function sortedIdsList(slidersValues, list) {
    
    const computedList = [];
    let  sortedList = [];

    //Compute average on the list of each feature and store them
    const averages = { acousticness: null, danceability: null, energy: null, instrumentalness: null, liveness: null, valence: null, speechiness: null };

    for (const property in averages) {
        averages[property] = getArrayOfAudioFeature(list, property).reduce((a, b) => a + b) / list.length;
    }

    //Compute coeff for each track -> SumOf(sliderValue[feature]*trackFeature.value)/averageList[feature]
    //Return list of track ids+coeff
    list.forEach(track => {
        computedList.push({
            id: getTrackID(track.item),
            coeff: computeTrackFeatureCoefficient(track, slidersValues, averages)
        })
    });

    //return sorted idsList
    sortedList = sortByAscCoef(computedList);

    //return sorted idsList
    return sortedList;

    
}

function computeTrackFeatureCoefficient(track, sliderValues, averages){

    let coeff = 0;

    for (const property in averages) {
        coeff += ((track.audioFeature[property] * sliderValues[property]) / averages[property]);
    }

    return coeff;
}

const sortByAscCoef = (arr) => {
    const sorted = arr.sort( (a, b) =>{
        return a.coeff- b.coeff
    });
    return sorted;
}

export const reverseOrder = (arr) => {
    // Used with reverse state condition
    const sorted = arr.reverse();
    return sorted;
}

export function dataStructureTracks(playlist, audioFeatures, genres, areSaved) {
    const struct = playlist.items.map((el, index) =>
    ({
        item: playlist.items[index],
        audioFeature: audioFeatures[index],
        genres: genres[index],
        isSaved: areSaved[index]
    }))

    return struct;
}