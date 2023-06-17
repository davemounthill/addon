function convertDataFormat(data, columnSelection, dataTransformation) {
  for (var i = 0; i < data.length; i++) {
    if (columnSelection === 'column1' && dataTransformation === 'transformation1') {
      data[i][0] = data[i][0].toUpperCase();
    } else if (columnSelection === 'column2' && dataTransformation === 'transformation2') {
      data[i][1] = data[i][1].toLowerCase();
    } else if (columnSelection === 'column3' && dataTransformation === 'transformation3') {
      data[i][2] = data[i][2].replace(/\s/g, '');
    }
  }
  return data;
}

function validateData(data) {
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++) {
      if (typeof data[i][j] !== 'string') {
        return 'Error: Data is not in the correct format.';
      }
      if (data[i][j] === '') {
        return 'Error: There are missing values in the data.';
      }
    }
  }
  return null;
}

function handleMissingData(data) {
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++) {
      if (data[i][j] === '') {
        data[i][j] = 'N/A';
      }
    }
  }
  return data;
}


