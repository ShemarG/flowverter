const unitOptions = document.getElementById('unitOptions')
const timeUnits = document.getElementById('time-units')
const dictionary = {
  'Litre': Litre,
  'Imperial Gallon': Imperial_Gallon,
  'Cubic Inch': Cubic_Inch,
  'Cubic Foot': Cubic_Foot,
  'Cubic Centimetre': Cubic_Centimetre,
  'Cubic Metre': Cubic_Metre
}
const timeRates = ['sec', 'min', 'hr', 'day']

window.addEventListener('load', (e) => {
  const unitList = Object.keys(dictionary)
  unitList.forEach((unit) => {
    let option = document.createElement('option')
    option.innerHTML = unit
    unitOptions.appendChild(option)
  })
  timeRates.forEach((unit) => {
    let option = document.createElement('option')
    option.innerHTML = unit
    timeUnits.appendChild(option)
  });

})
