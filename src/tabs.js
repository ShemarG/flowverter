const conversionTab = document.getElementById('conversion')
const flowrateTab = document.getElementById('flowrate')
const volumeDurationTab = document.getElementById('volume-duration')
const conversionSection = document.getElementById('conversion-tab')
const volumeDurationSection = document.getElementById('volume-duration-tab')
const flowrateSection = document.getElementById('flowrate-tab')

window.addEventListener('load', (e) => {
  flowrateSection.style.display = "none"
  volumeDurationSection.style.display = "none"
})

conversionTab.addEventListener('click', (e) => {
  conversionTab.classList.add("is-active")
  flowrateTab.classList.remove("is-active")
  volumeDurationTab.classList.remove("is-active")
  conversionSection.style.display = "flex"
  flowrateSection.style.display = "none"
  volumeDurationSection.style.display = "none"

})

flowrateTab.addEventListener('click', (e) => {
  conversionTab.classList.remove("is-active")
  flowrateTab.classList.add("is-active")
  volumeDurationTab.classList.remove("is-active")
  conversionSection.style.display = "none"
  flowrateSection.style.display = "flex"
  volumeDurationSection.style.display = "none"
})

volumeDurationTab.addEventListener('click', (e) => {
  conversionTab.classList.remove("is-active")
  flowrateTab.classList.remove("is-active")
  volumeDurationTab.classList.add("is-active")
  conversionSection.style.display = "none"
  flowrateSection.style.display = "none"
  volumeDurationSection.style.display = "flex"
})
