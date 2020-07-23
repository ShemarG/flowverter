const table = document.getElementById('table-body')
const tableFlow = document.getElementById('table-body-flow')
const button = document.getElementById('calculate')
const buttonFlow = document.getElementById('calculate-flow')
const quantity = document.getElementById('quantity')
const quantityFlow = document.getElementById('quantity-flow')
const timeUnits = document.getElementById('time-unit')



button.addEventListener('click', (e) => {
  const conversion = new Converter(unitOptions.value, quantity.value)
  const calculation = conversion.calculate_conversion()
  let row = document.createElement('tr')
  for (property of Object.values(calculation)){
    let data = document.createElement('td')
    data.innerHTML = property
    row.appendChild(data)
  }
  table.appendChild(row)
})

buttonFlow.addEventListener('click', (e) => {
  const conversion = new Converter(unitOptionsFlow.value, quantityFlow.value)
  const calculation = conversion.calculate_rates(conversion.calculate_conversion(), timeUnits.value)
  console.log(calculation)
  let row = document.createElement('tr')
  let symbol = document.createElement('td')
  let unit = document.createElement('td')
  symbol.innerHTML = calculation.sym
  unit.innerHTML = calculation.name
  row.appendChild(symbol)
  row.appendChild(unit)
  for (property of Object.values(calculation)){
    if(property[timeUnit.value]){
      let data = document.createElement('td')
      data.innerHTML = property[timeUnit.value]
      row.appendChild(data)
    }
  }
  tableFlow.appendChild(row)
})
