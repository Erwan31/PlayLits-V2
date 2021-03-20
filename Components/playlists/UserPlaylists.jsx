import React, { useEffect } from 'react'
import hash from '../../api/hash'
import { getUserPlaylists } from '../../api/spotifyAPICall';
import { Grid, makeStyles, Box, Typography } from '@material-ui/core';
import PlaylistCard from './PlaylistCard';
import { getPlaylistID } from '../../utils/getters';
import ScrollBarsCustom from '../ScrollBarsCustom';
import CustomButton from '../CustomButton';
import { motion } from "framer-motion";
import useError from '../../hooks/useError';
import useMainState from '../../hooks/useMainState';

const useStyles = makeStyles((theme) => ({
    playlistCardSize: {
        minWidth: 170,
        width: '25vw',
        height: "100%",
        maxWidth: 200,
        margin: theme.spacing(3),
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
    const {
        state,
        setToken,
        addNewPlaylistItems,
    } = useMainState();
    const { error, handleError, ThrowError } = useError();

    // Load more playlists
    const handleLoadMore = async () => {
        if (state.playlists.next !== null) {
            const { next } = state.playlists;
            const nextPlaylists = await getUserPlaylists(next, handleError);
            addNewPlaylistItems(nextPlaylists);
        }
    }

    // Get Access Token first
    useEffect(async () => {
        let { token } = state;
        if (token.access_token === null) {
            token = await hash();
            // let tokenURL = window.localStorage.getItem("pl_token");
            // Save in local storage for future page refresh/reload...
            window.localStorage.setItem("pl_token", token.access_token);
            setToken(token);
        }
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
                        p='90px 0 0 0'
                        // m='0 1rem 0 1rem'
                        css={{
                            maxWidth: 1100,
                            width: '90%',
                            minWidth: 350,
                        }}
                    >
                        <Grid container className={classes.root} spacing={2}>
                            <Grid item xs={12}>
                                <Grid container justify="center" spacing={8}>
                                    {
                                        state.playlists.items
                                            .filter(list => list.tracks.total > 0)
                                            .map((list, index) => (
                                                <motion.div
                                                    key={index}
                                                    variants={item}
                                                    className={classes.playlistCardSize}
                                                >
                                                    <PlaylistCard key={getPlaylistID(list)} className={classes.paper} playlist={list} />
                                                </motion.div>
                                            ))
                                    }
                                </Grid>
                            </Grid>
                        </Grid >
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