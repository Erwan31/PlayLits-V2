import { Box, Paper, Slider, Tooltip, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import PlaylitsPage from './playlits/PlaylitsPage'
import HeaderFooter from '../Components/HeaderFooter/HeaderFooter'
import SliderPanel from './SliderPanel';
import { mainState, selectedPlaylist, slidersState } from '../States/states'
import { useRecoilState } from 'recoil';
import { getTracksAudioFeatures, getUserPlaylistTracks } from '../api';
import TrackList from './TrackList';
import { getLength, getTrackID } from '../utils/getters';
import ScrollBarsCustom from '../Components/ScrollBarsCustom';
import Charts from './Charts';
import { useState } from 'react'
import { sortListItemsAndAF, changeTracksNumber } from './utils';

const useStyles = makeStyles(theme => ({
    playlitsPanel: {
        backgroundColor: '#2C3049',
        minHeight: 400,
        padding: theme.spacing(2),
    },
    title: {
        marginBottom: theme.spacing(0.5),
        color: 'transparent',
        backgroundClip: 'text',
        '-webkit-background-clip': 'text',
        background: 'linear-gradient(135deg, #EEEEEE 0%, rgba(85,107,242,1) 50%, rgba(169,80,254,1) 100%)',
    }
}));

const slidersDouble = [{ name: 'Tracks', feature: 'tracks', color: '#000000', labelUp: '', labelDown: '' }];

const slidersSimple = [
    { name: 'Danceable', feature: 'danceability', color: '#30B700', labelUp: 'Booty Shake', labelDown: 'Static' },
    { name: 'Energy', feature: 'energy', color: '#2e72dc', labelUp: 'Intense', labelDown: 'Chill' },
    { name: 'Mood', feature: 'valence', color: '#e95c02', labelUp: 'Happy', labelDown: 'Sad' },
    { name: 'Crises', feature: 'crises', color: '#FFD700', labelUp: 'Loads', labelDown: 'Few' },
    { name: 'Liveness', feature: 'liveness', color: '#F93822', labelUp: 'Concert', labelDown: 'Studio' },
    { name: 'Instruments', feature: 'instrumentalness', color: '#D62598', labelUp: 'Only', labelDown: 'Acapella' },
    { name: 'Speech', feature: 'speechiness', color: '#4E008E', labelUp: 'Only', labelDown: 'Nope' },
    { name: 'Acoustic', feature: 'acousticness', color: '#00249C', labelUp: 'Acoustic', labelDown: 'Artificial' },
];

const featuresOfInterest = ['danceability', 'energy', 'valence', 'liveness', 'instrumentalness', 'speechiness', 'acousticness'];


export default function Playlits() {

    const classes = useStyles();
    const [state, setState] = useRecoilState(mainState);
    const [playlistTracks, setPlaylistTracks] = useRecoilState(selectedPlaylist);
    const [sortedTracks, setSortedTracks] = useState({ items: playlistTracks.items, audioFeatures: playlistTracks.audioFeatures });
    const [slidersValues, setSliderValue] = useRecoilState(slidersState);

    // API call -> to externalize into a reducer
    useEffect(async () => {
        const data = await getUserPlaylistTracks(state.selectedPlaylist.info, state.token.access_token);
        const audioFeatures = await getTracksAudioFeatures(data, state.token.access_token);

        setPlaylistTracks(current => ({ ...current, info: data.info, items: data.items, audioFeatures }));
        setSortedTracks(current => ({ ...current, items: data.items, audioFeatures }));
        setSliderValue(current => ({ ...current, tracks: [0, audioFeatures.length] }));
    }, []);

    // Compute coeff and sort tracks
    useEffect(() => {
        if (sortedTracks.items.length > 0) {
            console.log(slidersValues);
            // Sorting by Coeff based on features sliders values
            let sorted = sortListItemsAndAF(slidersValues, 'genres', playlistTracks);
            console.log(sorted, 'before');

            // Sorting based on tracks slider
            sorted = changeTracksNumber(sorted, slidersValues.tracks);
            console.log(sorted, 'after');
            setSortedTracks(current => ({ ...current, items: sorted.items, audioFeatures: sorted.audioFeatures }))
        }
    }, [slidersValues]);

    return (
        <HeaderFooter>
            <ScrollBarsCustom
                height={'100vh'}
                width={'100%'}
                // hasHorizontal={true}
                // hasVertical={false}
                // autoWidth
                // autoWidthMin={200}
                // autoWidthMax={600}
                autoHide
                autoHideTimeout={500}
                autoHideDuration={200}
                // style={{ width: '100%', height: 220 }}
                // thumbMinSize={50}
                universal={true}
            >
                <Box
                    m='auto'
                    p='80px 0 0 0'
                    css={{
                        maxWidth: 600,
                        minWidth: 350,
                    }}
                >
                    <Paper elevation={15} className={classes.playlitsPanel}>
                        <Typography gutterBottom align='center' component='h2' variant='h5' classes={{ root: classes.title }}>
                            PlayLits Panel
                        </Typography>
                        <SliderPanel slidersSimple={slidersSimple} slidersDouble={slidersDouble} />
                        {sortedTracks.audioFeatures.length > 0 &&
                            <Charts sliders={slidersSimple} audioFeatures={sortedTracks.audioFeatures} />
                        }
                    </Paper>
                    {sortedTracks.items.length > 0 && <TrackList list={sortedTracks.items} />}
                </Box>
            </ScrollBarsCustom>
        </HeaderFooter>
    )
}


