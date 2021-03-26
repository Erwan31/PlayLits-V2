
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { Box, Typography, Tooltip, Fab, AppBar } from '@material-ui/core';
import CustomButton from '../CustomButton';
import usePlaylistsSelection from '../../hooks/usePlaylistsSelection';
import Link from 'next/link';
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
    root: {
        top: 'auto',
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, 0%)',
        maxWidth: 900,
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
    list: {
        // position: 'absolute',
        // top: theme.spacing(5),
        // right: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap-reverse',
        listStyle: 'none',
        // padding: theme.spacing(0.5),
        // margin: 'auto',
        // width: 400,
        height: '100%',
        width: '100%',
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
        color: 'white'
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -45,
        left: 0,
        right: 0,
        margin: '0 auto',
        backgroundColor: 'purple',
        "&:hover": {
            backgroundColor: '#2c3049'
        }
    },
}));

/* Framer Motion Variants */
const button = {
    hidden: { opacity: 0, scale: 1 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.1,
        }
    }
};

const li = {
    hidden: { opacity: 0, scale: 1, x: 10, y: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        transition: {
            delay: 0.3,
        }
    }
};

const transition = {
    duration: 3,
    ease: [0.43, 0.13, 0.23, 0.96]
};

const imageVariants = {
    exit: { y: "100%", opacity: 0, transition },
    enter: {
        y: ["100%", "0%"],
        opacity: 1,
        transition
    }
};

const barAppear = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
        }
    }
}


export default function PlaylistsSelection() {

    const classes = useStyles();
    const { playlistsSelection, retrievePlaylist } = usePlaylistsSelection();

    const handleDelete = (playlist) => () => {
        retrievePlaylist(playlist)
    }

    return (
        <>
            {
                playlistsSelection.selection.length > 0 &&
                <motion.div
                    className="motion.selectionBar"
                    variants={barAppear}
                    initial="hidden"
                    animate="visible"
                >
                    <AppBar static="true" className={classes.root}>
                        <Box
                            display='flex' direction="row" alignItems="center" justifyContent="center"
                            flexWrap="wrap"
                            css={{ position: 'relative', height: '100%', width: '100%' }}
                        >
                            <motion.div
                                className="motion.button"
                                variants={button}
                                initial="hidden"
                                animate="visible"
                            >
                                <Fab size="small" classes={{ root: classes.fabButton }}>
                                    <Link href={`/playlits/${encodeURIComponent(playlistsSelection.route)}`}>
                                        <div>
                                            <Typography align='left' component='h3' variant='subtitle2'>
                                                Go!
                            </Typography>
                                        </div>
                                    </Link>
                                </Fab>
                            </motion.div>
                            <div className={classes.list}>
                                {
                                    playlistsSelection.selection.map((playlist) =>
                                        <motion.div
                                            key={playlist.id}
                                            className="motion.li"
                                            variants={li}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            {/* <Tooltip title={playlist.name} arrow placement="left"> */}
                                            <Chip
                                                // avatar={<div>{playlist.name[0].toUpperCase()}</div>}
                                                variant="outlined"
                                                size="small"
                                                label={<span>{playlist.name}</span>}
                                                onDelete={handleDelete(playlist)}
                                                className={classes.chip}
                                            />
                                            {/* </Tooltip> */}
                                        </motion.div>
                                    )
                                }
                            </div>
                        </Box>
                    </AppBar>
                </motion.div>
            }
        </>
    );
}
