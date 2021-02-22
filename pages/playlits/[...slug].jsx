import { Box, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import HeaderFooter from '../Components/HeaderFooter/HeaderFooter'
import { mainState, selectedPlaylist, slidersState } from '../States/states'
import { useRecoilState } from 'recoil';
import TrackList from './TrackList';
import ScrollBarsCustom from '../Components/ScrollBarsCustom';
import { sortList, changeTracksNumber } from './utils';
import { reverseOrder } from './utils'
import { getArrayOfGenres } from '../utils/getters';
import CreatePlaylistPanel from './CreatePlaylistPanel';
import PlaylitsPanel from './PlaylitsPanel';

// To Out
import { getArtistsGenres, getTracksAudioFeatures, getUserPlaylistTracks } from '../api';


const useStyles = makeStyles(theme => ({
    playlitsPanel: {
        backgroundColor: '#2C3049',
        // minHeight: 200,
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    title: {
        marginBottom: theme.spacing(0.5),
        color: 'transparent',
        backgroundClip: 'text',
        '-webkit-background-clip': 'text',
        background: 'linear-gradient(135deg, #EEEEEE 0%, rgba(85,107,242,1) 50%, rgba(169,80,254,1) 100%)',
    },
    marginBottom: {
        marginBottom: theme.spacing(2),
    },
}));

function dataStructureTracks(playlist, audioFeatures, genres) {
    const struct = [];

    playlist.items.forEach((el, index) =>
        struct[index] = {
            item: playlist.items[index],
            audioFeature: audioFeatures[index],
            genres: genres[index],
        }
    )

    return struct;
}

export default function Playlits() {

    const classes = useStyles();
    // Recoil
    const [state, setState] = useRecoilState(mainState);
    const [playlistTracks, setPlaylistTracks] = useRecoilState(selectedPlaylist);
    const [slidersValues, setSliderValue] = useRecoilState(slidersState);
    // Local
    const [initStruct, setInitStruct] = useState([]);
    const [direction, setDirection] = useState('asc');
    const [sortedTracks, setSortedTracks] = useState([]);
    const [genresSelected, setGenresSelected] = useState([]);

    const handleDirection = () => {
        direction === 'asc' ? setDirection('desc') : setDirection('asc');
    }

    const handleGenresSelect = (selection) => {
        setGenresSelected(selection);
    }

    // API call -> to externalize into a reducer
    useEffect(async () => {
        const data = await getUserPlaylistTracks(state.selectedPlaylist.info, state.token.access_token);
        const audioFeatures = await getTracksAudioFeatures(data, state.token.access_token);
        //get tracks albums genres
        const artistsData = await getArtistsGenres(data, state.token.access_token)
        const allGenres = getArrayOfGenres(artistsData.artists);
        const genres = artistsData.artists.map(artist => artist.genres);

        // Initial Structure
        const init = dataStructureTracks(data, audioFeatures, genres);

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
            // Sorting based on tracks slider -> placed here so that its retrieving the right part of the list
            sorted = changeTracksNumber(sorted, slidersValues.tracks);
            // Sorting by genres 
            sorted = sorted.filter(track => {
                let bool = true;
                track.genres.forEach(genre => bool = bool && !genresSelected.includes(genre));
                return bool;
            });

            // console.log('after', sorted);
            setSortedTracks(sorted);
        }
    }, [slidersValues, direction, genresSelected]);

    return (
        <HeaderFooter>
            <ScrollBarsCustom
                height={'100vh'}
                width={'100%'}
                autoHide
                autoHideTimeout={500}
                autoHideDuration={200}
                universal={true}
            >
                <Box
                    m='auto'
                    p='80px 0 0 0'
                    css={{
                        maxWidth: 750,
                        minWidth: 350,
                    }}
                >
                    {
                        // Place skeleton here
                        sortedTracks.length > 0 &&
                        <Paper elevation={15} className={classes.playlitsPanel}>
                            <PlaylitsPanel
                                genres={playlistTracks.allGenres}
                                handleDirection={handleDirection}
                                handleGenresSelect={handleGenresSelect}
                                sortedTracks={sortedTracks}
                                direction={direction}
                            />
                        </Paper>
                    }
                    <Paper elevation={15} className={classes.playlitsPanel}>
                        <CreatePlaylistPanel />
                    </Paper>
                    {sortedTracks.length > 0 && <TrackList list={sortedTracks} />}
                </Box>
            </ScrollBarsCustom>
        </HeaderFooter>
    )
}
