import React, { useState, useEffect } from 'react'
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import usePlaylistsSelection, { MAXSELECTION } from '../hooks/usePlaylistsSelection';

export default function SnackBarCustom({ children, severity = "info" }) {

    //Not exactly reusable for now
    const { playlistsSelection } = usePlaylistsSelection();
    const [openSnack, setOpenSnack] = useState(false);

    useEffect(() => {
        if (playlistsSelection.selection.length === MAXSELECTION) {
            setOpenSnack(true);
        }
    }, [playlistsSelection]);

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    return (
        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
            <Alert severity={severity} onClose={handleCloseSnack}>
                {children}
            </Alert>
        </Snackbar>
    )
}
