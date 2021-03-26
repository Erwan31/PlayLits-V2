import React, { useState, useEffect, useMemo, createRef } from 'react'
import ScrollBarsCustom from '../../ScrollBarsCustom';
import Skeleton from '@material-ui/lab/Skeleton';
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Box, Card, makeStyles, Typography } from '@material-ui/core'
import { getPreviewUrl, getTrackID } from '../../../utils/getters';
import TrackRow from '../TrackRow';

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

export default function TrackList({ list, name }) {

    const classes = useStyles();
    const [play, setPlay] = useState({ isPlaying: false, id: null, audio: null });
    const listRef = createRef();

    const handlePlay = (track) => () => {
        let audio = play.audio;

        if (audio !== null) {
            audio.pause();
        }

        audio = new Audio(getPreviewUrl(track));
        audio.volume = 0.3;

        !play.isPlaying ? audio.play() : audio.pause();
        setPlay(current => ({ ...current, isPlaying: !play.isPlaying, id: getTrackID(track), audio: audio }));

        // Maybe try to add ended eventlistener to the whole tracks
        audio.addEventListener("ended", e => {
            setPlay(current => ({ ...current, isPlaying: false, audio: null }));
        }, false);
    }

    //https://codesandbox.io/s/00nw2w1jv?file=/src/CustomList.js
    const handleScroll = ({ target }) => {
        const { scrollTop } = target;
        listRef.current.scrollTo(scrollTop);
    };

    useEffect(() => {
        // Stop player as soon as track list changes
        let audio = play.audio;
        if (audio !== null) {
            audio.pause();
            setPlay(current => ({ ...current, isPlaying: false, audio: null }));
        }
    }, [list]);

    return (
        <Box
            m="0 1rem"
        >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Typography align="center" component='h3' variant='h6' gutterBottom style={{ marginRight: '1rem' }}>
                    {list.length} Tracks from
                    <Typography color='primary' variant='body1' gutterBottom>
                        {name}
                    </Typography>
                </Typography>
            </div>
            <ScrollBarsCustom
                height={'calc(100vh - 80px)'}
                width={'100%'}
                autoHide
                autoHideTimeout={500}
                autoHideDuration={200}
                universal={true}
                onScroll={handleScroll}
            >
                <Box
                    m='2rem 0 2rem 0'
                    // p='0 1rem 0 1rem'
                    css={{
                        // maxHeight: '70vh',
                        width: '100%',
                    }}
                >
                    {/* <TrackRow data={{ list, handlePlay, play }} index={0} style={{}} /> */}
                    {list.length === 0 ?
                        [...Array(4)].map((el, index) =>
                            <Card key={index} className={classes.card} elevation={3} >
                                <Skeleton animation="wave" variant="rect" width={'100%'} height={120} />
                            </Card>
                        )
                        :
                        <div style={{ height: 'calc(100vh - 120px)' }}>
                            <AutoSizer >
                                {({ height, width }) => (
                                    <FixedSizeList
                                        itemData={{ list, handlePlay, play }}
                                        className="List"
                                        height={height}
                                        itemCount={list.length}
                                        itemSize={120}
                                        width={width}
                                        style={{ overflow: false }}
                                        ref={listRef}
                                    >
                                        {TrackRow}
                                    </FixedSizeList>
                                )}
                            </AutoSizer>
                        </div>

                    }
                </Box>
            </ScrollBarsCustom>
        </Box>
    )
}

// {
//     list.map(track =>
//         <motion.div
//             key={getTrackID(track.item)}
//             variants={item}
//             onHoverStart={() => setHoveringId(getTrackID(track.item))}
//             onHoverEnd={() => setHoveringId(null)}
//         >
//             <Card key={getTrackID(track.item)} className={classes.card} elevation={3} >
//                 <CardContent key={getTrackID(track.item)} className={classes.content}>
//                     <MediaTrack track={track} hovering={hoveringId === getTrackID(track.item)} />
//                     <div className={classes.detailsAndControl}>
//                         <div className={classes.details}>
//                             <Typography component="h3" variant="h6" className={classes.typo}>
//                                 {getTrackName(track.item)}
//                             </Typography>
//                             <Typography variant="subtitle1" color="textSecondary">
//                                 {getArtistsNames(track.item)}
//                             </Typography>
//                         </div>
//                         <CardActions className={classes.controls}>
//                             <IconButton disabled={true} aria-label="favorite">
//                                 {track.isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
//                             </IconButton>
//                             <IconButton
//                                 aria-label="play/pause"
//                                 onClick={handlePlay(track)}
//                                 disabled={getPreviewUrl(track) === null}
//                                 style={{ opacity: getPreviewUrl(track) === null ? 0.2 : 1 }}
//                             >
//                                 {play.isPlaying && (play.id === getTrackID(track)) ?
//                                     <PauseIcon className={classNames(classes.playIcon, classes.typo)} />
//                                     : <PlayArrowIcon className={classNames(classes.playIcon, classes.typo)} />
//                                 }
//                             </IconButton>
//                         </CardActions>
//                     </div>
//                 </CardContent>
//             </Card>
//         </motion.div>
//     )
// }