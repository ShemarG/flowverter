const quantity = document.getElementById('quantity')
const time = document.getElementById('time')
const conversionTableHead = document.getElementById('conversion-head')
const tableFlow = document.getElementById('table-body-flow')
const flowrateTableHead = document.getElementById('flowrate-head')
const button = document.getElementById('calculate')
const tableArea = document.getElementById('table-area')

let table_pop = (data) => {
  for (let key in data){
    for (let time in data[key]){
      // console.log(d)
      let cell = document.querySelector(`[data-column="${table_dict.columns[time]}"][data-row="${key}"]`)
      cell.innerHTML = data[key][time]
    }
  }
}

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

  let rates = conversion.calculate_rates(timeUnits.value)
  table_pop(rates)
})

const tableGenerator = (params, table) => {
let column_header_row = document.createElement('tr')
column_header_row.appendChild(document.createElement('td'))
params.columns.forEach((col_title) => {
  let col_header = document.createElement('th')
  col_header.innerHTML = col_title
  column_header_row.appendChild(col_header)
})
table.appendChild(column_header_row)
params.rows.forEach((row_title, index) => {
  let row = document.createElement('tr')
  let row_header = document.createElement('th')
  row_header.innerHTML = row_title
  row.appendChild(row_header)
  params.columns.forEach((title) => {
    let cell = document.createElement('td')
    cell.setAttribute('data-column', title)
    cell.setAttribute('data-row', row_title)
    row.appendChild(cell)
  })

  table.appendChild(row)
})
}

const table_dict = {columns: {sec: 'per second', min: 'per minute', hr: 'per hour', day: 'per day'}}

let input = {
columns: ['per second', 'per minute', 'per hour', 'per day'],
rows: ['Imperial Gallon', 'Litre', 'Cubic Metre', 'Cubic Centimetre', 'Cubic Foot', 'Cubic Inch']
}

let rates_table = document.getElementById('rates_table')
tableGenerator(input, rates_table)
