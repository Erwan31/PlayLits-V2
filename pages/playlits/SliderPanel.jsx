import { Box, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import SliderDouble from './SliderDouble'
import SliderSimple from './SliderSimple'
import { mainState, selectedPlaylist } from '../States/states'
import { useRecoilState } from 'recoil';
import { Scrollbars } from 'react-custom-scrollbars';

const sliderDouble = { name: 'Tracks', color: '#A850FE', max: null, min: 10 };

const slidersSimple = [
    { name: 'Danceability', color: '#6EDF36', labelUp: 'Booty Shake', labelDown: 'Static' },
    { name: 'Energy', color: '#3A77E0', labelUp: 'Intense', labelDown: 'Chill' },
    { name: 'Mood', color: '#EB690F', labelUp: 'Happy', labelDown: 'Sad' },
    { name: 'Crises', color: '#1F2436', labelUp: 'Loads', labelDown: 'Few' },
    { name: 'Liveness', color: '#1F2436', labelUp: 'Concert', labelDown: 'Studio' },
    { name: 'Instruments', color: '#1F2436', labelUp: 'Only', labelDown: 'Acapella' },
    { name: 'Speech', color: '#1F2436', labelUp: 'Only', labelDown: 'Nope' },
];

export default function SliderPanel() {

    const [playlistTracks, setPlaylistTracks] = useRecoilState(selectedPlaylist);
    const tracksMax = playlistTracks.audioFeatures.length;
    const [reverse, setReverse] = useState(false);

    const handleTracksChange = values => {
        this.setState({
            tracksNum: values[1] - values[0],
            tracksMin: values[0],
            tracksMax: values[1]
        });

    }

    const handleChangeVertical = (value, parameter) => {
        const values = this.state;
        values[parameter] = value;

        // this.setState({
        //     danceability: values.danceability,
        //     energy: values.energy,
        //     mood: values.mood,
        //     crises: values.crises
        // });
    };

    const handleAndDelayChangeComplete = () => {
        // const state = this.state;
        // this.props.onChangeSliders(state);
    }

    const genreToggle = (num) => {
        // const genre = [...this.state.genre];

        // genre[num] = !genre[num];
        // this.setState({ genre });
    }

    return (
        <Scrollbars
            autoWidth
            // autoWidthMin={200}
            // autoWidthMax={600}
            // autoHide
            // autoHideTimeout={500}
            // autoHideDuration={200}
            style={{ width: '100%', height: 220 }}
            universal
        >
            <Box
                display="flex"
                direction="column"
            // css={{ overflow: 'scroll', overflowY: 'hidden' }}
            >
                {slidersSimple.map((item, index) => <SliderSimple key={index} info={item} />)}
            </Box >
        </Scrollbars>
    )
}


