import { Box, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { SliderSimple } from '../SliderSimple'
import { mainState, selectedPlaylist, slidersState } from '../../../utils/States/states'
import { useRecoilState } from 'recoil';
import ScrollBarsCustom from '../../ScrollBarsCustom'
import SliderDouble from '../SliderDouble'


export default function SliderPanel({ list, slidersSimple, slidersDouble, direction, length }) {

    const [playlistTracks, setPlaylistTracks] = useRecoilState(selectedPlaylist);
    // const tracksMax = playlistTracks.audioFeatures.length;
    // const [reverse, setReverse] = useState(false);
    const [slidersValues, setSliderValue] = useRecoilState(slidersState);
    // const [sliderTracks, setSliderTracks] = useState(<SliderDouble info={slidersDouble[0]} max={slidersValues.tracks[1]} />);


    // useEffect(() =>
    //     setSliderTracks(<SliderDouble info={slidersDouble[0]} max={slidersValues.tracks[1]} />)
    //     , [list.length]);

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
                {playlistTracks.audioFeatures.length > 10 && <SliderDouble info={slidersDouble[0]} max={slidersValues.tracks[1]} length={length} />}
                {slidersSimple.map((item, index) => <SliderSimple key={index} info={item} direction={direction} />)}
            </Box >
        </ScrollBarsCustom>
    )
}


