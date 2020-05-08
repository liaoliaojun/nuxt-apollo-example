/* eslint-disable */
// tab页切换焦点
// 源码地址：https://candinya.com/js/kratosr.js
export default function () {
  let timer = null
  let OriginTitile = document.title

  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      document.title = '哦哟，崩溃啦~ ' + OriginTitile
      document.querySelector('[rel="icon"]').href = '/failure.ico'
      clearTimeout(timer)
    } else {
      document.title = '又好啦~ ' + OriginTitile
      document.querySelector('[rel="icon"]').href = '/favicon.ico'
      timer = setTimeout(function() {
        document.title = OriginTitile
      }, 2000)
    }
  })
}
