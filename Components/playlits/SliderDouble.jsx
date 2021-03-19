import React, { useState, useLayoutEffect } from 'react'
import { Range, Direction, getTrackBackground } from 'react-range';
import { Box, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { slidersState } from '../../hooks/useSortState';

function toFixed(value) {
    const temp = Math.round(value * 10);
    // console.log(temp)
    return Number(parseFloat(temp / 10).toFixed(1));
}

export default function SliderDouble({ info, onClick, sorting }) {
    const [slidersValues, setSliderValue] = useRecoilState(slidersState);
    // let MIN; //toFixed(slidersValues[info.feature].min - 0.05) >= 0 ? toFixed(slidersValues[info.feature].min - 0.05) : 0;
    // let MAX; // toFixed(slidersValues[info.feature].max + 0.05) <= 1 ? toFixed(slidersValues[info.feature].max + 0.05) : 1;
    const STEP = 0.01;
    // let MIN = 0;
    // let MAX = 1;
    const [state, setState] = useState({ values: [0, 1], final: [0, 1], MIN: 0, MAX: 1 });

    useLayoutEffect(() => {
        const min = toFixed(slidersValues[info.feature].min - 0.05) >= 0 ? toFixed(slidersValues[info.feature].min - 0.05) : 0;
        const max = toFixed(slidersValues[info.feature].max + 0.05) <= 1 ? toFixed(slidersValues[info.feature].max + 0.05) : 1;
        setState(current => ({ ...current, values: [min, max], final: [min, max], MIN: min, MAX: max }));
    }, [])

    // console.log(MIN, MAX);

    const handleChange = (values) => {
        setState(current => ({ ...current, values: values }));
    }

    const handleFinalChange = (values) => {
        setState(current => ({ ...current, values: values, final: values }));
        setSliderValue(current => ({ ...current, [info.feature]: { min: values[0], max: values[1] } }));
    }

    return (
        <Box align="center" p={'1rem'} css={{ width: 95, boxSizing: 'border-box', color: 'white' }}>
            {/* <Tooltip title={info.tooltip} arrow placement="left"> */}
            <Typography variant="body2" component="h3" onClick={onClick(info.feature)} style={{ position: 'relative', cursor: 'pointer' }}>
                {info.name}
                <div style={{ position: 'absolute', transform: 'scale(0.7)', top: -3, right: -18, fill: info.color }}>
                    {sorting.feature === info.feature && sorting.icon}
                </div>
            </Typography>
            {/* </Tooltip> */}
            <Range
                className='sliderRange'
                direction={Direction.Up}
                values={state.values}
                step={STEP}
                min={state.MIN}
                max={state.MAX}
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
                                    min: state.MIN,
                                    max: state.MAX,
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