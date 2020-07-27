// Conversion Elements
const conversionQuantity = document.getElementById('conversionQuantity')
const conversionUnit = document.getElementById('conversionUnit')
const conversionButton = document.getElementById('conversionButton')

// Flowrate Elements
const flowrateQuantity = document.getElementById('flowrateQuantity')
const flowrateUnit = document.getElementById('flowrateUnit')
const flowrateTimeUnit = document.getElementById('flowrateTimeUnit')
const flowrateButton = document.getElementById('flowrateButton')

// Volume Elements
const volumeRateQuantity = document.getElementById('volumeRateQuantity')
const volumeRateUnit = document.getElementById('volumeRateUnit')
const volumeRateTimeUnit = document.getElementById('volumeRateTimeUnit')
const volumeButton = document.getElementById('volumeButton')
const volumeResultsDisplay = document.getElementById('volumeResultsDisplay')

// Time Elements
const timeVolumeQuantity = document.getElementById('timeVolumeQuantity')
const timeVolumeUnit = document.getElementById('timeVolumeUnit')
const timeRateQuantity = document.getElementById('timeRateQuantity')
const timeRateUnit = document.getElementById('timeRateUnit')
const timeRateTimeUnit = document.getElementById('timeRateTimeUnit')
const timeButton = document.getElementById('timeButton')
const timeResultsDisplay = document.getElementById('timeResultsDisplay')
const day = document.getElementById('day')
const hr = document.getElementById('hr')
const min = document.getElementById('min')
const sec = document.getElementById('sec')

let row_counter = 0

// Generates the flow rate table
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

// Inputs and dictionaries for the table generator
const table_dict = {columns: {sec: 'per second', min: 'per minute', hr: 'per hour', day: 'per day'}}
let input = {
  columns: ['per second', 'per minute', 'per hour', 'per day'],
  rows: ['Imperial Gallon', 'Litre', 'Cubic Metre', 'Cubic Centimetre', 'Cubic Foot', 'Cubic Inch']
}
let rates_table = document.getElementById('rates_table')
tableGenerator(input, rates_table)

// Populates table with data
let table_pop = (data) => {
  for (let key in data){
    for (let time in data[key]){
      let cell = document.querySelector(`[data-column="${table_dict.columns[time]}"][data-row="${key}"]`)
      if (data[key][time] <= 0.0001 || data[key][time] > Math.pow(10, 9)) {
        let itemExponent = parseFloat(data[key][time]).toExponential(3)
        let arr = itemExponent.split('e')
        cell.innerHTML = `${arr[0]} \u2715 10${arr[1].sup()}`
      } else {
        cell.innerHTML = data[key][time].toLocaleString()
      }
    }
  }
}

let input_validator = (fields) => {
  let allValid = true
  fields.forEach((field) => {
    if (!parseInt(field)){
      allValid = false
      return {valid:allValid, invalid:field}
    }
  })
  return {valid:allValid}
}


conversionButton.addEventListener('click', (e) => {
  // Generates regular conversion in first tab
  let validInput = input_validator([conversionQuantity.value])
  if (validInput.valid){
    const conversion = new Converter(conversionUnit.value, conversionQuantity.value)
    const calculation = conversion.calculate_conversion()
    let inputAmount = calculation[calculation.name]
    calculation[calculation.name] = '-'
    console.log(calculation)
    const unitList = Object.keys(calculation)
    let table = document.getElementById('conversion-table')
    let row_list = table.children[0].children
    let row = document.createElement('tr')
    let header_row = document.getElementById('header-row')
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
      if (item <= 0.0001 || item >= Math.pow(10, 9)) {
        let itemExponent = parseFloat(item).toExponential(3)
        let arr = itemExponent.split('e')
        cell.innerHTML = `${arr[0]} \u2715 10${arr[1].sup()}`
      } else {
        cell.innerHTML = item.toLocaleString()
      }
      row.appendChild(cell)
    })
    if (row_counter > 4){
      console.log(row_list[row_list.length])
      row_list[row_list.length-1].remove()
    }
    header_row.after(row)
    row_counter++
  }
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
  let validInput = input_validator([flowrateQuantity.value])
  if (validInput.valid){
    const conversion = new Converter(flowrateUnit.value, flowrateQuantity.value)
    let rates = conversion.calculate_rates(flowrateTimeUnit.value)
    table_pop(rates)
  }
})

volumeButton.addEventListener('click', (e) => {
  let validInput = input_validator([
    document.getElementById('day').value,
    document.getElementById('hr').value,
    document.getElementById('min').value,
    document.getElementById('sec').value,
    volumeRateQuantity.value
  ])
  if (validInput.valid && (day.value*86400 + hr.value*3600 + min.value*60 +sec.value != 0)){
    const volumeTime = {
      day:parseInt(document.getElementById('day').value),
      hr:parseInt(document.getElementById('hr').value),
      min:parseInt(document.getElementById('min').value),
      sec:parseInt(document.getElementById('sec').value)
    }
    const conversion = new Converter(volumeRateUnit.value, volumeRateQuantity.value)
    let volumes = conversion.calculate_volume_elapsed(volumeTime, volumeRateTimeUnit.value)
    volumeResultsDisplay.innerHTML = volumes
  }
})

timeButton.addEventListener('click', (e) => {
  let validInput = input_validator([timeRateQuantity.value, timeVolumeQuantity.value])
  if (validInput.valid){
    const conversion = new Converter(timeRateUnit.value, timeRateQuantity.value)
    let time_required = conversion.calculate_time_required(timeVolumeQuantity.value, timeVolumeUnit.value, timeRateTimeUnit.value)
  }
})
