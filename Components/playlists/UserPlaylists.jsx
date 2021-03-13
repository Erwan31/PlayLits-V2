import React, { useEffect, useState } from 'react'
import hash, { cleanHash } from '../../api/hash'
// import localStorage from "localStorage"
import { getUserPlaylists, getUserInfo } from '../../api/spotifyAPICall';
import { Grid, makeStyles, Box, Typography } from '@material-ui/core';
import PlaylistCard from './PlaylistCard';
import { mainState } from '../../utils/States/states'
import { useRecoilState } from 'recoil';
import { getPlaylistID } from '../../utils/getters';
import ScrollBarsCustom from '../ScrollBarsCustom';
import CustomButton from '../CustomButton';
import { motion } from "framer-motion";
import ThrowError from '../Errors/ThrowError';

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        // width: '100vw',
        // height: '100vh',
        // padding: '5rem',
        // overflow: 'scroll',
    },
    playlistCardSize: {
        minWidth: 170,
        width: '25vw',
        // height: '10vw',
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
    const [state, setState] = useRecoilState(mainState);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        setHasError(true);
    }

    // Load more playlists
    const handleLoadMore = async () => {
        if (state.playlists.next !== null) {
            const { next } = state.playlists;
            const nextPlaylists = await getUserPlaylists(next, handleError);

            setState(current => ({
                ...current,
                playlists: {
                    items: [...current.playlists.items, ...nextPlaylists.items],
                    next: nextPlaylists.next,
                },
            }));
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
            setState(current => ({ ...current, token }));
        }
    }, [])

    // Get playlist data then
    useEffect(async () => {
        const { token, infoLoaded } = state;

        if (token.access_token !== null && !infoLoaded) {
            // let userInfo = window.localStorage.getItem("pl_user_id");
            cleanHash();

            const userInfo = await getUserInfo(handleError);
            window.localStorage.setItem("pl_user_id", userInfo.id);

            const userPlaylists = await getUserPlaylists(null, handleError);
            setState(current => ({ ...current, infoLoaded: true, user: userInfo, playlists: userPlaylists }));
        }
    }, [state.token]);

    console.log(state.playlists)

    return (
        <ScrollBarsCustom
            height={'100vh'}
            width={'100%'}
            autoHide
            autoHideTimeout={500}
            autoHideDuration={200}
            universal={true}
        >
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
            {hasError && <ThrowError />}
        </ScrollBarsCustom>
    );
}