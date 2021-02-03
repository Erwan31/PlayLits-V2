import React, { useEffect, useLayoutEffect, useState } from 'react'
import hash, { cleanHash } from '../../api/hash'
import store from "store"
import { getUserPlaylists, getUserInfo } from '../../api';
import { Grid, FormLabel, FormControlLabel, Paper, makeStyles } from '@material-ui/core';
import Playlist from './Playlist';

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        width: '100vw',
        height: '100vh',
        // margin: '10rem',
        padding: '5rem',
        overflow: 'scroll',
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));


export default function UserPlaylists() {

    const classes = useStyles();
    const [token, setToken] = useState(store.get("pl_token"));
    const [id, setId] = useState(store.get("pl_user_id"));
    const [playlists, setPlaylists] = useState([]);
    const [nextURL, setNextURL] = useState('');

    useEffect(async () => {

        // console.log('playlists', playlists, id, token);

        // if (!token) {
        const urlHash = await hash();
        setToken(urlHash.access_token);
        // Save in local storage for future page refresh/reload...
        store.set("pl_token", urlHash.access_token);

        // cleanHash();
        // console.log('getHash', playlists, id, urlHash.access_token);
        // }

        // if (!id) {
        const userInfo = await getUserInfo(token);
        setId(userInfo.data.display_name)
        // Save in local storage for future page refresh/reload...
        store.set("pl_user_id", userInfo.data.display_name);

        // console.log('getUserInfo', playlists, userInfo.data.display_name, token);
        // }

        if (id && token) {
            const userPlaylists = await getUserPlaylists(id, token);

            setPlaylists(userPlaylists.items);
            setNextURL(userPlaylists.next);

            // console.log('getPlaylist', userPlaylists.items, id, token);
        }

        // console.log('playlists', playlists, id, token);

        cleanHash();
    }, []);

    const handleLoadMore = async () => {
        //await getMorePlayList(next)
    }

    const handleSelect = (playlist) => {
        console.log(playlist)
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={20}>
                <Grid container justify="center" spacing={8}>
                    {playlists.map((list, index) => (
                        // console.log(list)
                        <Playlist key={index} className={classes.paper} playlist={list} onSelect={handleSelect} />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}