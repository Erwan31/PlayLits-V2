import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Typography } from '@material-ui/core';
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
        marginLeft: theme.spacing(2),
        // backgroundColor: 'transparent',
        background: 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
        backdropFilter: 'blur(0.5rem)',
        // '& ::before': {
        //     backdropFilter: 'blur(10rem)'
        // }
        // filter: 'blur(10rem)'
    },
    menuButton: {
        width: 50,
        height: 50,
        margin: theme.spacing(1),
    },
    logo: {
        width: 50,
        height: 50,
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header() {

    const classes = useStyles();

    return (
        <AppBar static="true" className={classes.root}>
            <Link href="/">
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <img src={"/images/logoCustom.svg"} className={classes.logo} alt="logo" />
                </IconButton>
            </Link>
            <Typography variant="h6" className={classes.title}>
                PlayLits
            </Typography>
        </AppBar>
    )
}
