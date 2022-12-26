// See options const for min = 0 & max = 1

export const data = (arr, label) => {
    const labels = arr.map( () => "");

    return {
        // !! Important not to create a bug and display all data -> https://github.com/reactchartjs/react-chartjs-2/issues/341
        labels: labels,
        datasets: [
            {
                label: label,
                fill: false,
                lineTension: 0,
                backgroundColor: "#eeeeee",
                borderColor: "#eeeeee",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "round",
                borderWidth: 0.5,
                pointBorderWidth: 0.5,
                pointHoverRadius: 2,
                pointHoverBorderWidth: 3,
                pointRadius: 1,
                pointHitRadius: 2,
                data: arr,
            }
        ],
    };
};

export const chartOptions = function(yLabel, ticksLimits = {min: 0, max: 1}){
    return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false,
                scaleLabel: {
                    display: false,
                        
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: yLabel,
                    fontFamily: "Nunito",
                    fontStyle: "bold",
                    fontSize: 12,
                    fontColor: "#eeeeee"
                },
                gridLines: {
                    display:false
                },
                ticks: {
                    display: false, //this will remove only the label
                    // ! Important => it's limiting the range displayed on the chart
                    min: ticksLimits.min,
                    max: ticksLimits.max,
                }
            }]
        }
    };
}; 