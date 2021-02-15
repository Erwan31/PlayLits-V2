import { makeStyles } from '@material-ui/core';
import React from 'react';
import { defaults, Line } from 'react-chartjs-2';
import ScrollBarsCustom from '../Components/ScrollBarsCustom';
import { getArrayOfAudioFeature } from '../utils/getters'
import { data, options } from './chartLogic';
// Deafult font for the charts
defaults.global.defaultFontFamily = 'Nunito';

const useStyles = makeStyles((theme) => ({
    root: {
        display: ' flex',
        alignItems: 'center',
        alignContent: 'flex - start',
        justifyContent: 'space - evenly',
        position: 'relative',
        height: 150,
        width: 100,
        // width: '100%',
        /*background: linear-gradient(to right, #dc2e2e, #e74d49, #f16764, #f9807e, #ff9898);*/
    },
    chart: {
        margin: '1rem 0.5rem',
        padding: '1rem 2rem 1rem 1rem',
        width: 200,
        height: 100,
        borderRadius: theme.spacing(4),
        // backgroundImage: 'linear-gradient(to right, #6bdc2e, #78e54e, #85ee69, #93f781, #a1ff98)',
    }
}))

export default function Charts({ audioFeatures, sliders }) {

    console.log(audioFeatures, sliders);
    const classes = useStyles();

    return (
        <ScrollBarsCustom
            height={150}
        // width={'100%'}
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
            <div className={classes.root}>
                {sliders.map(slider => {

                    if (slider.feature === null) return;

                    const arr = getArrayOfAudioFeature(audioFeatures, slider.feature);
                    const label = slider.name;

                    return (
                        <div
                            className={classes.chart}
                            style={{ backgroundImage: getChartLinearColor(slider.color) }}
                        >
                            <Line
                                data={data(arr, label)}
                                options={options(label)}
                            />
                        </div>
                    )
                }
                )}
            </div>
        </ScrollBarsCustom>
    );
}

function getChartLinearColor(color) {

    const init = hexToRgb(color);
    const rgbArr = [init];
    let value = parseInt(color.substring(1), 16);
    const string = [];

    for (let index = 1; index < 5; index++) {

        rgbArr.push({ r: rgbArr[index - 1].r * 1.1, g: rgbArr[index - 1].g * 1.1, b: rgbArr[index - 1].b * 1.4 });
        // console.log(index, arr);
    }

    return `linear-gradient(to right, rgb(${rgbArr[0].r}, ${rgbArr[0].g}, ${rgbArr[0].b}), rgb(${rgbArr[1].r}, ${rgbArr[1].g}, ${rgbArr[1].b}), rgb(${rgbArr[2].r}, ${rgbArr[2].g}, ${rgbArr[2].b}), rgb(${rgbArr[3].r}, ${rgbArr[3].g}, ${rgbArr[3].b}), rgb(${rgbArr[4].r}, ${rgbArr[4].g}, ${rgbArr[4].b}))`;

    // return `linear - gradient(to right, ${ rgbArr[0]}, ${ rgbArr[1]}, ${ rgbArr[2]}, ${ rgbArr[3]}, ${ rgbArr[4]})`;
}

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
