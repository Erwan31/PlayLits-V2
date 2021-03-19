
import DecreaseIcon from '../../Components/IconsJSX/DecreaseIcon';
import IncreaseIcon from '../../Components/IconsJSX/IncreaseIcon';
import { getArrayOfAudioFeature, getTrackID } from '../../utils/getters';

export function computeTrackFeatureCoefficient(track, sliderValues, averages){

    let coeff = 0;

    for (const property in averages) {
        coeff += ((track.audioFeature[property] * sliderValues[property]) / averages[property]);
    }

    return coeff;
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

    // console.log(Math.min(...getArrayOfAudioFeature(list, 'acousticness')))
    for (const property in minAndMax) {
        minAndMax[property] = {
            min: Math.min(...getArrayOfAudioFeature(list, property)),
            max: Math.max(...getArrayOfAudioFeature(list, property)),
        };
    }
    
    return minAndMax;
}

export function sortList(slidersValues, list) {
    const sortedIDs = sortedIdsList(slidersValues, list);
    const sorted = sortedIDs.map(item => list.filter(track => getTrackID(track.item) === item.id)[0]);

    return sorted
}

export function sortByAscFeature(list, feature) {
    // console.log(list, feature);
    let arr = [...list];
    let sorted = arr.sort((a, b) => {
        return a.audioFeature[feature] - b.audioFeature[feature];
    });
    return sorted;
}

export const sortByFeature = (newFeature, featureSorting, sortedTracks, slidersValues, onlySaved) => {
    if (sortedTracks.length > 0) {

        let { feature, prevFeature, direction, icon } = featureSorting;
        let sorted = sortedTracks.actual;
        let initStruct = sortedTracks.initial;

        if (prevFeature === newFeature) {
            switch (direction) {
                case 'none':
                    direction = 'asc'
                    sorted = sortByAscFeature(sorted, newFeature);
                    icon = <IncreaseIcon />
                    break;

                case 'asc':
                    direction = 'desc'
                    sorted = reverseOrder(sorted);
                    icon = <DecreaseIcon />
                    break;

                case 'desc':
                    direction = 'none'
                    sorted = newSortList(slidersValues, sorted, initStruct);
                    //Sorting based on direction
                    if (onlySaved) {
                        sorted = sorted.filter(track => track.isSaved);
                    }
                    icon = <div></div>
                    break;
            }
        }
        else {
            direction = 'asc'
            sorted = sortByAscFeature(sorted, newFeature);
            icon = <IncreaseIcon />
        }

        return {
            feature: { feature: newFeature, prevFeature: feature, direction, icon},
            sorted
        }
    }
};

export const sortOnDirection = (list, featureSorting) => {
    const { direction } = featureSorting;
    let sorted = list;

    switch (direction) {
        case 'asc':
            sorted = sortByAscFeature(sorted, featureSorting.feature);
            break;

        case 'desc':
            sorted = sortByAscFeature(sorted, featureSorting.feature);
            sorted = reverseOrder(sorted);
            break;
    }

    return sorted;
}

export function newSortList(slidersValues, previousList, list) {

    let sorted = list;

    for (const property in slidersValues) {
        sorted = sorted.filter(track =>
            track.audioFeature[property] < (slidersValues[property].max + 0.00001)
        )
        .filter(track =>
            track.audioFeature[property] > (slidersValues[property].min - 0.00001)
        );
    }

    if (sorted.length < 10) sorted = previousList;

    return sorted;
}

export function sortedIdsList(slidersValues, list) {
    
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

export const sortByAscCoef = (arr) => {
    const sorted = arr.sort( (a, b) =>{
        return a.coeff- b.coeff
    });
    return sorted;
}

export const reverseOrder = (arr) => {
    // Used with reverse state condition
    let toSort = [...arr];
    const sorted = toSort .reverse();
    return sorted;
}