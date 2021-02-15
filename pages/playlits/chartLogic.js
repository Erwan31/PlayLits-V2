export const data = (arr, label, color) => {

    console.log('data', arr);
    const labels = arr.map( () => "");

    return {
            // !! Important not to create a bug and display all data -> https://github.com/reactchartjs/react-chartjs-2/issues/341
            labels: labels,
            datasets: [
                {
                    label: label,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: '#eeeeee',
                    borderColor: '#eeeeee',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'round',
                    borderWidth: 3,
                    //pointBorderColor: color,
                    //pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 3,
                    //pointHoverBackgroundColor: color,
                    //pointHoverBorderColor: color,
                    pointHoverBorderWidth: 3,
                    pointRadius: 1,
                    pointHitRadius: 3,
                    data: arr,
                    /*      backgroundColor: [
                              pattern.draw('square', '#ff6384'),
                              pattern.draw('circle', '#36a2eb'),
                              pattern.draw('diamond', '#cc65fe'),
                              pattern.draw('triangle', '#ffce56')
                          ]
                      */
                }
            ]
        }
};

export const options = function(yLabel){
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
                        fontFamily: 'Nunito',
                        fontStyle: 'bold',
                        fontSize: 16,
                        fontColor: '#eeeeee'
                    },
                    gridLines: {
                        display:false
                    },
                    ticks: {
                        display: false //this will remove only the label
                    }
                }]
            }
        }
    } 