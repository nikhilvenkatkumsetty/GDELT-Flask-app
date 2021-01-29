Chart.defaults.scale.gridLines.display = false;
var chartData = {
    labels : labels_bar,
    datasets:[{
        label: "Percentage on news",
        borderColor: "rgb(0, 127, 255)",
        backgroundColor: "rgba(0, 127, 255, 0.3)",
        borderWidth: 1.5,
        data : data_bar,
        
    }]
}
var ctx = document.getElementById("tone-chart").getContext("2d");
var myChart = new Chart(ctx, {
type: 'bar',
data: chartData,
options : {
    plugins: {
        // Change options for ALL labels of THIS CHART
        datalabels: {
            color: 'grey',
            anchor: 'end',
            align: 'top',
        }
    },
    tooltips: {enabled: false},
    hover: {
    animationDuration: 0},
    legend: { display: false },
    scales: {
        yAxes: [{
        scaleLabel: {
            display: false,
            // labelString: 'News Count in each catagory in percentage'
        },
        ticks: {
            autoSkip: false,                             
            maxTicksLimit: 5
        }
        }],
        xAxes: [{
        scaleLabel: {
            display: false,
            // labelString: 'Sentiment'
        },
        barPercentage: 0.4,
        }]
    },
    title: {
    display: true,
    text: "Station Chart"
}     
}
});