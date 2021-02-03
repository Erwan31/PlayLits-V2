import React from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 170,
        maxWidth: 300,
        margin: theme.spacing(3),
        backgroundColor: '#2C3049',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'flex-start',
        justifyContent: 'center',
        textOverflow: 'ellipsis',
        /* Required for text-overflow to do anything */
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textAlign: 'left',
    },
    media: {
        width: '80 %',
        minHeight: 140,
        height: '90 %',
        margin: '10 %',
        borderRadius: theme.spacing(1),
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

export default function Playlist() {

    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={10}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="body2" component="h2">
                        Lizard
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
