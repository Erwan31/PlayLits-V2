import { getArrayOfAudioFeature } from "../utils/getters";

export function audioFeaturesIdsString(tracks) {

    let idsAF = [];

    //Get tracks ids and request audio features
    for(let i = 0; i < tracks.items.length; i++){
        idsAF.push(tracks.items[i].track.id);
    }

    return idsAF.join(",");
}

export function sortedList(slidersValues, direction = 'asc', genres, list) {
    
    //Compute average on the list of each feature and store them
    const averages = { acousticness: null, danceability: null, energy: null, instrumentalness: null, liveness: null, valence: null, speechiness: null };

    for (const property in averages) {
        averages[property] = getArrayOfAudioFeature(list.audioFeatures, property).reduce((a, b) => a+b) / list.audioFeatures.length;
    }

    console.log(slidersValues, direction = 'asc', genres, list);
    console.log(averages);
    // for (let index = 0; index < list.length; index++) {
    //     averages.acousticness = list        
    // }
    //Compute coeff for each track -> SumOf(sliderValue[feature]*trackFeature.value)/averageList[feature]
    //Return list of track ids+coeff
    //Sort based on reverse order
    //return sorted idsList
}

export function computeTrackFeatureCoefficient( trackAF, sliderValues){
    const dCoef = sliderValues.danceability;
    const eCoef = sliderValues.energy;
    const mCoef = sliderValues.mood;
    
    let coef = 0;
    sliderValues.map(item => (dCoef * trackAF.danceability) / average.avD +
               (eCoef*trackAF.energy)/average.avE + 
               (mCoef*trackAF.valence)/average.avM);

    return coef;
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
    const sorted = arr.sort( ( a, b) =>{
        return a[2]- b[2]
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