import {ref, watchEffect} from '@vue/composition-api'

const isShow = ref(false)
const wrapInstance = ref<HTMLDivElement>()
const innerInstance = ref<HTMLDivElement>()
let imageEl: HTMLImageElement

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

  const showPreview = (src = '') => {
    if (!src) return

    if (!wrapInstance.value || !innerInstance.value) {
      initInstance()
    }
    // 清空旧的图片
    if (innerInstance.value) {
      innerInstance.value.innerHTML = ''
    }
    // 加载新图片
    imageEl = new Image()
    imageEl.src = src
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
        innerInstance.value.append(imageEl)
      }
    }
    isShow.value = true
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
