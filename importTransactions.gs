function showImportTransactionsDialog() {

  const htmlOutput = HtmlService.createHtmlOutputFromFile('importTransactionsDialog')
      .setWidth(1240)
      .setHeight(680);

  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Importar movimientos');
}

function showImportTransactionConfirmation(data) {
  const html = HtmlService.createHtmlOutputFromFile('importTransactionsConfirmation')
    .setWidth(1860)
    .setHeight(920);
  
  html.append("<script>var data = " + JSON.stringify(data) + ";</script>");
  SpreadsheetApp.getUi().showModalDialog(html, 'Confirmar Importación');
}

function importTransactions(data, bank) {

  const parsedData = parseBankData(data, bank);
  showImportTransactionConfirmation(parsedData);

}

function addBankData(parsedData) {

  const SS = SpreadsheetApp.getActiveSheet();
  const lastRow = SS.getLastRow();
  const numRows = parsedData.length;
  const numCols = SS.getMaxColumns();

  const range = SS.getRange(lastRow+1, 1, numRows, numCols);
  range.setValues(parsedData);


}
