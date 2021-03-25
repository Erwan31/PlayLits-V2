import React, { useEffect } from 'react'
import hash from '../../api/hash'
import { getUserPlaylists } from '../../api/spotifyAPICall';
import { Grid, makeStyles, Box, Typography, AppBar } from '@material-ui/core';
import PlaylistCard from './PlaylistCard';
import { getPlaylistID } from '../../utils/getters';
import ScrollBarsCustom from '../ScrollBarsCustom';
import CustomButton from '../CustomButton';
import { motion } from "framer-motion";
import useError from '../../hooks/useError';
import useMainState from '../../hooks/useMainState';
import { getLocalToken } from '../../hooks/useLocalStorage';
import usePlaylistsSelection from '../../hooks/usePlaylistsSelection';
import PlaylistsSelection from '../playlists/PlaylistsSelection';

const useStyles = makeStyles((theme) => ({
    root: {
        top: 'auto',
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, 0%)',
        maxWidth: 1100,
        width: '90vw',
        minWidth: 350,
        minHeight: 60,
        paddingTop: 20,
        //Appbar same as header
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        background: 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
        backdropFilter: 'blur(0.5rem)',
        '-webkit-backdrop-filter': 'blur(0.5rem)',
    },
    playlistCardSize: {
        minWidth: 170,
        width: '25vw',
        height: "100%",
        maxWidth: 200,
        margin: theme.spacing(2),
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

/* Framer Motion Variants */
const container = {
    hidden: { opacity: 0, scale: 1 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.2,
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { y: 10, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

export default function UserPlaylists() {

    const classes = useStyles();
    const { error, handleError, ThrowError } = useError();
    const {
        state,
        setToken,
        addNewPlaylistItems,
    } = useMainState();
    const {
        playlistsSelection,
        addOrRetrievePlaylist,
        initPlaylistSelection
    } = usePlaylistsSelection();


    // Load more playlists
    const handleLoadMore = async () => {
        if (state.playlists.next !== null) {
            const { next } = state.playlists;
            const nextPlaylists = await getUserPlaylists(next, handleError);
            addNewPlaylistItems(nextPlaylists);
        }
    }

    // Pass that to tht eguys
    const handlePlaylistClick = (playlist) => {
        addOrRetrievePlaylist(playlist);
    }

    // Get Access Token first
    useEffect(async () => {
        let { token } = state;
        if (token.access_token === null) {
            token = await hash();
            if (!token.access_token) {
                token = getLocalToken();
            }
            setToken(token);
        }

        //initialize selection
        initPlaylistSelection()
    }, [])

    return (
        <ScrollBarsCustom
            height={'100vh'}
            width={'100%'}
            autoHide
            autoHideTimeout={500}
            autoHideDuration={200}
            universal={true}
        >
            {error.hasError && <ThrowError />}
            {state.infoLoaded &&
                <motion.div
                    className="container"
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    <Box
                        m='0 auto 5rem auto'
                        p='90px 3rem 0 3rem'
                        // m='0 1rem 0 1rem'
                        css={{
                            maxWidth: 1100,
                            width: '90%',
                            minWidth: 350,
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Grid container justify="center" spacing={4}>
                                    {
                                        state.playlists.items
                                            .filter(list => list.tracks.total > 0)
                                            .map((list, index) => (
                                                <motion.div
                                                    key={index}
                                                    variants={item}
                                                    className={classes.playlistCardSize}
                                                >
                                                    <PlaylistCard
                                                        key={getPlaylistID(list)}
                                                        selection={playlistsSelection.selection}
                                                        onClick={handlePlaylistClick}
                                                        playlist={list}
                                                        max={playlistsSelection.max}
                                                        className={classes.paper}
                                                    />
                                                </motion.div>
                                            ))
                                    }
                                </Grid>
                            </Grid>
                        </Grid >
                        <AppBar static="true" className={classes.root}>
                            <PlaylistsSelection />
                        </AppBar>
                    </Box>
                    {
                        state.playlists.next !== null &&
                        <Box
                            display="flex"
                            justifyContent='center'
                            m='0 0 2rem 0'
                        >
                            <CustomButton onClick={handleLoadMore}>
                                <Typography align='left' component='h3' variant='subtitle1' style={{ marginRight: '0.5rem' }}>
                                    Load More Playlists
                                </Typography>
                            </CustomButton>
                        </Box>
                    }
                </motion.div>}
        </ScrollBarsCustom>
    );
}