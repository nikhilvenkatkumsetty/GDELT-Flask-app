Highcharts.chart('container1', {

    chart: {
        type: 'streamgraph',
    },

    title: {
        text: 'Coverage Volume Normalized'
    },
    xAxis: {
        type: 'category', 
        categories: labels1,
        labels: {
            step: 30,
            rotation: 270,
        },
        
    },

    yAxis: {
        visible: true,
        startOnTick: false,
        endOnTick: false,
        title: {
            text: '% Airtime (15s Block)',
        },
        labels: {
            enabled: false
        }
    },

    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            label: {
               display: true
            }
        }
    },
    series: dataset1,

});
