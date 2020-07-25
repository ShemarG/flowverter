// Conversion Elements
const conversionQuantity = document.getElementById('conversionQuantity')
const conversionUnit = document.getElementById('conversionUnit')
const conversionButton = document.getElementById('conversionButton')

// Flowrate Elements
const flowrateQuantity = document.getElementById('flowrateQuantity')
const flowrateUnit = document.getElementById('flowrateUnit')
const flowrateTimeUnit = document.getElementById('flowrateTimeUnit')
const flowrateButton = document.getElementById('flowrateButton')

// Volume & Discharge Elements
const volumeRateQuantity = document.getElementById('volumeRateQuantity')
const volumeRateUnit = document.getElementById('volumeRateUnit')
const volumeRateTimeUnit = document.getElementById('volumeRateTimeUnit')
const volumeButton = document.getElementById('volumeButton')
const volumeResultsDisplay = document.getElementById('volumeResultsDisplay')


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

let table_pop = (data) => {
  for (let key in data){
    for (let time in data[key]){
      let cell = document.querySelector(`[data-column="${table_dict.columns[time]}"][data-row="${key}"]`)
      if (data[key][time] <= 0.0001 || data[key][time] > Math.pow(10, 9)) {
        let itemExponent = data[key][time].toExponential(3)
        let arr = itemExponent.split('e')
        cell.innerHTML = `${arr[0]} \u2715 10${arr[1].sup()}`
      } else {
        cell.innerHTML = data[key][time].toLocaleString()
      }
    }
  }
}

conversionButton.addEventListener('click', (e) => {
  // Generates regular conversion in first tab
  const conversion = new Converter(conversionUnit.value, quantity.value)
  const calculation = conversion.calculate_conversion()
  let inputAmount = calculation[calculation.name]
  calculation[calculation.name] = '-'
  console.log(calculation)
  const unitList = Object.keys(calculation)
  let table = document.getElementById('conversion-table')
  let row = document.createElement('tr')
  let payload = [
    calculation.name,
    inputAmount,
    calculation['Imperial Gallon'],
    calculation['Litre'],
    calculation['Cubic Metre'],
    calculation['Cubic Centimetre'],
    calculation['Cubic Foot'],
    calculation['Cubic Inch']
  ]
  payload.forEach((item) => {
    let cell = document.createElement('td')
    if (item <= 0.0001 || item > Math.pow(10, 9)) {
      let itemExponent = item.toExponential(3)
      let arr = itemExponent.split('e')
      cell.innerHTML = `${arr[0]} \u2715 10${arr[1].sup()}`
    } else {
      cell.innerHTML = item.toLocaleString()
    }
    row.appendChild(cell)
  })
  table.appendChild(row)

  // let thead = document.createElement('thead')
  // let row = document.createElement('tr')
  // let head = document.createElement('tr')
  //
  // unitList.forEach((unit) => {
  //   let header = document.createElement('th')
  //   header.innerHTML = unit
  //   thead.appendChild(header)
  // })
  // for (property of Object.values(calculation)){
  //   let data = document.createElement('td')
  //   data.innerHTML = property
  //   row.appendChild(data)
  // }
  // table.appendChild(thead)
  // table.appendChild(row)
  // tableArea.appendChild(table)

})

flowrateButton.addEventListener('click', (e) => {
  const conversion = new Converter(flowrateUnit.value, flowrateQuantity.value)
  let rates = conversion.calculate_rates(flowrateTimeUnit.value)
  table_pop(rates)
})

volumeButton.addEventListener('click', (e) => {
  const volumeTime = {
    day:parseInt(document.getElementById('day').value) || 0,
    hr:parseInt(document.getElementById('hr').value) || 0,
    min:parseInt(document.getElementById('min').value) || 0,
    sec:parseInt(document.getElementById('sec').value) || 0
  }
  const conversion = new Converter(volumeRateUnit.value, volumeRateQuantity.value)
  let volumes = conversion.calculate_volume_elapsed(volumeTime, volumeRateTimeUnit.value)
  volumeResultsDisplay.innerHTML = volumes
})
