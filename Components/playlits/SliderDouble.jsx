import React, { useState, useEffect } from 'react'
import { Range, Direction, getTrackBackground } from 'react-range';
import { Box, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { slidersState } from '../../utils/States/states';

const useStyles = makeStyles((theme) => ({
    text: {
        color: 'white',
    }
}));

export default function SliderDouble({ info, max, length }) {

    const STEP = 1, MIN = 0;
    const [MAX, setMax] = useState(max);
    const classes = useStyles();
    const [state, setState] = useState({ values: [0, max], final: [0, max] });
    const [slidersValues, setSliderValue] = useRecoilState(slidersState);

    console.log(length, max);

    useEffect(() => {
        setMax(current => current = length);
        setState(current => ({ ...current, values: [0, length], final: [0, length] }))
    }, [length]);

    useEffect(() => {
        setSliderValue(current => ({ ...current, tracks: [state.values[0], state.values[1]] }));
    }, [])

    const handleChange = (values) => {
        setState(current => ({ ...current, values: values }));
    }

    const handleFinalChange = (values) => {
        setState(current => ({ ...current, values: values, final: values }));
        setSliderValue(current => ({ ...current, tracks: [values[0], values[1]] }));
    }

    const diff = () => {
        return state.values[1] - state.values[0] > 10 ? state.values[1] - state.values[0] : 10;
    }

    return (
        <Box align="center" p={'1rem'} css={{ width: 110, boxSizing: 'border-box', color: 'white' }}>
            <Tooltip title={info.tooltip} arrow placement="left">
                <Typography variant="body1" component="h3">{info.name}</Typography>
            </Tooltip>
            <Typography variant="caption" component="p" gutterBottom style={{ color: '#737BF4' }}>
                {diff()}
            </Typography>
            <Range
                className='sliderRange'
                direction={Direction.Up}
                values={state.values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={handleChange}
                onFinalChange={handleFinalChange}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            flexGrow: 1,
                            width: '24px',
                            display: 'flex',
                            alignSelf: 'center',
                            height: '95%',
                            margin: '1rem auto 1rem auto'
                        }}
                    >
                        <div
                            className='thumbRange'
                            ref={props.ref}
                            style={{
                                width: '4px',
                                height: '100%',
                                borderRadius: '4px',
                                background: getTrackBackground({
                                    values: state.values,
                                    colors: ['#ccc', info.color, '#ccc'],
                                    min: MIN,
                                    max: MAX,
                                    direction: Direction.Up
                                }),
                                alignSelf: 'center',
                                margin: 'auto'
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props, isDragged, index }) => (
                    <Tooltip title={info.thumb[index]} arrow>
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '20px',
                                width: '24px',
                                borderRadius: '4px',
                                backgroundColor: '#FFF',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 2px 6px #2C3049',
                                outline: 'none'
                            }}
                        >
                            {isDragged &&
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '0px',
                                        left: '24px',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: '11px',
                                        fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                                        padding: '4px',
                                        borderRadius: '4px',
                                        backgroundColor: '5ABCDE'
                                    }}
                                >
                                    {state.values[index]}
                                </div>
                            }
                            <div
                                style={{
                                    width: '14px',
                                    height: '4px',
                                    backgroundColor: isDragged ? info.color : '#CCC'
                                }}
                            />
                        </div>
                    </Tooltip>
                )}
            />
        </Box>
    );
}