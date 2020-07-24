const unitOptions = document.getElementsByClassName('unitOptions')
const timeUnits = document.getElementsByClassName('time-units')
const unitsList = ['Litre','Imperial Gallon','Cubic Inch','Cubic Foot','Cubic Centimetre','Cubic Metre']
const timeUnitsList = ['sec', 'min', 'hr', 'day']

window.addEventListener('load', (e) => {
  for (let select of unitOptions){
    unitsList.forEach((unit) => {
      let option = document.createElement('option')
      option.innerHTML = unit
      select.appendChild(option)
    })
  }

  for (let select of timeUnits){
    timeUnitsList.forEach((unit) => {
      let option = document.createElement('option')
      option.innerHTML = unit
      select.appendChild(option)
    })
  }

})
