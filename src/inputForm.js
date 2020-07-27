const unitOptions = document.getElementsByClassName('unitOptions')
const timeUnits = document.getElementsByClassName('time-units')
const unitsList = ['L','Imp. gal','in\u00B3','ft\u00B3','cm\u00B3','m\u00B3']
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
