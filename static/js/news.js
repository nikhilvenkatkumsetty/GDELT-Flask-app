Chart.defaults.scale.gridLines.display = false;
new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{ 
          data: values,
          label: "Average tone",
          borderColor: "#3e95cd",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Coverage average tone'
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
            labelString: 'Average Tone'
          }
        }]
      }   
    }
  });