
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { Box, Typography, Avatar, Tooltip } from '@material-ui/core';
import CustomButton from '../CustomButton';
import usePlaylistsSelection from '../../hooks/usePlaylistsSelection';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexWrap: 'wrap',
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

export default function PlaylistsSelection() {

    const classes = useStyles();
    // const [chipData, setChipData] = React.useState([
    //     { key: 0, label: 'Angular' },
    //     { key: 1, label: 'jQuery' },
    //     { key: 2, label: 'Polymer' },
    //     { key: 3, label: 'React' },
    //     { key: 4, label: 'Vue.js' },
    //     { key: 0, label: 'Angular' },
    // ]);
    const { playlistsSelection, retrievePlaylist } = usePlaylistsSelection();

    const handleDelete = (playlist) => () => {
        retrievePlaylist(playlist)
    }

    return (
        <Box display='flex' direction="row" alignItems="center">
            <Link href={`/playlits/${encodeURIComponent(playlistsSelection.route)}`}>
                <CustomButton>
                    <Typography align='left' component='h3' variant='subtitle1' style={{ marginRight: '0.5rem' }}>
                        Let's Go!
                    </Typography>
                </CustomButton>
            </Link>
            <ul className={classes.root}>
                {playlistsSelection.selection.map((playlist, index) => {
                    console.log(playlist.id);
                    return (
                        <li key={playlist.id}>
                            <Tooltip title={playlist.name} arrow>
                                <Chip
                                    avatar={<Avatar>{playlist.name[0].toUpperCase()}</Avatar>}
                                    variant="outlined"
                                    size="small"
                                    // label={''}
                                    onDelete={handleDelete(playlist)}
                                    className={classes.chip}
                                />
                            </Tooltip>
                        </li>
                    );
                })}
            </ul>
        </Box>
    );
}
