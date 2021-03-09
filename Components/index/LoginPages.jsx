import { BottomNavigation, Button, makeStyles, ThemeProvider, Typography } from '@material-ui/core';
import React from 'react';
import { authEndpoint, clientId, redirectURI, scopes } from "../../api/config";
// import Button from '@material-ui/core/Button';
import Link from 'next/link'
import SpotifyIcon from '../../pages/utils/IconsJSX/SpotifyIcon';
import CustomButton from '../CustomButton';

const useStyles = makeStyles((theme) => ({
    /* Login */
    content: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: theme.spacing(2),
        height: 'auto',
        boxShadow: '0px 0px 12px 12px rgba(0, 0, 255, .2)',
        padding: theme.spacing(3),
        margin: theme.spacing(5),
        cursor: 'pointer',
        fontSize: "1.3rem",
        background: 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
        backdropFilter: 'blur(5rem)',
    },
    title: {
        padding: theme.spacing(1),
    },
    marginAround: {
        margin: theme.spacing(4),
    }
}));

const URLConnect = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`

export default function Login() {

    const classes = useStyles();

    return (
        <div className={classes.marginAround}>
            <Link href={URLConnect} >
                <CustomButton className={classes.content}>
                    <Typography align='left' component='h3' variant='h6' className={classes.title}>
                        Login to Spotify
                </Typography>
                    <SpotifyIcon />
                </CustomButton>
            </Link>
        </div>
    );
}
