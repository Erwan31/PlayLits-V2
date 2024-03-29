import { makeStyles } from "@material-ui/core";
import React from "react";
import { defaults, Line } from "react-chartjs-2";
import ScrollBarsCustom from "../ScrollBarsCustom";
import { getArrayOfAudioFeature } from "../../utils/getters";
import { getLinearColor } from "../../utils/getters";
import { data, chartOptions } from "../../utils/playlits/chartLogic";
// Deafult font for the charts  
defaults.global.defaultFontFamily = "Nunito";

const useStyles = makeStyles((theme) => ({
    root: {
        display: " flex",
        alignItems: "center",
        alignContent: "flex - start",
        justifyContent: "space - evenly",
        position: "relative",
        height: 150,
        width: 100,
        // width: '100%',
        /*background: linear-gradient(to right, #dc2e2e, #e74d49, #f16764, #f9807e, #ff9898);*/
    },
    chart: {
        margin: "1rem 0.5rem",
        padding: "1rem 1rem 1rem 1rem",
        width: 200,
        height: 100,
        borderRadius: theme.spacing(4),
        // backgroundImage: 'linear-gradient(to right, #6bdc2e, #78e54e, #85ee69, #93f781, #a1ff98)',
    }
}));

export default function Charts({ list, sliders }) {
    const classes = useStyles();

    return (
        <ScrollBarsCustom
            height={150}
        >
            <div className={classes.root}>
                {sliders.map(slider => {
                    let ticksLimit = {min: 0, max: 1};
                    if (slider.feature === "crises") return;

                    const audioFeature = getArrayOfAudioFeature(list, slider.feature);
                    const label = slider.name;

                    if(slider.feature === "tempo" || slider.feature === "key"){
                        ticksLimit = {min: audioFeature.min, max: audioFeature.max};
                    }

                    return (
                        <div
                            key={slider.feature}
                            className={classes.chart}
                            style={{ backgroundImage: getLinearColor(slider.color) }}
                        >
                            <Line
                                data={data(audioFeature, label)}
                                options={chartOptions(label, ticksLimit)}
                            />
                        </div>
                    );
                }
                )}
            </div>
        </ScrollBarsCustom>
    );
}
