const unitOptions = document.getElementById('unitOptions')

window.addEventListener('load', (e) => {
  const unitList = Object.keys(dictionary)
  const unitElements = unitList.map((unit) => {
    let option = document.createElement('option')
    option.innerHTML = unit
    unitOptions.appendChild(option)
  })
})
