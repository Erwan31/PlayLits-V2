import { Box } from '@material-ui/core'
import React from 'react'
import ScrollBarsCustom from '../../ScrollBarsCustom'
import SliderDouble from '../SliderDouble'
import { slidersDouble } from '../../../utils/playlits/slidersData';
import useSortState from '../../../hooks/useSortState';

export default function SliderPanel() {

    const { handleFeatureSortingClick, featureSorting } = useSortState();

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
                {slidersDouble.map((item, index) => <SliderDouble key={index} info={item} onClick={handleFeatureSortingClick} sorting={featureSorting} />)}
            </Box >
        </ScrollBarsCustom>
    )
}


