Chart.defaults.scale.gridLines.display = false;
new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: data_labels,
      datasets: dataset,
      fill: false
    },
    options: {
      title: {
        display: true,
        text: 'Time line language'
      },
      tooltips: {
        enabled: true,
        mode: 'nearest',
        intersect : false 
      }
    }
  }); 