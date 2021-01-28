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
var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
type: 'bar',
data: chartData,
options : {
    tooltips: {enabled: false},
    hover: {
    animationDuration: 0},
    legend: { display: false },
    animation: {
      onComplete: function() {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        this.data.datasets.forEach(function(dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function(bar, index) {
            var data = dataset.data[index] + "%";
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }
    },
    scales: {
        yAxes: [{
        scaleLabel: {
            display: false,
            // labelString: 'News Count in each catagory in percentage'
        },
        ticks: {
            autoSkip: true,                             
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
    text: line_title + " - Tone analysis"
}     
}
});

new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
        labels: labels_line,
        datasets: [{ 
            data: data_line,
            borderColor: "rgb(0, 127, 255)",
            label: "Media attention trend",
            fill: false
        },
        ]
    },
    options: {
        legend: {
        display: false },
        title: {
        display: true,
        text: line_title + ' - Media attention trend' 
        },
        scales: {
            yAxes: [{
            scaleLabel: {
                display: false,
            },
            ticks: {
                autoSkip: true,                             
                maxTicksLimit: 4
                // labelString: 'Matching news articles'
            }
            }],
            xAxes: [{
            scaleLabel: {
                display: false,
            },
            ticks: {
                autoSkip: true,                             
                maxTicksLimit: 15
            }
            }]
        },
        elements: {
                point:{
                    radius: 1.0
                }
            }
    }
    });