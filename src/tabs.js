const conversionTab = document.getElementById('conversion')
const flowrateTab = document.getElementById('flowrate')
const volumeElapsedTab = document.getElementById('volume-elapsed')
const conversionSection = document.getElementById('conversion-tab')
// const volumeElapsedSection = document.getElementById('volume-elapsed-tab')
// const flowrateSection = document.getElementById('flowrate-tab')

conversionTab.addEventListener('click', (e) => {
  conversionTab.classList.add("is-active")
  flowrateTab.classList.remove("is-active")
  volumeElapsedTab.classList.remove("is-active")
  conversionSection.style.display = "block"
  // flowrateTab.style.display = none
  // volumeElapsedTab.style.display = none

})

flowrateTab.addEventListener('click', (e) => {
  flowrateTab.classList.add("is-active")
  conversionTab.classList.remove("is-active")
  volumeElapsedTab.classList.remove("is-active")
  conversionSection.style.display = "none"
  //volumeElapsedTab.style.display = none
})

volumeElapsedTab.addEventListener('click', (e) => {
  volumeElapsedTab.classList.add("is-active")
  conversionTab.classList.remove("is-active")
  flowrateTab.classList.remove("is-active")
  conversionSection.style.display = "none"
  //flowrateTab.style.display = none
})
