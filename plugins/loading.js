export default () => {
  if (process.client) {
    setTimeout(() => {
      document.querySelector('#loading-app').style.display = 'none'
    }, 0)
  }
}