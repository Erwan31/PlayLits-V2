import React, { useEffect, useState } from 'react'
import { atom, useRecoilState } from 'recoil';
import {
    computeSlidersValues, sortOnDirection, newSortList,
    sortByFeature, sortList
} from './utils/utilsSortState';

export const slidersState = atom({
  key: 'slidersState',
  default: {
      danceability: [0, 1],
      energy: [0, 1],
      valence: [0, 1],
      instrumentalness: [0, 1],
      liveness: [0, 1],
      acousticness: [0, 1],
      liveness: [0, 1],
      speechiness: [0, 1],
  },
});

export const sortedState = atom({
    key: 'sortedState',
    default: {
        actual: [],
        initial: [],
        length: 0
    }
})

export default function useSortState() {

    const [slidersValues, setSliderValue] = useRecoilState(slidersState);
    const [sortedTracks, setSortedTracks] = useRecoilState(sortedState);
    const [featureSorting, setFeatureSorting] = useState({ feature: null, prevFeature: null, direction: 'none', icon: <div></div> });
    const [onlySaved, setOnlySaved] = useState(false);

    const handleOnlySaved = () => {
        setOnlySaved(current => !current);
    }

    const handleFeatureSortingClick = (newFeature) => () => {
        const { feature, sorted } = sortByFeature(newFeature, featureSorting, sortedTracks, slidersValues, onlySaved);
        setFeatureSorting(current => ({ ...current, ...feature }));
        setSortedTracks(current => ({ ...current, actual: [...sorted] }));
    }

    useEffect(() => {
        if (sortedTracks.length > 0) {
            const sorted = onlySaved ? sortedTracks.current.filter(track => track.isSaved) : sortList(slidersValues, sortedTracks.initial);
            setSortedTracks(current => ({ ...current, actual: sorted, length: sorted.length }));
        }
    }, [onlySaved]);

    useEffect(() => {
        if (sortedTracks.length > 0) {
            let sorted = newSortList(slidersValues, sortedTracks.actual, sortedTracks.initial);

            //Sorting based on direction
            if (onlySaved) {
                sorted = sorted.filter(track => track.isSaved);
            }

            sorted = sortOnDirection(sorted, featureSorting);

            setSortedTracks(current => ({ ...current, actual: sorted, length: sorted.length }));
        }
    }, [slidersValues]);

    const initSortState = (init) => {
        const getSlidersValues = computeSlidersValues(init);
        setSortedTracks(current => ({ ...current, actual: init, initial: init, length: init.length }));
        setSliderValue(current => ({ ...current, ...getSlidersValues }));
    }
    
    return {
        handleOnlySaved,
        handleFeatureSortingClick,
        initSortState,
        sortedTracks,
        onlySaved,
        featureSorting
    }
}