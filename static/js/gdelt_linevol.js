Chart.defaults.scale.gridLines.display = false;
new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{ 
          data: val1,
          label: "Volume",
          borderColor: "#3e95cd",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Coverage Volume Intensity'
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Monitored Articles'
          }
        }]
      }   
    }
  });