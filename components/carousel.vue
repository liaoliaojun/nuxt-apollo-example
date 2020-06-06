<template>
  <div class="carousel-box overflow-hidden relative" :style="`width: ${width};`">
    <div class="carousel-wrap flex overflow-hidden h-full"
          :style="{
            width: (itemLen * 2 * 100) + '%',
            transform: `translateX(${translateX})`,
            transition: duration ? `transform ${duration}ms` : '',
          }"
          @mouseover="mouseover"
          @mouseleave="mouseleave">
      <slot index="1" />
      <slot index="2" />
    </div>

    <ul class="point-box flex justify-center">
      <li
        v-for="(item, index) in itemLen" :key="index"
        class="point-item llj-btn ml-6 first:ml-0"
        :class="{'active': index === activeIndex || index === activeIndex - itemLen}"
        @click="pointToggle(index)"
        @mouseover="mouseover"
        @mouseleave="mouseleave"
      />
    </ul>
  </div>
</template>

<script>
  // import {defineComponent} from '@vue/composition-api'
  const Hammer = () => import('hammerjs')
  // import Hammer from 'hammerjs'

  export default {
    props: {
      itemLen: {
        type: Number,
        default: 0,
      },
      width: {
        type: String,
        default: '',
      },
      time: {
        type: Number,
        default: 5000,
      },
    },

    data () {
      return {
        activeIndex: 0,
        translateX: '0%',
        timer: null,
        duration: 500, // ms
      }
    },

    mounted () {
      this.setTimer()
      this.initHammer()
    },

    methods: {
      async initHammer () {
        const hammer = await Hammer().then(mod => mod.default || mod)
        const hammerEl = new hammer.Manager(this.$el)
        const Swipe = new hammer.Swipe({direction: 6})

        // Add the recognizer to the manager
        hammerEl.add(Swipe)
        hammerEl.on('swipeleft', (e) => {
          this.toggle(this.activeIndex + 1)
        })
        hammerEl.on('swiperight', (e) => {
          this.toggle(this.activeIndex > 0 ? this.activeIndex - 1 : this.itemLen - 1)
        })
      },
      toggle (index) {
        // 无缝滚动
        if (index > this.itemLen) {
          this.duration = 0
          this.translateX = '0%'
          setTimeout(_ => {
            this.duration = 500
            this.goIndex(1)
          // @TODO https://juejin.im/post/5d5514606fb9a06af92b9ca4
          // UI Render 60hz
          }, 17)
        } else {
          this.goIndex(index)
        }
      },

      goIndex (index) {
        this.translateX = index * -100 / this.itemLen / 2 + '%'
        this.activeIndex = index
        this.$emit('toggleIndex', index)
      },

      pointToggle (index) {
        this.toggle(index)
        // 清除计时器
        window.clearInterval(this.timer)
        // 重启
        this.setTimer()
      },

      // 移入
      mouseover () {
        window.clearInterval(this.timer)
      },

      // 移出
      mouseleave () {
        window.clearInterval(this.timer)
        this.setTimer()
      },

      setTimer () {
        this.timer = window.setInterval(_ => {
          this.toggle(this.activeIndex + 1)
        }, this.time)
      },
    },
  }
</script>

<style lang="scss">
  .carousel-box {
    width: 100%;

    .carousel-wrap {
      // transition: transform 1s;
      // transform: translateX(-50%);

      .item-block {
        width: 200px;
        height: 200px;
      }
    }

    .point-box {
      @apply cursor-pointer absolute w-full;

      bottom: 10px;

      .point-item {
        width: 24px;
        height: 24px;
        border-radius: 50%;

        &::before {
          @apply absolute;

          content: '';
          width: 45%;
          height: 1px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(0, 0, 0, .65);
        }

        &:first-child {
          margin-left: 0;
        }

        &:hover,
        &.active {
          background-color: rgba(255, 255, 255, .6);
        }
      }
    }
  }
</style>