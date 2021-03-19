import React from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, makeStyles, Box } from '@material-ui/core';
import Link from 'next/link'
import { useRecoilState } from 'recoil';
// import DefaultThumbnail from '/static/images/default_thumbnail.svg'
import { motion } from "framer-motion";
import { getSmallestImage } from '../../utils/getters';
import { mainState } from '../../hooks/useMainState';

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

export default function PlaylistCard({ playlist }) {

    const classes = useStyles();
    const [state, setState] = useRecoilState(mainState);

    const handleSelect = () => {
        setState(current => ({ ...current, selectedPlaylist: { info: playlist } }));
    }

    return (
        <Link href={`/playlits/${encodeURIComponent(playlist.name)}`}>
            <Card className={classes.root} elevation={10} onClick={handleSelect}>
                <CardActionArea>
                    <motion.div
                        whileHover={{
                            scale: 1.1,
                            transition: {
                                delay: 0.4,
                                ease: "easeOut",
                                duration: 0.4,
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
        </Link>
    )
}
