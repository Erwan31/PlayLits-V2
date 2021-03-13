import React, { useState, useLayoutEffect } from 'react'
import { Range, Direction, getTrackBackground } from 'react-range';
import { Box, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { slidersState } from '../../utils/States/states';

const useStyles = makeStyles((theme) => ({
    text: {
        color: 'white',
    }
}));

function toFixed(value) {
    return Number(parseFloat(value).toFixed(3));
}

export default function SliderDouble({ info, onClick }) {

    const classes = useStyles();
    const [slidersValues, setSliderValue] = useRecoilState(slidersState);
    // let MIN = toFixed(slidersValues[info.feature].min) - 0.001;
    // let MAX = toFixed(slidersValues[info.feature].max) + 0.001;
    let STEP = 0.0001;
    let MIN = 0;
    let MAX = 1;
    const [state, setState] = useState({ values: [MIN, MAX], final: [MIN, MAX] });

    console.log(MAX, MIN, STEP);

    const handleChange = (values) => {
        console.log(values);
        setState(current => ({ ...current, values: values }));
    }

    const handleFinalChange = (values) => {
        setState(current => ({ ...current, values: values, final: values }));
        setSliderValue(current => ({ ...current, [info.feature]: { min: values[0], max: values[1] } }));
    }

    return (
        <Box align="center" p={'1rem'} css={{ width: 95, boxSizing: 'border-box', color: 'white' }}>
            <Tooltip title={info.tooltip} arrow placement="left">
                <Typography variant="body2" component="h3" onClick={onClick(info.feature)}>{info.name}</Typography>
            </Tooltip>
            <Typography variant="caption" component="p" gutterBottom style={{ color: '#737BF4' }}>
                {/* {direction === 'asc' ? info.labelUp : info.labelDown} */}
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
                            height: '150%',
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
                                height: '14px',
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