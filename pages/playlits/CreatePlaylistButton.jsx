import { Box, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CustomButton from '../Components/CustomButton'
import CircularProgress from '@material-ui/core/CircularProgress';
import SpotifyIcon from '../utils/IconsJSX/SpotifyIcon';
import { createPlayLits } from '../api';
import { mainState } from '../States/states';
import { useRecoilState } from 'recoil';
import Link from 'next/link';
import { getSpotifyURL, getTrackID } from '../utils/getters';

export default function CreatePlaylistButton({ sortedTracks, name, disabled }) {

    const [state, setState] = useRecoilState(mainState);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(
        <Typography align='left' component='h3' variant='subtitle1'>
            Create your PlayLits
        </Typography>
    );
    const [color, setColor] = useState(disabled ? 'grey' : 'purple');

    useEffect(() =>
        setColor(disabled ? 'grey' : 'purple')
        , [disabled])

    const handleClick = () => {
        setLoading(true);
        setColor('orange');
        setContent(
            <CircularProgress size={20} thickness={10} color="secondary" />
        )
    }

    useEffect(async () => {
        if (loading) {
            const response = await createPlayLits(state.token.access_token, name, sortedTracks);
            setColor('blue');
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
            setLoading(false);
        }
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

