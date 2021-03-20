import React, { useState } from 'react'
import { Range, Direction, getTrackBackground } from 'react-range';
import { Box, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { slidersState } from '../../hooks/useSortState';

const useStyles = makeStyles((theme) => ({
    text: {
        color: 'white',
    }
}));

export const SliderSimple = React.memo(function ({ info, onClick, sorting }) {

    const STEP = 1, MIN = 0, MAX = 100;
    const classes = useStyles();
    const [slidersValues, setSliderValue] = useRecoilState(slidersState);
    const [state, setState] = useState({ values: [slidersValues[info.feature]], final: [slidersValues[info.feature]] });

    const handleChange = (values) => {
        setState(current => ({ ...current, values: values }));
    }

    const handleFinalChange = (values) => {
        // console.log(values, 'values');
        setState(current => ({ ...current, values: values, final: values }));
        setSliderValue(current => ({ ...current, [info.feature]: values[0] }));
    }

    // console.log('render');

    return (
        <Box align="center" p={'1rem'} css={{ width: 95, boxSizing: 'border-box', color: 'white' }}>
            <Typography variant="body2" component="h3" onClick={onClick(info.feature)} style={{ position: 'relative', cursor: 'pointer' }}>
                {info.name}
                <div style={{ position: 'absolute', transform: 'scale(0.7)', top: -3, right: -18, fill: info.color }}>
                    {sorting.feature === info.feature && sorting.icon}
                </div>
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
                            height: '125%',
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
                                    colors: [info.color, '#ccc'],
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
                renderThumb={({ props, isDragged }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '16px',
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
                        { isDragged &&
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
                                {state.values[0]}
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
                )}
            />
        </Box>
    );
})