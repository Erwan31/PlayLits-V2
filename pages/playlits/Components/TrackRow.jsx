import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Card, CardContent, Typography, IconButton, makeStyles, CardActions, Tooltip } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { getArtistsNames, getPreviewUrl, getTrackAlbumImage, getTrackID, getTrackName, linkToSpotify } from '../../utils/getters';
import MediaTrack from './MediaTrack';
import classNames from 'classnames'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(2),
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        background: 'none',
        // backDropFilter: 'blur(1rem)',
        width: '100%',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        flex: '1 0 auto',
    },
    detailsAndControl: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexGrow: 1,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    typo: {
        color: '#EEEEEE',
    }
}));

const item = {
    hidden: { opacity: 0 },
    visible: {
        opacity: [0, 0, 1],
        transition: {
            duration: 0.3
        }
    }
};

export default function TrackRow({ data, index, style }) {

    const classes = useStyles();
    const { list, handlePlay, play } = data;
    const track = list[index];
    const [hovering, setHovering] = useState({ bool: false, elevation: 4 });
    // console.log(list[index]);

    return (
        <motion.div
            key={getTrackID(track.item)}
            variants={item}
            onHoverStart={() => setHovering({ bool: true, elevation: 7 })}
            onHoverEnd={() => setHovering({ bool: false, elevation: 4 })}
            style={style}
            className={classes.root}
        >
            <Card key={getTrackID(track.item)} className={classes.card} elevation={hovering.elevation} >
                <CardContent className={classes.content}>
                    <MediaTrack track={track} hovering={hovering.bool} />
                    <div className={classes.detailsAndControl}>
                        <div className={classes.details}>
                            <Typography component="h3" variant="h6" className={classes.typo}>
                                {getTrackName(track.item)}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {getArtistsNames(track.item)}
                            </Typography>
                        </div>
                        <CardActions className={classes.controls}>
                            <IconButton disabled={true} aria-label="favorite">
                                {track.isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </IconButton>
                            <IconButton
                                aria-label="play/pause"
                                onClick={handlePlay(track)}
                                disabled={getPreviewUrl(track) === null}
                                style={{ opacity: getPreviewUrl(track) === null ? 0.2 : 1 }}
                            >
                                {play.isPlaying && (play.id === getTrackID(track)) ?
                                    <PauseIcon className={classNames(classes.playIcon, classes.typo)} />
                                    : <PlayArrowIcon className={classNames(classes.playIcon, classes.typo)} />
                                }
                            </IconButton>
                        </CardActions>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}