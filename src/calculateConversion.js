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

window.addEventListener('load', (e) => {
  volumeResultsDisplay.style.display = "none"
  timeResultsDisplay.style.display = "none"
})

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
const table_dict = {
  columns: {sec: 'per second', min: 'per minute', hr: 'per hour', day: 'per day'},
  rows: {'L': 'Litre', 'Imp. gal': 'Imperial Gallon', 'm\u00B3': 'Cubic Metre', 'cm\u00B3': 'Cubic Centimetre', 'in\u00B3': 'Cubic Inch', 'ft\u00B3': 'Cubic Foot'}
}
let input = {
  columns: ['per second', 'per minute', 'per hour', 'per day'],
  rows: ['Imperial Gallon', 'Litre', 'Cubic Metre', 'Cubic Centimetre', 'Cubic Foot', 'Cubic Inch']
}
let rates_table = document.getElementById('rates_table')
tableGenerator(input, rates_table)

// Populates table with data
let table_pop = (data) => {
  console.log(data)
  for (let key in data){
    for (let time in data[key]){
      let cell = document.querySelector(`[data-column="${table_dict.columns[time]}"][data-row="${table_dict.rows[key]}"]`)
      cell.innerHTML = format_number(data[key][time])
    }
  }
}

let input_validator = (fields) => {
  let allValid = true
  fields.forEach((field) => {
    if (isNaN(parseInt(field)) || parseInt(field) < 0){
      allValid = false
      return {valid:allValid, invalid:field}
    }
  })
  return {valid:allValid}
}

const format_number = (number) => {
  if (number <= 0.0001 || number > Math.pow(10, 9)) {
    let itemExponent = parseFloat(number).toExponential(3)
    let arr = itemExponent.split('e')
    return `${arr[0]} \u2715 10${arr[1].sup()}`
  } else {
    return number.toLocaleString()
  }
}

const mobile_view = (rates) => {
  const mobileTable = document.getElementById('mobile-table')
  mobileTable.innerHTML = ''
  const keys = Object.keys(rates)
  const output = []
  rates_table.style.display = 'none'
  keys.forEach((unit) => {
    output.push(`${unit}`)
    output.push(`Per Second ${format_number(rates[unit]['sec'])}`)
    output.push(`Per Minute ${format_number(rates[unit]['min'])}`)
    output.push(`Per Hour ${format_number(rates[unit]['hr'])}`)
    output.push(`Per Day ${format_number(rates[unit]['day'])}`)
  })
  output.forEach((item, i) => {
    let list_item = document.createElement('p')
    list_item.classList.add('fake-td')
    list_item.classList.add(`td${i}`)
    list_item.innerHTML = item
    mobileTable.appendChild(list_item)
  })

}

conversionButton.addEventListener('click', (e) => {
  // Generates regular conversion in first tab
  let validInput = input_validator([conversionQuantity.value])
  if (validInput.valid){
    const conversion = new Converter(conversionUnit.value, conversionQuantity.value)
    const calculation = conversion.calculate_conversion()
    let inputAmount = calculation[calculation.sym]
    calculation[calculation.sym] = '-'
    console.log(calculation)
    const unitList = Object.keys(calculation)
    let table = document.getElementById('conversion-table')
    let row_list = table.children[0].children
    let row = document.createElement('tr')
    let header_row = document.getElementById('header-row')
    let payload = [
      calculation.name,
      inputAmount,
      calculation['Imp. gal'],
      calculation['L'],
      calculation['m\u00B3'],
      calculation['cm\u00B3'],
      calculation['ft\u00B3'],
      calculation['in\u00B3']
    ]
    if(window.screen.availWidth < 760){
      let mobile_payload = [
        `Converted from: ${calculation.name}`,
        `Quantity: ${format_number(inputAmount)}`,
        `Imperial Gallon: ${format_number(calculation['Imp. gal'])}`,
        `Litre: ${format_number(calculation['L'])}`,
        `Cubic Metre: ${format_number(calculation['m\u00B3'])}`,
        `Cubic Centimetre: ${format_number(calculation['cm\u00B3'])}`,
        `Cubic Foot: ${format_number(calculation['ft\u00B3'])}`,
        `Cubic Inch: ${format_number(calculation['in\u00B3'])}`
      ]
      let containerSpan = document.createElement('span')
      mobile_payload.forEach((item, index) => {
        let list_item = document.createElement('p')
        if (index == 0){
          list_item.classList.add(`td0`)
        }
        list_item.classList.add('fake-td')
        list_item.innerHTML = item
        containerSpan.appendChild(list_item)
      })
      if (row_counter > 4){
        let spanList = table.children[0].children
        console.log(spanList)
        spanList[spanList.length-1].remove()
      }
      header_row.after(containerSpan)
    } else {
      payload.forEach((item) => {
        let cell = document.createElement('td')
        cell.innerHTML = format_number(item)
        row.appendChild(cell)
      })
      if (row_counter > 4){
        row_list[row_list.length-1].remove()
      }
      header_row.after(row)
    }
    row_counter++
  }
})


flowrateButton.addEventListener('click', (e) => {
  let validInput = input_validator([flowrateQuantity.value])
  if (validInput.valid){
    const conversion = new Converter(flowrateUnit.value, flowrateQuantity.value)
    let rates = conversion.calculate_rates(flowrateTimeUnit.value)
    if(window.screen.availWidth < 760){
      return mobile_view(rates)
    }
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

  console.log(validInput.valid)
  if (validInput.valid && (day.value*86400 + hr.value*3600 + min.value*60 +sec.value !== 0)){
    const volumeTime = {
      day:parseInt(document.getElementById('day').value),
      hr:parseInt(document.getElementById('hr').value),
      min:parseInt(document.getElementById('min').value),
      sec:parseInt(document.getElementById('sec').value)
    }
    const conversion = new Converter(volumeRateUnit.value, volumeRateQuantity.value)
    let volumes = conversion.calculate_volume_elapsed(volumeTime, volumeRateTimeUnit.value)
    volumeResultsDisplay.innerHTML = ''
    volumeResultsDisplay.style.display = "flex"
    let list = document.createElement('ul')
    for(key in volumes) {
      let li = document.createElement('li')
      li.innerHTML = `${key}: ${format_number(volumes[key])}`
      list.appendChild(li)
    }
    volumeResultsDisplay.appendChild(list)
  }
})

timeButton.addEventListener('click', (e) => {
  let validInput = input_validator([timeRateQuantity.value, timeVolumeQuantity.value])
  if (validInput.valid){
    const conversion = new Converter(timeRateUnit.value, timeRateQuantity.value)
    let time_required = conversion.calculate_time_required(timeVolumeQuantity.value, timeVolumeUnit.value, timeRateTimeUnit.value)
    timeResultsDisplay.innerHTML = ''
    timeResultsDisplay.style.display = "flex"
    let resultSpan = document.createElement('span')
    resultSpan.innerHTML = `Days: ${time_required.days.toLocaleString()} <br>
    Hours: ${time_required.hours.toLocaleString()} <br>
    Minutes: ${time_required.minutes.toLocaleString()} <br>
    Seconds: ${time_required.seconds.toLocaleString()}`
    timeResultsDisplay.appendChild(resultSpan)
  }

})
