import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(1),
        backgroundColor: 'transparent',
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
        <AppBar static className={classes.root}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <img src={"/images/logoCustom.svg"} className={classes.logo} alt="logo" />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                PlayLits
            </Typography>
        </AppBar>
    )
}
