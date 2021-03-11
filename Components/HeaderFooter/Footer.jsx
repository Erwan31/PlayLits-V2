import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    footBar: {
        display: 'inlineBlock',
        position: 'fixed',
        bottom: 107,
        left: -113,
        transform: 'rotate(-90deg)',
        fontSize: '0.6rem',
        color: 'white'
    },
    line: {
        display: 'inline-block',
        width: '3rem',
        height: 1,
        backgroundColor: 'white',
        border: 'white',
        marginBottom: ' 0.3rem',
        marginRight: '0.4rem',
    },
    footLink: {
        margin: '0.3rem',
        transform: 'rotate(90deg)',
    }
}))

export default function Footer() {

    const classes = useStyles();

    return (
        <div className={classes.footBar}>
            <Box display="flex" alignItems="center" justifyContent="center">
                <hr className={classes.line}></hr>
                Designed by Erwan Spilmont-2021
                <a href="https://www.erwanspilmont.dev">
                    <img src={"/static/images/link.svg"} alt="link" className={classes.footLink} />
                </a>
                <a href="https://github.com/Erwan31/PlayLits-V2">
                    <img src={"/static/images/github.svg"} alt="github" className={classes.footLink} />
                </a>
            </Box>
        </div>
    )
}
