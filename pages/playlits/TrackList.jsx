import { Box, Card, CardActions, CardContent, CardMedia, Divider, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { getArtistsNames, getTrackAlbumImage, getTrackID, getTrackName } from '../utils/getters';
import classNames from 'classnames'
// import ScrollBarsCustom from '../Components/ScrollBarsCustom';

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
    const [play, setPlay] = useState({ isPlaying: false, id: null })

    const handlePlay = (track) => () => {
        // setPlay(current => {...current, isPlaying: !current.isPlaying, id: track.id })
    }

    // console.log('trackList', list);
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
                                <IconButton aria-label="play/pause" onClick={handlePlay(track.item)}>
                                    <PlayArrowIcon className={classNames(classes.playIcon, classes.typo)} />
                                    {/* {play.isPlaying && play.id === track.id ? <PlayArrowIcon className={classes.playIcon} /> : <PauseIcon className={classes.playIcon} />} */}
                                </IconButton>
                            </CardActions>
                        </div>
                    </CardContent>
                </Card>
            )}
        </Box>
    )
}
