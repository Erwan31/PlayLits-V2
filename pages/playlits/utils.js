import { getArrayOfAudioFeature, getTrackID } from "../utils/getters";

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