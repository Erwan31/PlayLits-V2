import { Paper, Slider, Tooltip } from '@material-ui/core'
import React, { useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import PlaylitsPage from './playlits/PlaylitsPage'
import HeaderFooter from '../Components/HeaderFooter/HeaderFooter'
import SliderPanel from './SliderPanel';
import { mainState, selectedPlaylist } from '../States/states'
import { useRecoilState } from 'recoil';
import { getTracksAudioFeatures, getUserPlaylistTracks } from '../api';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#2c3049',
        maxWidth: 600,
        minWidth: 350,
        minHeight: 400,
    },
    title: {
        margin: theme.spacing(1),
        color: 'transparent',
        backgroundClip: 'text',
        background: 'linear-gradient(135deg, #EEEEEE 0%, rgba(85,107,242,1) 50%, rgba(169,80,254,1) 100%)',
    }
}));

export default function Playlits() {

    const classes = useStyles();
    const [state, setState] = useRecoilState(mainState);
    const [playlistTracks, setPlaylistTracks] = useRecoilState(selectedPlaylist);

    useEffect(async () => {
        const tracks = await getUserPlaylistTracks(state.selectedPlaylist, state.token.access_token);
        const audioFeatures = await getTracksAudioFeatures(tracks, state.token.access_token);
        console.log(tracks, audioFeatures, 'tracks');

        setPlaylistTracks(tracks);
    }, []);

    return (
        <HeaderFooter>
            <Paper elevation={15} className={classes.root}>
                <Typography gutterBottom align='center' component='h2' variant='h4' classes={{ root: classes.title }}>
                    PlayLits Panel
                </Typography>

                {/* <SliderPanel /> */}
            </Paper>
        </HeaderFooter>
    )
}


