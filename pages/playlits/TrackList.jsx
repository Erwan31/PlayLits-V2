import { Box, Card, CardActions, CardContent, CardMedia, Divider, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
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
}))

export default function TrackList({ list }) {

    const classes = useStyles();
    const [play, setPlay] = useState({ isPlaying: false, id: null })

    const handlePlay = (track) => () => {
        // setPlay(current => {...current, isPlaying: !current.isPlaying, id: track.id })
    }

    console.log('trackList', list);

    return (
        <Card className={classes.root}>
            {list.items.map(item =>
                <CardContent className={classes.content}>
                    <CardMedia
                        className={classes.cover}
                        image={item.track.album.images[1].url || item.track.album.images[0].url}
                        title={'trackname'}
                    />
                    <div className={classes.dividerZone}>
                        <div className={classes.details}>
                            <Typography component="h5" variant="h5">
                                Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Mac Miller
                            </Typography>
                        </div>
                        <CardActions className={classes.controls}>
                            <IconButton aria-label="play/pause" onClick={handlePlay(item)}>
                                {/* {play.isPlaying && play.id === track.id ? <PlayArrowIcon className={classes.playIcon} /> : <PauseIcon className={classes.playIcon} />} */}
                            </IconButton>
                        </CardActions>
                        <Divider />
                    </div>
                </CardContent>
            )}
        </Card>
    )
}
