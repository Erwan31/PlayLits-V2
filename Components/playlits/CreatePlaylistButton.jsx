import { Box, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CustomButton from '../../Components/CustomButton'
import CircularProgress from '@material-ui/core/CircularProgress';
import SpotifyIcon from '../IconsJSX/SpotifyIcon';
import { useRecoilState } from 'recoil';
import Link from 'next/link';
import { getSpotifyURL, getTrackID } from '../../utils/getters';
import { createPlayLits } from '../../api/spotifyAPICall';
import { mainState } from '../../utils/States/states';

export default function CreatePlaylistButton({ sortedTracks, name, disabled }) {

    const [state, setState] = useRecoilState(mainState);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(
        <Typography align='left' component='h3' variant='subtitle1'>
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

    const handleClick = () => {
        setLoading(true);
        setContent(
            <CircularProgress size={20} thickness={10} color="secondary" />
        )
    }

    useEffect(async () => {
        if (loading) {
            console.log('ola', loading)
            const response = await createPlayLits({ name, tracks: sortedTracks });
            setColor('#A054FD');
            setContent(
                <Link href={`/playlists/`}>
                    <Box display="flex" flexDirection="row" alignItems="center" onClick={() => window.open(getSpotifyURL(response), '_blank')}>
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
                </Link>
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
            <Box css={{ minHeight: 28 }}>
                {content}
            </Box>
        </CustomButton>
    )
}

