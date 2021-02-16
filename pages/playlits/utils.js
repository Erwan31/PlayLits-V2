import { getArrayOfAudioFeature, getTrackID } from "../utils/getters";

export function audioFeaturesIdsString(tracks) {

    let idsAF = [];

    //Get tracks ids and request audio features
    for(let i = 0; i < tracks.items.length; i++){
        idsAF.push(tracks.items[i].track.id);
    }

    return idsAF.join(",");
}

export function sortedIdsList(slidersValues, genres, list) {
    
    const computedList = [];
    let  sortedList = [];

    console.log('sortedList: ', slidersValues, genres, list);

    //Compute average on the list of each feature and store them
    const averages = { acousticness: null, danceability: null, energy: null, instrumentalness: null, liveness: null, valence: null, speechiness: null };

    for (const property in averages) {
        averages[property] = getArrayOfAudioFeature(list.audioFeatures, property).reduce((a, b) => a + b) / list.audioFeatures.length;
    }

    //Compute coeff for each track -> SumOf(sliderValue[feature]*trackFeature.value)/averageList[feature]
    //Return list of track ids+coeff
    list.audioFeatures.forEach(trackAF => {
        computedList.push({
            id: getTrackID(trackAF),
            coeff: computeTrackFeatureCoefficient(trackAF, slidersValues, averages)
        })
    });

    //Sort based on reverse order
    sortedList = sortByAscCoef(computedList);
    // if( direction === 'desc') do that out of the memoisation of the result

    //return sorted idsList
    return sortedList;
}

export function computeTrackFeatureCoefficient(trackAF, sliderValues, averages){

    let coeff = 0;

    for (const property in averages) {
        coeff += ((trackAF[property] * sliderValues[property]) / averages[property]);
    }

    return coeff;
}

export function averages(arr, features) {
    const av = [];
    av[0] = arr.map()
}

function averagePerFeature(arr, feature) {
    // console.log(arr.reduce( ( a, b ) => a[feature] + b[feature], 0 ) / arr.length);
    console.log(arr, feature);
//    return arr.reduce( ( a, b ) => a[feature] + b[feature], 0 ) / arr.length;
}

// Sorting functions
const sortByAscCriteria = (arr, parameter) => {
    const sorted = arr.sort(( a, b) =>{
        return a[1][parameter] - b[1][parameter]
    });
    return sorted;
}

const sortByAscCoef = (arr) => {
    const sorted = arr.sort( (a, b) =>{
        return a.coeff- b.coeff
    });
    return sorted;
}

const sortByDescCriteria = (arr, parameter) => {
    const sorted = arr.sort( ( a, b) =>
    b[parameter] - a[parameter]);
    return sorted;
}

// const reverseOrderButton = (arr) => {
//     const sorted = arr.reverse();
//     const reverse = !this.state.reverse;

//     this.setState({reverse, filteredTracksFeatures: sorted});
// }

const reverseOrder = (arr) => {
    // Used with reverse state condition
    const sorted = arr.reverse();
    return sorted;
}