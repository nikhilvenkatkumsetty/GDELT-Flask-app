var lines = text.split(/[,\. ]+/g),
  data = Highcharts.reduce(lines, function (arr, word) {
    var obj = Highcharts.find(arr, function (obj) {
      return obj.name === word;
    });
    if (obj) {
      obj.weight += 1;
    } else {
      obj = {
        name: word,
        weight: 1
      };
      arr.push(obj);
    }
    return arr;
  }, []);

Highcharts.chart('container2', {
  accessibility: {
    screenReaderSection: {
      beforeChartFormat: '<h5>{chartTitle}</h5>' +
        '<div>{chartSubtitle}</div>' +
        '<div>{chartLongdesc}</div>' +
        '<div>{viewTableButton}</div>'
    }
  },
  series: [{
    type: 'wordcloud',
    data: data,
    name: 'Occurrences'
  }],
  title: {
    text: 'Wordcloud'
  }
});