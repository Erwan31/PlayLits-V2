import React, { useState, useEffect } from 'react'
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import usePlaylistsSelection, { MAXSELECTION } from '../hooks/usePlaylistsSelection';

export default function SnackBarCustom({ children, severity = "info", open, handleClose }) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open} autoHideDuration={6000} onClose={handleClose}
            style={{ marginTop: 50 }}
        >
            <Alert severity={severity} onClose={handleClose}>
                {children}
            </Alert>
        </Snackbar>
    )
}
