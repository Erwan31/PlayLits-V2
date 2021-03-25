import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Typography, Tooltip, Box } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Link from 'next/link'
import PlaylistsSelection from '../playlists/PlaylistsSelection';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2),
        // backgroundColor: 'transparent',
        background: 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
        backdropFilter: 'blur(0.5rem)',
        '-webkit-backdrop-filter': 'blur(0.5rem)',
        // For Mozilla
        // '&:after': {
        //     filter: 'blur(0.5rem)',
        //     width: 600,
        //     height: 100,
        //     margin: 100,
        //     background: 'black',
        // }
        // filter: 'blur(10rem)'
    },
    menuButton: {
        width: 40,
        height: 40,
        margin: theme.spacing(1),
    },
    logo: {
        width: 40,
        height: 40,
    },
    title: {
        // flexGrow: 1,
    },
    textSize: {
        width: 100,
    },
    centerSelectionPosition: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: 'auto 123px'
    }
}));

export default function Header({ backButton = false, selection = false }) {

    const classes = useStyles();

    return (
        <AppBar static="true" className={classes.root}>
            <Box
                display='flex' direction="row" alignItems="center"
                justifyContent={'space-between'}
                css={{ position: 'relative', width: '100%' }}>
                <Box display='flex' direction="row" alignItems="center">
                    <Link href="/">
                        <Tooltip title="Back to Connection Page" arrow>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <img src={"/static/images/logoCustom.svg"} className={classes.logo} alt="logo" />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Typography variant="h6" className={classes.title}>
                        PlayLits
                </Typography>
                </Box>
                {backButton &&
                    <Link href="/playlists">
                        <Box display='flex' direction="row" alignItems="center" m="0 1rem 0 0" css={{ cursor: 'pointer' }}>
                            <ArrowBackIcon />
                            <Typography align="center" variant="body2" className={classes.textSize}>
                                Back to your Playlists
                            </Typography>
                        </Box>
                    </Link>
                }
                {
                    selection &&
                    <Typography align="center" component='h2' variant='subtitle1' style={{ margin: '0 1rem' }}>
                        Select up to 5 playlists
                    </Typography>
                }
                {
                    selection &&
                    <div style={{ width: 120 }} />
                }
            </Box>
        </AppBar>
    )
}
