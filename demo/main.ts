import '../src/ft-owl-logo.ts'

const owl = document.getElementById('owl') as import('../src/ft-owl-logo.ts').FtOwlLogo
const toggle = document.getElementById('loading-toggle') as HTMLInputElement

toggle.addEventListener('change', () => {
  owl.loading = toggle.checked
})
