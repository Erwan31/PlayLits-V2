import { Box, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import SliderDouble from './SliderDouble'
import SliderSimple from './SliderSimple'
import { mainState } from '../States/states'
import { useRecoilState } from 'recoil';

const sliders = [
    { name: 'Tracks', color: '#A850FE' },
    { name: 'Danceability', color: '#6EDF36' },
    { name: 'Energy', color: '#3A77E0' },
    { name: 'Mood', color: '#EB690F' },
    { name: 'Crises', color: '#1F2436' },
];

export default function SliderPanel() {

    // const { }

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
        <Box>
            {
                tracksMax > 10 ?
                    /*<SliderRR 
                      name={"Tracks"}
                      max={tracksNumMax} 
                      min={10} 
                      current={tracksNumMax}
                      disabled={false} 
                      colors={'#A850FE'} 
                      label={true}
                      onChange={(value) => this.handleChangeVertical( value, "tracksNum")}
                      onFinalChange = { () => this.handleAndDelayChangeComplete() }
                      labelRange={{max: `${tracksNumMax}`, min: ""}}
                    />*/
                    <SliderDouble
                        name={"Tracks"}
                        max={100}
                        // max={tracksNumMax}
                        min={0}
                        current={0}
                        // current={tracksNumMax}
                        disabled={false}
                        colors={'#A850FE'}
                        label={false}
                    // onChange={(values) => this.handleTracksChange(values)}
                    // onFinalChange={() => this.handleAndDelayChangeComplete()}
                    // labelRange={{ max: `${tracksNumMax}`, min: "" }}
                    />
                    : <SliderSimple
                        name={"Tracks"}
                        max={10}
                        min={0}
                        current={0}
                        disabled={true}
                        colors={'grey'}
                        label={false}
                        onChange={() => null}
                        onFinalChange={() => null}
                        labelRange={{ max: "-", min: "" }}
                    />
            }
            <SliderSimple
                name={"Danceability"}
                max={100}
                min={0}
                current={0}
                disabled={false}
                colors={'#6EDF36'}
                label={false}
                onChange={(value) => this.handleChangeVertical(value, "danceability")}
                onFinalChange={() => this.handleAndDelayChangeComplete()}
            // labelRange={{ max: !this.state.reverse ? "Booty Shake" : "Static", min: "" }}
            />
            <SliderSimple
                name={"Energy"}
                max={100}
                min={0}
                current={0}
                disabled={false}
                colors={'#3A77E0'}
                label={false}
                onChange={(value) => this.handleChangeVertical(value, "energy")}
                onFinalChange={() => this.handleAndDelayChangeComplete()}
            // labelRange={{ max: !this.state.reverse ? "Intense" : "Chill", min: "" }}
            />
            <SliderSimple
                name={"Mood"}
                max={100}
                min={0}
                current={0}
                disabled={false}
                colors={'#EB690F'}
                label={false}
            // onChange={(value) => this.handleChangeVertical(value, "mood")}
            // onFinalChange={() => this.handleAndDelayChangeComplete()}
            // labelRange={{ max: !this.state.reverse ? "Happy" : "Sad", min: "" }}
            />
            <SliderSimple
                name={"Crises"}
                max={6}
                min={1}
                current={1}
                disabled={false}
                colors={'#1F2436'}
                label={false}
            // onChange={(value) => this.handleChangeVertical(value, "crises")}
            // onFinalChange={() => this.handleAndDelayChangeComplete()}
            // labelRange={{ max: "Some", min: "" }}
            />
        </Box>
    )
}


