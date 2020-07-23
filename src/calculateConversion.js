const quantity = document.getElementById('quantity')
const time = document.getElementById('time')
const conversionTableHead = document.getElementById('conversion-head')
const tableFlow = document.getElementById('table-body-flow')
const flowrateTableHead = document.getElementById('flowrate-head')
const button = document.getElementById('calculate')
const tableArea = document.getElementById('table-area')


button.addEventListener('click', (e) => {
  // Generates regular conversion in first tab
  const conversion = new Converter(unitOptions.value, quantity.value)
  const calculation = conversion.calculate_conversion()
  const unitList = Object.keys(calculation)
  let table = document.createElement('table')
  table.classList.add("table")
  table.classList.add("is-bordered")
  table.classList.add("is-striped")
  table.classList.add("is-hoverable")
  let thead = document.createElement('thead')
  let row = document.createElement('tr')
  let head = document.createElement('tr')

  unitList.forEach((unit) => {
    let header = document.createElement('th')
    header.innerHTML = unit
    thead.appendChild(header)
  })
  for (property of Object.values(calculation)){
    let data = document.createElement('td')
    data.innerHTML = property
    row.appendChild(data)
  }
  table.appendChild(thead)
  table.appendChild(row)
  tableArea.appendChild(table)

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
