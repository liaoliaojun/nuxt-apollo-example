import {ref, watchEffect} from '@vue/composition-api'

let imageEl: HTMLImageElement
let loadingEl: HTMLImageElement
const wrapInstance = ref<HTMLDivElement>()
const innerInstance = ref<HTMLDivElement>()
const isShow = ref(false)

// 创建dom元素并挂载到bdoy下
const initInstance = () => {
  if (!wrapInstance.value || !innerInstance.value) {
    const wrap = document.createElement('div')
    const inner = document.createElement('div')
    wrap.className = 'fixed left-0 top-0 right-0 bottom-0 z-50 overflow-hidden bg-black bg-opacity-50'
    inner.className = 'w-full min-h-full py-5 px-10 overflow-auto text-center'

    wrap.append(inner)
    document.body.append(wrap)

    wrapInstance.value = wrap
    innerInstance.value = inner
    wrap.addEventListener('click', function () {
      isShow.value = !isShow.value
    })
  }
  return wrapInstance.value
}

const cratedLoading = () => {
  if (loadingEl) return loadingEl
  loadingEl = new Image()
  loadingEl.src = require('./spinner.gif')
  // client-height/2 - paddingTop - loadingEl height/2
  // 50vh - 20px - 20px
  loadingEl.style.margin = 'calc(50vh - 40px) auto 0 auto'
  return loadingEl
}

// 状态更新, 同步至dom事件
watchEffect(() => {
  if (wrapInstance.value) {
    // 操作dom显示隐藏
    wrapInstance.value.style.display = isShow.value ? 'flex' : 'none'
  }
})

export default function useImagePreview () {
  // 服务端加载时，不执行
  if (process.server) return {}

  const handlerClick = () => {
    isShow.value = !isShow.value
    return isShow.value
  }

  const showPreview = (src: string = '') => {
    if (!src) return
    // init loading
    cratedLoading()

    if (!wrapInstance.value || !innerInstance.value) {
      initInstance()
    }
    // 清空旧的图片
    if (innerInstance.value) innerInstance.value.innerHTML = ''
    // 图片是否加载完毕
    let loaded = false
    // 加载新图片
    imageEl = new Image()
    // 屏幕高度
    const clientHeight = document.body.clientHeight
    // 等待图片加载完成
    imageEl.onload = function () {
      const {height} = imageEl
      imageEl.className = 'bg-white mx-auto'
      // imageEl.style.cursor = '-webkit-zoom-out'
      imageEl.style.cursor = 'zoom-out'
      // 图片高度小于屏幕高度时
      if (height < (clientHeight - 40)) {
        imageEl.style.transform = 'translateY(calc(50vh - 50%))'
      }
      if (innerInstance.value) {
        innerInstance.value.innerHTML = ''
        innerInstance.value.append(imageEl)
        loaded = true
      }
    }
    imageEl.onerror = function () {
      isShow.value = false
    }
    imageEl.src = src
    isShow.value = true
    // 如果500ms内, 图片为记载完成, 则加载loading
    setTimeout(() => {
      if (!loaded && innerInstance.value) {
        innerInstance.value.append(loadingEl)
      }
    }, 380)
  }

  const addEvent = (elName: string = '') => {
    const imgs: HTMLImageElement[] = Array.from(document.querySelectorAll(elName))
    imgs.forEach((item) => {
      if (!item.src) return
      item.style.cursor = 'pointer'
      item.addEventListener('click', function () {
        showPreview(item.src)
      }, false)
    })
  }

  return {
    isShow,
    wrapInstance,
    innerInstance,
    showPreview,
    addEvent,
    handlerClick,
  }
}
