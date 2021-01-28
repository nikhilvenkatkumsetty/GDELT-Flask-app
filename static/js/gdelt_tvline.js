Chart.defaults.scale.gridLines.display = false;
new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: labels2,
      datasets: dataset2,
    },
    options: {
      title: {
        display: true,
        text: 'Coverage Volume'
      },
      tooltips: {
        enabled: true,
        mode: 'nearest',
        intersect : false 
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: '% Airtime (15 secs block)'
          }
        }]
      }   
    }
  });