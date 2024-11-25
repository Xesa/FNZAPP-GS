function toggleForecastMode() {
  const toggleCell = SpreadsheetApp.getActive().getSheetByName('Panel de datos').getRange('AJ22').getCell(1,1);
  const toggleValue = toggleCell.getValue() == true ? false : true;
  console.log(toggleValue);
  toggleCell.setValue(toggleValue);

  const modeValue = toggleValue == true ? 'Modo previsión' : 'Modo normal';

  const modeCellResumen = SpreadsheetApp.getActive().getSheetByName('Resumen').getRange('X30').getCell(1,1);

  modeCellResumen.setValue(modeValue);
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Importar desde banco...')
    .addItem('Importar', 'showImportTransactionsDialog')
    .addToUi();
}
