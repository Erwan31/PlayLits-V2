import { Box, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { SliderSimple } from '../SliderSimple'
import { mainState, selectedPlaylist, slidersState } from '../../../utils/States/states'
import { useRecoilState } from 'recoil';
import ScrollBarsCustom from '../../ScrollBarsCustom'
import SliderDouble from '../SliderDouble'


export default function SliderPanel({ list, slidersSimple, slidersDouble, direction, length, onClick, sorting }) {

    const [playlistTracks, setPlaylistTracks] = useRecoilState(selectedPlaylist);
    const [slidersValues, setSliderValue] = useRecoilState(slidersState);

    return (
        <ScrollBarsCustom
            height={160}
            width={'100%'}
        >
            <Box
                display="flex"
                direction="column"
                m='0 1rem 0 1rem'
            >
                {/* {playlistTracks.audioFeatures.length > 10 && <SliderDouble info={slidersDouble[0]} max={slidersValues.tracks[1]} length={length} />} */}
                {slidersDouble.map((item, index) => <SliderDouble key={index} info={item} direction={direction} onClick={onClick} sorting={sorting} />)}
            </Box >
        </ScrollBarsCustom>
    )
}


