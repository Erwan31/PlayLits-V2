import { Box, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import classNames from 'classnames'
import { useRecoilState } from 'recoil';
import { errorState, mainState, selectedPlaylist, slidersState } from '../../utils/States/states';
import { sortList, dataStructureTracks, computeSlidersValues, newSortList, sortByFeature, sortOnDirection } from '../../utils/playlits/utils';
import { getArrayOfGenres } from '../../utils/getters';
import CreatePlaylistPanel from '../../Components/playlits/Containers/CreatePlaylistPanel';
import PlaylitsPanel from '../../Components/playlits/Containers/PlaylitsPanel';
import TrackList from '../../Components/playlits/Containers/TrackList'
import HeaderFooter from '../../Components/HeaderFooter/HeaderFooter';
import ScrollBarsCustom from '../../Components/ScrollBarsCustom';
import LoadingRings from '../../Components/LoadingRings'
// To Out
import ThrowError from '../../Components/Errors/ThrowError';
import { getPlaylistData } from '../../hooks/getPlaylistData';

const useStyles = makeStyles(theme => ({
    playlitsPanel: {
        backgroundColor: '#2C3049',
        // minHeight: 200,
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    responsiveContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        padding: '80px 2rem 0 2rem',
        alignItems: 'flex-start',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    },
    marginBottom: {
        marginBottom: theme.spacing(3)
    }
}));

/* Framer Motion Variants */
const container = {
    hidden: { opacity: 0, scale: 1 },
    visible: {
        opacity: [0, 1],
        scale: 1,
        transition: {
            ease: 'easeIn',
            // delay: 0.3,
            // delayChildren: 0.3,
            // staggerChildren: 0.4
        }
    },
    exit: {
        opacity: [1, 0, 0, 0],
        scale: [1, 0.5, 1],
        transition: {
            ease: 'easeOut',
            // delayChildren: 0.3,
            // staggerChildren: 0.4
        }
    }
};

const initialState = {
    initStruct: [],
    onlySaved: false,
    sortedTracks: [],
    featureSorting: {
        feature: null,
        prevFeature: null,
        direction: 'none'
    }
}

export default function Playlits() {

    // API call -> to externalize into a reducer
    const classes = useStyles();
    // Recoil
    const [state, setState] = useRecoilState(mainState);
    const [playlistTracks, setPlaylistTracks] = useRecoilState(selectedPlaylist);
    const [slidersValues, setSliderValue] = useRecoilState(slidersState);
    const [error, setError] = useRecoilState(errorState);

    const [onlySaved, setOnlySaved] = useState(false);
    const [sortedTracks, setSortedTracks] = useState({ actual: [], initial: [] });
    const [lengthArr, setLengthArr] = useState(0);
    const [featureSorting, setFeatureSorting] = useState({ feature: null, prevFeature: null, direction: 'none', icon: <div></div> });

    const handleOnlySaved = () => {
        setOnlySaved(current => !current);
    }

    const handleGenresSelect = (selection) => {
        setGenresSelected(selection);
    }

    const handleError = (error) => {
        console.log('on arrive là??', error)
        setError(current => ({ ...current, hasError: true, response: error }));
    }

    const handleFeatureSortingClick = (newFeature) => () => {
        console.log(newFeature, featureSorting, sortedTracks, slidersValues, sortedTracks.init, onlySaved)
        const { feature, sorted } = sortByFeature(newFeature, featureSorting, sortedTracks.actual, slidersValues, sortedTracks.initial, onlySaved);
        setFeatureSorting(current => ({ ...current, ...feature }));
        setSortedTracks(current => ({ ...current, actual: [...sorted] }));
    }

    useEffect(() => {
        async function initData() {

            const handle = (promise) => {
                return promise
                    .then(data => ([data, undefined]))
                    .catch(error => Promise.resolve([undefined, error]));
            }

            const [{
                data,
                audioFeatures,
                areSaved,
                artistsData,
                allGenres,
                genres,
                init
            },
                err] = await handle(getPlaylistData(state, handleError));
            if (err) { handleError(err) };

            const getSlidersValues = computeSlidersValues(init);

            console.log(init)

            setPlaylistTracks(current => ({
                ...current,
                info: data.info,
                items: data.items,
                audioFeatures,
                genres,
                allGenres
            }));
            setSortedTracks(current => ({ ...current, actual: init, initial: init }));
            setSliderValue(current => ({ ...current, ...getSlidersValues }));
            setLengthArr(init.length);
        }

        // throw new Error('B');
        initData();
    }, []);

    // Compute coeff and sort tracks
    useEffect(() => {
        if (sortedTracks.actual.length > 0) {
            let sorted = newSortList(slidersValues, sortedTracks.actual, sortedTracks.initial);

            //Sorting based on direction
            if (onlySaved) {
                sorted = sorted.filter(track => track.isSaved);
            }

            sorted = sortOnDirection(sorted, featureSorting);

            setLengthArr(sorted.length);
            setSortedTracks(current => ({ ...current, actual: sorted }));
        }
    }, [slidersValues]);

    useEffect(() => {
        if (sortedTracks.actual.length > 0) {
            const sorted = onlySaved ? sortedTracks.current.filter(track => track.isSaved) : sortList(slidersValues, sortedTracks.initial);
            length = sorted.length;
            setSortedTracks(current => ({ ...current, actual: sorted }));
            setLengthArr(length);
        }
    }, [onlySaved]);

    return (
        <HeaderFooter backButton={true}>
            <ScrollBarsCustom
                height={'100vh'}
                width={'100%'}
                autoHide={true}
                autoHideTimeout={500}
                autoHideDuration={200}
                universal={true}
            >
                {sortedTracks.actual.length === 0 ?
                    <LoadingRings />
                    :
                    <motion.div
                        className="container"
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={classes.responsiveContainer}
                    >
                        <Box
                            m='1rem auto'
                            // p='80px 2rem 0 2rem'
                            css={{
                                maxWidth: 650,
                                minWidth: 350,
                                width: '100%'
                            }}
                        >
                            <Paper elevation={15} className={classes.playlitsPanel}>
                                <PlaylitsPanel
                                    genres={playlistTracks.allGenres}
                                    handleDirection={null}
                                    handleGenresSelect={handleGenresSelect}
                                    handleOnlySaved={handleOnlySaved}
                                    sortedTracks={sortedTracks.actual}
                                    // direction={direction}
                                    onlySaved={onlySaved}
                                    length={lengthArr}
                                    onClick={handleFeatureSortingClick}
                                    sorting={featureSorting}
                                />
                            </Paper>
                            <Paper elevation={15} className={classNames(classes.marginBottom, classes.playlitsPanel)}>
                                <CreatePlaylistPanel sortedTracks={sortedTracks.actual} />
                            </Paper>
                        </Box>
                        <Box
                            m='1rem auto'
                            // p='0 2rem 0 2rem'
                            p='0 0.5rem'
                            css={{
                                maxWidth: 650,
                                minWidth: 350,
                                width: '100%'
                            }}
                        >
                            <TrackList list={sortedTracks.actual} />
                        </Box>
                    </motion.div>}
            </ScrollBarsCustom>
            {error.hasError && <ThrowError response={error.response} />}
        </HeaderFooter>
    )
}
