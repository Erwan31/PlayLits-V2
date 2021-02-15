import { Box, Paper, Slider, Tooltip, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import PlaylitsPage from './playlits/PlaylitsPage'
import HeaderFooter from '../Components/HeaderFooter/HeaderFooter'
import SliderPanel from './SliderPanel';
import { mainState, selectedPlaylist } from '../States/states'
import { useRecoilState } from 'recoil';
import { getTracksAudioFeatures, getUserPlaylistTracks } from '../api';
import TrackList from './TrackList';
import { getPlaylistInfoLength } from '../utils/getters';
import ScrollBarsCustom from '../Components/ScrollBarsCustom';
import Charts from './Charts';

const useStyles = makeStyles(theme => ({
    playlitsPanel: {
        backgroundColor: '#2C3049',
        minHeight: 400,
        padding: theme.spacing(2),
    },
    title: {
        margin: theme.spacing(1),
        color: 'transparent',
        backgroundClip: 'text',
        '-webkit-background-clip': 'text',
        background: 'linear-gradient(135deg, #EEEEEE 0%, rgba(85,107,242,1) 50%, rgba(169,80,254,1) 100%)',
    }
}));

const sliderDouble = { name: 'Tracks', color: '#A850FE', max: null, min: 10 };

const slidersSimple = [
    { name: 'Danceability', color: '#6EDF36', labelUp: 'Booty Shake', labelDown: 'Static' },
    { name: 'Energy', color: '#3A77E0', labelUp: 'Intense', labelDown: 'Chill' },
    { name: 'Mood', color: '#EB690F', labelUp: 'Happy', labelDown: 'Sad' },
    { name: 'Crises', color: '#1F2436', labelUp: 'Loads', labelDown: 'Few' },
    { name: 'Liveness', color: '#1F2436', labelUp: 'Concert', labelDown: 'Studio' },
    { name: 'Instruments', color: '#1F2436', labelUp: 'Only', labelDown: 'Acapella' },
    { name: 'Speech', color: '#1F2436', labelUp: 'Only', labelDown: 'Nope' },
];

export default function Playlits() {

    const classes = useStyles();
    const [state, setState] = useRecoilState(mainState);
    const [playlistTracks, setPlaylistTracks] = useRecoilState(selectedPlaylist);

    useEffect(async () => {
        const info = await getUserPlaylistTracks(state.selectedPlaylist.info, state.token.access_token);
        const audioFeatures = await getTracksAudioFeatures(info, state.token.access_token);
        console.log(info, audioFeatures, 'tracks');

        setPlaylistTracks(current => ({ ...current, info, audioFeatures }));
    }, []);

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
                        <Typography gutterBottom align='center' component='h2' variant='h4' classes={{ root: classes.title }}>
                            PlayLits Panel
                        </Typography>
                        <SliderPanel slidersSimple={slidersSimple} slidersDouble={sliderDouble} />
                        {getPlaylistInfoLength(playlistTracks) > 0 &&
                            <Charts sliders={slidersSimple} audioFeatures={playlistTracks.audioFeatures} />
                        }
                    </Paper>
                    {getPlaylistInfoLength(playlistTracks) > 0 && <TrackList list={playlistTracks.info} />}
                </Box>
            </ScrollBarsCustom>
        </HeaderFooter>
    )
}


