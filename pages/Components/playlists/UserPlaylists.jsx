import React, { useEffect } from 'react'
import hash, { cleanHash } from '../../api/hash'
// import localStorage from "localStorage"
import { getUserPlaylists, getUserInfo } from '../../api';
import { Grid, makeStyles, Box, Typography } from '@material-ui/core';
import PlaylistCard from './PlaylistCard';
import { mainState } from '../../States/states'
import { useRecoilState } from 'recoil';
import { getPlaylistID } from '../../utils/getters';
import ScrollBarsCustom from '../ScrollBarsCustom';
import CustomButton from '../CustomButton';

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        // width: '100vw',
        // height: '100vh',
        // padding: '5rem',
        // overflow: 'scroll',
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
    const [state, setState] = useRecoilState(mainState);

    const handleLoadMore = async () => {
        if (state.playlists.next !== null) {
            const token = state.token.access_token;
            const id = state.user.data.id;
            const next = state.playlists.next;
            const nextPlaylists = await getUserPlaylists(id, token, next);

            console.log(nextPlaylists, 'NP');
            setState(current => ({
                ...current,
                playlists: {
                    items: [...current.playlists.items, ...nextPlaylists.items],
                    next: nextPlaylists.next,
                },
            }));
        }
    }

    // const [token, setToken] = useState(null);
    // const [id, setId] = useState(null);
    // const [playlists, setPlaylists] = useState([]);
    // const [nextURL, setNextURL] = useState('');

    useEffect(async () => {

        if (!state.infoLoaded) {// let tokenURL = window.localStorage.getItem("pl_token");
            // let userInfo = window.localStorage.getItem("pl_user_id");

            // if (tokenURL === null) {
            const tokenURL = await hash();
            // setToken(tokenURL);
            // Save in local storage for future page refresh/reload...
            // window.localStorage.setItem("pl_token", tokenURL);

            // cleanHash();
            // console.log('getHash', state.playlists, tokenURL.access_token);
            // }

            // if (userInfo === null) {
            const userInfo = await getUserInfo(tokenURL.access_token);
            // setId(userInfo.data.display_name);
            // Save in local storage for future page refresh/reload...
            // await localStorage.setItem("pl_user_id", userInfo.data.display_name);

            // console.log('getUserInfo', state.playlists, userInfo.data.display_name, tokenURL.access_token);
            // }

            // if (userInfo && tokenURL && playlists === []) {
            const userPlaylists = await getUserPlaylists(userInfo.data.display_name, tokenURL.access_token);
            setState(current => ({ ...current, infoLoaded: true, user: userInfo, token: tokenURL, playlists: userPlaylists }));

            // console.log('getPlaylist', userPlaylists.items, state.token);
            // }

            // console.log('playlists', playlists, id, token);

            cleanHash();
        }
    }, []);

    return (
        <ScrollBarsCustom
            height={'100vh'}
            width={'100%'}
            autoHide
            autoHideTimeout={500}
            autoHideDuration={200}
            universal={true}
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
                            {state.playlists !== {} &&
                                state.playlists.items.map((list, index) => (
                                    // console.log(list)
                                    <PlaylistCard key={getPlaylistID(list)} className={classes.paper} playlist={list} />
                                ))}
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
        </ScrollBarsCustom>
    );
}