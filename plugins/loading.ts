export default () => {
  if (process.client) {
    setTimeout(() => {
      (document.querySelector('#loading-app') as HTMLElement).style.display = 'none'
    }, 0)
  }
}