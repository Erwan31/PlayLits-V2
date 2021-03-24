import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { Box, Typography } from '@material-ui/core'
import CustomButton from '../../Components/CustomButton'
import CircularProgress from '@material-ui/core/CircularProgress';
import SpotifyIcon from '../IconsJSX/SpotifyIcon';
import { getSpotifyURL } from '../../utils/getters';
import { createPlayLits } from '../../api/spotifyAPICall';
import useMainState from '../../hooks/useMainState';

export default function CreatePlaylistButton({ sortedTracks, name, disabled }) {

    // const { updatePlaylistsList } = useMainState();
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(
        <Typography align='left' component='h3' variant='subtitle2'>
            Create your PlayLits
        </Typography>
    );
    const [color, setColor] = useState(disabled ? 'grey' : 'purple');

    useEffect(() => {
        setColor(disabled ? 'grey' : 'purple');

        return function cleanup() {
            return null
        };
    }
        , [disabled])

    const handleClick = async () => {
        setLoading(true);
        setContent(
            <CircularProgress size={18} thickness={10} color="secondary" />
        )
    }

    useEffect(async () => {
        if (loading) {
            const response = await createPlayLits({ name, tracks: sortedTracks });
            setColor('#A054FD');
            setContent(
                <Link href={`/playlists/`}>
                    <Box display="flex" flexDirection="row" alignItems="center" onClick={() => window.open(getSpotifyURL(response), '_blank')}>
                        <Typography
                            align='left'
                            component='h3'
                            variant='subtitle2'
                            style={{ marginRight: '0.5rem' }}
                        >
                            Take a listen
                    </Typography>
                        <SpotifyIcon style={{ height: 16 }} />
                    </Box>
                </Link >
            )
            // setLoading(false);
        }

        return function cleanup() {
            return null
        };
    }, [loading])

    // style={{ marginRight: '0.5rem' }}

    return (
        <CustomButton onClick={handleClick} color={color} disabled={disabled}>
            <Box css={{ minHeight: 20 }}>
                {content}
            </Box>
        </CustomButton>
    )
}

