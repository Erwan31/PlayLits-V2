import React from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, makeStyles } from '@material-ui/core';
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 170,
        width: '25vw',
        // height: '10vw',
        height: "100%",
        maxWidth: 300,
        margin: theme.spacing(3),
        backgroundColor: '#2C3049',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'flex-start',
        justifyContent: 'center',
        // textOverflow: 'ellipsis',
        // /* Required for text-overflow to do anything */
        // whiteSpace: 'nowrap',
        // overflow: 'hidden',
        // textAlign: 'left',
        borderRadius: theme.spacing(2),
    },
    media: {
        // width: '80 %',
        minHeight: 140,
        // maxWidth: '15vw',
        // height: '90 %',
        height: 'inherit',
        // margin: '10 %',
        // borderRadius: theme.spacing(1),
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

export default function Playlist({ playlist, onSelect }) {

    const classes = useStyles();

    const handleSelect = (playlist) => {
        onSelect(playlist)
    }

    return (
        <Link href={`/playlist/${playlist.name}`} onClick={handleSelect}>
            <Card className={classes.root} elevation={10}>
                <CardActionArea>
                    <CardMedia
                        classes={{
                            root: classes.media
                        }}
                        image={playlist.images[0].url}
                        title={playlist.name}
                    />
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
