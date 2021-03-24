
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { Box, Typography, Tooltip } from '@material-ui/core';
import CustomButton from '../CustomButton';
import usePlaylistsSelection from '../../hooks/usePlaylistsSelection';
import Link from 'next/link';
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
    list: {
        position: 'absolute',
        top: theme.spacing(5),
        right: theme.spacing(1),
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'center',
        // flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
        // width: 400,
        height: 50,
    },
    chip: {
        margin: theme.spacing(0.5),
        color: 'white'
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

export default function PlaylistsSelection() {

    const classes = useStyles();
    const { playlistsSelection, retrievePlaylist } = usePlaylistsSelection();

    const handleDelete = (playlist) => () => {
        retrievePlaylist(playlist)
    }

    return (
        <Box
            display='flex' direction="column" alignItems="center"
            css={{ position: 'relative' }}
        >
            <div style={{ width: 100 }}>
                {playlistsSelection.selection.length > 0 &&
                    <motion.div
                        className="motion.button"
                        variants={button}
                        initial="hidden"
                        animate="visible"
                    >
                        <Link href={`/playlits/${encodeURIComponent(playlistsSelection.route)}`}>
                            <CustomButton>
                                <Typography align='left' component='h3' variant='subtitle2'>
                                    Let's Go!
                        </Typography>
                            </CustomButton>
                        </Link>
                    </motion.div>
                }
            </div>
            <ul className={classes.list}>
                {
                    playlistsSelection.selection.map((playlist) =>
                        <motion.li
                            key={playlist.id}
                            className="motion.li"
                            variants={li}
                            initial="hidden"
                            animate="visible"
                        >
                            <Tooltip title={playlist.name} arrow placement="left">
                                <Chip
                                    // avatar={<div>{playlist.name[0].toUpperCase()}</div>}
                                    variant="outlined"
                                    size="small"
                                    label={playlist.name[0].toUpperCase()}
                                    onDelete={handleDelete(playlist)}
                                    className={classes.chip}
                                />
                            </Tooltip>
                        </motion.li>
                    )
                }
            </ul>
        </Box>
    );
}
