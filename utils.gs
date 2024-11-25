function parseDate(dateStr) {
  const parts = dateStr.split('/');
  return new Date(parts[2], parts[1] - 1, parts[0]);  // Año, Mes (base 0), Día
}

function parseWeek(date) {

  //Determinar el primer lunes del mes
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfWeek = firstDayOfMonth.getDay();

  const daysUntilMonday = dayOfWeek === 0 ? 1 : (7 -dayOfWeek + 1) % 7;
  const firstMondayOfMonth =  firstDayOfMonth.setDate(firstDayOfMonth.getDate() + daysUntilMonday);

  //Determinar la semana en función de cuantos días han pasado desde el primer lunes del mes
  const daysFromFirstMonday = Math.floor((date - firstMondayOfMonth) / (1000 * 60 * 60 * 24));
  let week = Math.ceil(daysFromFirstMonday / 7) + 1;
  
  return "SEMANA " + week;
}
