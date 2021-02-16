import { makeStyles } from '@material-ui/core';
import React from 'react';
import { defaults, Line } from 'react-chartjs-2';
import ScrollBarsCustom from '../Components/ScrollBarsCustom';
import { getArrayOfAudioFeature } from '../utils/getters'
import { data, options } from './chartLogic';
import { getChartLinearColor } from '../utils/getters'
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
        padding: '1rem 1rem 1rem 1rem',
        width: 200,
        height: 100,
        borderRadius: theme.spacing(4),
        // backgroundImage: 'linear-gradient(to right, #6bdc2e, #78e54e, #85ee69, #93f781, #a1ff98)',
    }
}))

export default function Charts({ audioFeatures, sliders }) {

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
                            key={slider.feature}
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
