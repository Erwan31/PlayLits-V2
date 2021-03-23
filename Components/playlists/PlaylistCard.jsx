import React, { useState, useMemo } from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, makeStyles, Box } from '@material-ui/core';
import Link from 'next/link'
import { useRecoilState } from 'recoil';
// import DefaultThumbnail from '/static/images/default_thumbnail.svg'
import { motion } from "framer-motion";
import { getSmallestImage } from '../../utils/getters';
import useMainState from '../../hooks/useMainState';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddIcon from '../IconsJSX/AddIcon';
import RemoveIcon from '../IconsJSX/RemoveIcon';
import CheckedIcon from '../IconsJSX/CheckedIcon';
import { MAXSELECTION } from '../../hooks/usePlaylistsSelection';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#2c3049',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'flex-start',
        justifyContent: 'center',
        borderRadius: theme.spacing(1.5),
        // textOverflow: 'ellipsis',
        // /* Required for text-overflow to do anything */
        // whiteSpace: 'nowrap',
        // overflow: 'hidden',
        // textAlign: 'left',
    },
    media: {
        width: '100%',
        paddingBottom: '100%',
    },
    typo: {
        width: '80 %',
        // maxWidth: '10vw',
        height: '90 %',
        margin: '10 %',
    },

    wrapPlaylist: {
        height: 'fit-content',
    },
    playlistThumbnail: {
        '& p': {
            maxWidth: '95 %',
            maxHeight: '50 %',
            fontSize: '1.5rem',
            margin: '2rem 0rem',
        }
    },
}));

const item = {
    hidden: { y: -20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

export default function PlaylistCard({ selection, playlist, addOrRetrievePlaylist }) {

    const classes = useStyles();
    const { handlePlaylistSelect } = useMainState();
    const selected = selection.includes(playlist);
    const initIcon = useMemo(() => selection.includes(playlist) ? <CheckedIcon /> : <div></div>, [selection]);
    const [icon, setIcon] = useState(initIcon);

    const handleHover = (action) => () => {
        if (!selected && action === 'enter' && selection.length < MAXSELECTION) {
            setIcon(<AddIcon />)
        }
        if (!selected && action === 'leave') {
            setIcon(<div></div>)
        }
        if (selected && action === 'enter') {
            setIcon(<RemoveIcon />)
        }
        if (selected && action === 'leave') {
            setIcon(<CheckedIcon />)
        }
    }

    const handleClick = () => {
        if (selection.length < MAXSELECTION) {
            if (!selected) {
                setIcon(<CheckedIcon />)
            }
            if (selected) {
                setIcon(<AddIcon />)
            }
        }
    }

    return (
        // <Link href={`/playlits/${encodeURIComponent(playlist.name)}`}>
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 5, right: 5, zIndex: 1 }}>
                {icon}
            </div>
            <Card
                className={classes.root} elevation={10}
                onClick={() => {
                    handlePlaylistSelect(playlist)
                    addOrRetrievePlaylist(playlist);
                    handleClick();
                }
                }
                onMouseEnter={handleHover('enter')}
                onMouseLeave={handleHover('leave')}
            >
                <CardActionArea>
                    <motion.div
                        whileHover={{
                            scale: 1.1,
                            transition: {
                                delay: 0.5,
                                ease: "easeOut",
                                duration: 3,
                            }
                        }}
                    >
                        <CardMedia
                            classes={{
                                root: classes.media
                            }}
                            image={getSmallestImage(playlist.images) !== undefined ? getSmallestImage(playlist.images).url : '/static/images/default_thumbnail.svg'}
                            title={playlist.name}
                        />
                    </motion.div>
                    <CardContent>
                        <Typography className={classes.typo} gutterBottom noWrap={true} variant="body2" component="h2">
                            {playlist.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
        // </Link>
    )
}
