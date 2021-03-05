import { Box, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import HeaderFooter from '../Components/HeaderFooter/HeaderFooter'
import { mainState, selectedPlaylist, slidersState } from '../States/states'
import { useRecoilState } from 'recoil';
import TrackList from './TrackList';
import ScrollBarsCustom from '../Components/ScrollBarsCustom';
import { sortList, changeTracksNumber, dataStructureTracks } from './utils';
import { reverseOrder } from './utils'
import { getArrayOfGenres } from '../utils/getters';
import CreatePlaylistPanel from './CreatePlaylistPanel';
import PlaylitsPanel from './PlaylitsPanel';
import { motion } from 'framer-motion';
import LoadingRings from '../Components/LoadingRings';
import classNames from 'classnames'

// To Out
import {
    areTracksSavedByUser, getArtistsGenres, getTracksAudioFeatures,
    getUserPlaylistTracks
} from '../api/spotifyAPICall';


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

export default function Playlits() {

    const classes = useStyles();
    // Recoil
    const [state, setState] = useRecoilState(mainState);
    const [playlistTracks, setPlaylistTracks] = useRecoilState(selectedPlaylist);
    const [slidersValues, setSliderValue] = useRecoilState(slidersState);
    // Local
    const [initStruct, setInitStruct] = useState([]);
    const [direction, setDirection] = useState('asc');
    const [onlySaved, setOnlySaved] = useState(false);
    const [sortedTracks, setSortedTracks] = useState([]);
    const [genresSelected, setGenresSelected] = useState([]);

    const handleDirection = () => {
        direction === 'asc' ? setDirection('desc') : setDirection('asc');
    }

    const handleOnlySaved = () => {
        setOnlySaved(current => !current);
    }

    const handleGenresSelect = (selection) => {
        setGenresSelected(selection);
    }

    // API call -> to externalize into a reducer
    useEffect(async () => {
        const data = await getUserPlaylistTracks(state.selectedPlaylist.info, state.token.access_token);
        let audioFeatures = await getTracksAudioFeatures(data);
        // PB with get result loop -> should always return an array, period.
        audioFeatures = audioFeatures[0].audio_features;
        console.log(audioFeatures);
        const areSaved = await areTracksSavedByUser(data);
        //get tracks albums genres
        const artistsData = await getArtistsGenres(data);
        const allGenres = getArrayOfGenres(artistsData.artists);
        const genres = artistsData.artists.map(artist => artist.genres);
        // Initial Structure
        const init = dataStructureTracks(data, audioFeatures, genres, areSaved);

        setInitStruct(init);
        setPlaylistTracks(current => ({
            ...current,
            info: data.info,
            items: data.items,
            audioFeatures,
            genres,
            allGenres
        }));
        setSortedTracks(init);
        setSliderValue(current => ({ ...current, tracks: [0, audioFeatures.length] }));
    }, []);


    // Compute coeff and sort tracks
    useEffect(() => {
        if (sortedTracks.length > 0) {
            // Sorting by Coeff based on features sliders values
            let sorted = sortList(slidersValues, initStruct);
            // Sorting based on direction
            if (direction !== 'asc') {
                sorted = reverseOrder(sorted);
            }

            // Sorting based on direction
            if (onlySaved) {
                sorted = sorted.filter(track => track.isSaved);
            }

            // Sorting based on tracks slider -> placed here so that its retrieving the right part of the list
            sorted = changeTracksNumber(sorted, slidersValues.tracks);

            // Sorting by genres 
            // console.log(genresSelected, 'GS')
            // if (genresSelected !== []) {
            //     sorted = sorted.filter(track => {
            //         let bool = true;
            //         track.genres.forEach(genre => {
            //             bool = bool && (genresSelected.find(el => el.genre === genre) !== undefined)
            //         });
            //         return bool;
            //     });
            // }

            setSortedTracks(sorted);
        }
    }, [slidersValues, direction, genresSelected, onlySaved]);

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
                {sortedTracks.length === 0 ?
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
                                    handleDirection={handleDirection}
                                    handleGenresSelect={handleGenresSelect}
                                    handleOnlySaved={handleOnlySaved}
                                    sortedTracks={sortedTracks}
                                    direction={direction}
                                    onlySaved={onlySaved}
                                />
                            </Paper>
                            <Paper elevation={15} className={classNames(classes.marginBottom, classes.playlitsPanel)}>
                                <CreatePlaylistPanel sortedTracks={sortedTracks} />
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
                            <TrackList list={sortedTracks} />
                        </Box>
                    </motion.div>}
            </ScrollBarsCustom>
        </HeaderFooter>
    )
}

