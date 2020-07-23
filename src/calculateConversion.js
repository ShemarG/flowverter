const quantity = document.getElementById('quantity')
const time = document.getElementById('time')
const table = document.getElementById('table-body')
const conversionTableHead = document.getElementById('conversion-head')
const tableFlow = document.getElementById('table-body-flow')
const flowrateTableHead = document.getElementById('flowrate-head')
const button = document.getElementById('calculate')


button.addEventListener('click', (e) => {
  // Generates regular conversion in first tab
  const conversion = new Converter(unitOptions.value, quantity.value)
  const calculation = conversion.calculate_conversion()
  conversionTableHead.innerHTML = ''
  table.innerHTML = ''
  const unitList = Object.keys(calculation)
  let row = document.createElement('tr')
  let head = document.createElement('tr')

  unitList.forEach((unit) => {
    let header = document.createElement('th')
    header.innerHTML = unit
    conversionTableHead.appendChild(header)
  })
  for (property of Object.values(calculation)){
    let data = document.createElement('td')
    data.innerHTML = property
    row.appendChild(data)
  }
  table.appendChild(row)

  //Generates flowrate conversion in second tab
  flowrateTableHead.innerHTML = ''
  tableFlow.innerHTML = ''
  const flowrate = conversion.calculate_rates(timeUnits.value)
  console.log(flowrate)
  unitList.forEach((unit) => {
    let header = document.createElement('th')
    header.innerHTML = `${unit}/${timeUnits.value}`
    flowrateTableHead.appendChild(header)
  })
})
