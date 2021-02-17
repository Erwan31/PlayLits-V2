import { Box, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import SliderDouble from './SliderDouble'
import SliderSimple from './SliderSimple'
import { mainState, selectedPlaylist } from '../States/states'
import { useRecoilState } from 'recoil';
import ScrollBarsCustom from '../Components/ScrollBarsCustom'

export default function SliderPanel({ slidersSimple, slidersDouble }) {

    const [playlistTracks, setPlaylistTracks] = useRecoilState(selectedPlaylist);
    const tracksMax = playlistTracks.audioFeatures.length;
    const [reverse, setReverse] = useState(false);


    return (
        <ScrollBarsCustom
            height={170}
            width={'100%'}
        // hasHorizontal={true}
        // hasVertical={false}
        // autoWidth
        // autoWidthMin={200}
        // autoWidthMax={600}
        // autoHide
        // autoHideTimeout={500}
        // autoHideDuration={200}
        // style={{ width: '100%', height: 220 }}
        // thumbMinSize={50}
        // universal={true}
        >
            <Box
                display="flex"
                direction="column"
                m='0 1rem 0 1rem'
            >
                {tracksMax > 10 && slidersDouble.map((item, index) => <SliderDouble key={index} info={item} max={tracksMax} />)}
                {slidersSimple.map((item, index) => <SliderSimple key={index} info={item} />)}
            </Box >
        </ScrollBarsCustom>
    )
}


