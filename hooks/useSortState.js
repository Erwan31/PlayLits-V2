import React, { useEffect, useState } from 'react'
import { atom, useRecoilState } from 'recoil';
import {
    computeSlidersValues, sortOnDirection, newSortListIII,
    sortByFeature, sortList
} from './utils/utilsSortState';

export const slidersState = atom({
  key: 'slidersState',
  default: {
      danceability: 0,
      energy: 0,
      valence: 0,
      instrumentalness: 0,
      liveness: 0,
      acousticness: 0,
      liveness: 0,
      speechiness: 0,
  },
});

const sortedState = atom({
    key: 'sortedState',
    default: {
        actual: [],
        initial: [],
        length: 0
    }
});

const featureSortingState = atom({
    key: 'featureSortingState',
    default: {
        feature: null,
        prevFeature: null,
        direction: 'none',
        icon: <div></div>
    }
});

const onlySavedState = atom({
    key: 'onlySavedState',
    default: false
});

const lowPassFilterState = atom({
    key: 'lowPassFilterState',
    default: true
});

export default function useSortState() {

    const [slidersValues, setSlidersValues] = useRecoilState(slidersState);
    const [sortedTracks, setSortedTracks] = useRecoilState(sortedState);
    const [featureSorting, setFeatureSorting] = useRecoilState(featureSortingState);
    const [onlySaved, setOnlySaved] = useRecoilState(onlySavedState);
    const [lowPassFilter, setLowPassFilter] = useRecoilState(lowPassFilterState);

    const initSortState = (init) => {
        setOnlySaved(current => false);
        setFeatureSorting(current => ({...current, ...featureSortingState}));
        setSortedTracks(current => ({ ...current, actual: init, initial: init, length: init.length }));
    }

    const handleOnlySaved = () => {
        setOnlySaved(current => !current);
    }

    const handleLowPass = () => {
        setLowPassFilter(current => !current);
    }

    const handleFeatureSortingClick = (newFeature) => () => {
        const { feature, sorted } = sortByFeature(newFeature, featureSorting, sortedTracks, slidersValues, onlySaved);
        setFeatureSorting(current => ({ ...current, ...feature }));
        setSortedTracks(current => ({ ...current, actual: [...sorted] }));
    }
    
    useEffect(() => {
        if (sortedTracks.length > 0) {
            let sorted = onlySaved ? sortedTracks.actual.filter(track => track.isSaved) : sortList(slidersValues, sortedTracks.initial);
            sorted = sortOnDirection(sorted, featureSorting);
            setSortedTracks(current => ({ ...current, actual: sorted, length: sorted.length }));
        }
    }, [onlySaved]);

    useEffect(() => {
        if (sortedTracks.length > 0) {
            // Initial tracks need to be sorted base on onlySaved Parameter first
            let toSort = [];
            if (onlySaved) {
                toSort = sortedTracks.initial.filter(track => track.isSaved);
            }
            else {
                toSort = sortedTracks.initial;
            }

            let sorted = newSortListIII(slidersValues, toSort, lowPassFilter);
            sorted = sortOnDirection(sorted, featureSorting);

            setSortedTracks(current => ({ ...current, actual: sorted, length: sorted.length }));
        }
    }, [lowPassFilter]);

    useEffect(() => {
        if (sortedTracks.length > 0) {
            let sorted = newSortListIII(slidersValues, sortedTracks.initial, lowPassFilter);

            //Sorting based on direction
            if (onlySaved) {
                sorted = sorted.filter(track => track.isSaved);
            }

            sorted = sortOnDirection(sorted, featureSorting);

            setSortedTracks(current => ({ ...current, actual: sorted, length: sorted.length }));
        }
    }, [slidersValues]);

    const resetSortState = () => {
        setOnlySaved(false);
        setLowPassFilter(true);
        setSlidersValues(current => ({
            ...current,
            danceability: 0,
            energy: 0,
            valence: 0,
            instrumentalness: 0,
            liveness: 0,
            acousticness: 0,
            liveness: 0,
            speechiness: 0,
        }));
        setFeatureSorting(current => ({
            ...current,
            feature: null,
            prevFeature: null,
            direction: 'none',
            icon: <div></div>
        }));
        setSortedTracks(current => ({
            ...current,
            actual: [],
            initial: [],
            length: 0
        }))
    }
    
    return {
        handleOnlySaved,
        handleLowPass,
        handleFeatureSortingClick,
        initSortState,
        sortedTracks,
        onlySaved,
        lowPassFilter,
        featureSorting,
        resetSortState,
    }
}