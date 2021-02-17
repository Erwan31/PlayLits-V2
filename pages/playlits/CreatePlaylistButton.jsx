import { Box, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CustomButton from './CustomButton'
import CircularProgress from '@material-ui/core/CircularProgress';
import SpotifyIcon from './Icons/SpotifyIcon';

export default function CreatePlaylistButton({ onClick, name, disabled }) {

    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(
        <Typography align='left' component='h3' variant='subtitle1'>
            Create your PlayLits
        </Typography>
    );

    const handleClick = () => {
        setLoading(true);
        setContent(
            <CircularProgress size={20} thickness={10} color="secondary" />
        )
    }

    useEffect(async () => {
        if (loading) {
            await createPlayLits(token, name, tracksIDs);
            setContent(
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Typography
                        align='left'
                        component='h3'
                        variant='subtitle1'
                        style={{ marginRight: '0.5rem' }}
                    >
                        Take a listen
                    </Typography>
                    <SpotifyIcon style={{ height: 16 }} />
                </Box>
            )
            setLoading(false);
        }
    }, [loading])

    // style={{ marginRight: '0.5rem' }}

    return (
        <CustomButton onClick={handleClick} color='purple' disabled={disabled}>
            <Box css={{ minHeight: 28 }}>
                {content}
            </Box>
        </CustomButton>
    )
}

