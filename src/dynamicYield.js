const unitOptions = document.getElementById('unitOptions')
const dictionary = {
  'Litre': Litre,
  'Imperial Gallon': Imperial_Gallon,
  'Cubic Inch': Cubic_Inch,
  'Cubic Foot': Cubic_Foot,
  'Cubic Centimetre': Cubic_Centimetre,
  'Cubic Metre': Cubic_Metre
}

window.addEventListener('load', (e) => {
  const unitList = Object.keys(dictionary)
  const unitElements = unitList.map((unit) => {
    let option = document.createElement('option')
    option.innerHTML = unit
    unitOptions.appendChild(option)
  })
})
