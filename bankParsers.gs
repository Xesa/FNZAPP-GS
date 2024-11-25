function parseBankData(data, bank) {

  var parsedData;

  switch(bank) {
    case "Sabadell": parsedData = parseSabadellData(); break;
    default: parsedData = ""; break;
  }
  
  return parsedData;
}

function parseSabadellData(data) {

  // Eliminamos cualquier instancia del string "Ahorrar una parte"
  // Separamos el string por líneas
  // Es posible que haya líneas en blanco, las eliminamos
  // Recorremos las líneas de 4 en 4
  // Cada transacción tendrá 4 líneas: fecha, concepto, importe y saldo (que no usamos)

  const lines = data.replace('Ahorrar una parte', '').split('\n').filter(e => e !== '');
  
  let transactions = [];

  for (let i = 0; i < lines.length; i += 4) {

    if (i + 3 > lines.length) {break;}
    
    const date = parseDate(lines[i]);
    const concept = lines[i + 1];
    const amount = parseFloat(lines[i + 2].replace(' €', '').replace(',', '.'));
    const week = parseWeek(date);
    const month = new Date(date.getFullYear(), date.getMonth(), 1);
    const bank = "SABADELL";

    const transaction = [month,date,week,bank,"","","",concept,amount,false,false]
    
    transactions.push(transaction);
  }

  return transactions;
}
