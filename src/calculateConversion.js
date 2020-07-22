const table = document.getElementById('table-body')
const button = document.getElementById('calculate')
const quantity = document.getElementById('quantity')


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
