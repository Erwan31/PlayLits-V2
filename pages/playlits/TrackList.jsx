import { Box, Card, CardActions, CardContent, CardMedia, Divider, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { getArtistsNames, getPreviewUrl, getTrackAlbumImage, getTrackID, getTrackName } from '../utils/getters';
import classNames from 'classnames'
// import ScrollBarsCustom from '../Components/ScrollBarsCustom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        background: 'none',
        // backDropFilter: 'blur(1rem)',
        width: '100%',
        marginBottom: theme.spacing(1.5),
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
    cover: {
        width: 80,
        height: 80,
        marginRight: theme.spacing(3),
        borderRadius: theme.spacing(0.5),
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
}))

export default function TrackList({ list }) {

    const classes = useStyles();
    const [play, setPlay] = useState({ isPlaying: false, id: null, audio: null });

    const handlePlay = (track) => () => {

        let audio = new Audio(play.audio);
        audio.volume = 0.3;
        audio.pause();

        // if (play.isPlaying && (getTrackID(track) !== play.id)) {
        //     setPlay(current => ({ ...current, isPlaying: true, id: getTrackID(track) }));
        //     audio.play();
        // }
        // if (play.isPlaying && (getTrackID(track) === play.id)) {
        //     setPlay(current => ({ ...current, isPlaying: false, id: getTrackID(track) }));
        //     audio.pause();
        // }
        audio = new Audio(getPreviewUrl(track));
        !play.isPlaying ? audio.play() : audio.pause();
        setPlay(current => ({ ...current, isPlaying: !play.isPlaying, id: getTrackID(track), audio: audio }));

    }

    console.log(play, 'LIst')

    return (
        <Box
            m='2rem 0 2rem 0'
            css={{
                // maxHeight: '70vh',
                width: '100%',
            }}
        >
            {list.map(track =>
                <Card key={getTrackID(track.item)} className={classes.card} elevation={3} >
                    <CardContent key={getTrackID(track.item)} className={classes.content}>
                        <CardMedia
                            className={classes.cover}
                            image={getTrackAlbumImage(track.item).url}
                            title={'trackname'}
                        />
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
                                <IconButton disabled="true" aria-label="favorite">
                                    {track.isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                </IconButton>
                                <IconButton aria-label="play/pause" onClick={handlePlay(track)}>
                                    {play.isPlaying && (play.id === getTrackID(track)) ?
                                        <PauseIcon className={classNames(classes.playIcon, classes.typo)} />
                                        : <PlayArrowIcon className={classNames(classes.playIcon, classes.typo)} />
                                    }
                                </IconButton>
                            </CardActions>
                        </div>
                    </CardContent>
                </Card>
            )}
        </Box>
    )
}
