<template>
  <div class="bg-blue-400 flex h-screen justify-center" style="width: 100%;">
    <div class="light-pipe flex items-center" style="width: 1000px; height: 500px;">
      <div ref="mainVm" class="main-line">
        <div class="light-line" :style="`width: ${speedWidth};`" />
        <div class="light-point-wrapper" :style="`padding: 0 ${padding}%`">
          <div
            v-for="(item, index) in datas"
            :key="index"
            class="light-point"
            :class="{'reverse' : index % 2 === 1, 'spray': item.showAnimation}"
          >
            <div class="wrapper-box" :class="{'active': item.showAnimation}">
              <div class="bottom-box" />
              <div class="top-box" />
              <div class="end-point" />
            </div>
            <p v-show="item.showAnimation" class="end-text">{{ item.desc }}</p>
            <h6 class="start-text">{{ item.title }}</h6>
          </div>
        </div>
      </div>
      <button @click="reset">reset</button>
    </div>
  </div>
</template>

<script lang='ts'>
  import {defineComponent, ref, reactive, computed, onMounted} from '@vue/composition-api'

  export default defineComponent({
    setup () {
      const speed = ref(0)
      const speedWidth = computed(() => speed.value + '%')
      const mainVm = ref(null)
      const datas = reactive([
        {title: '数据汇聚', desc: '从数据需求发起的数据汇聚请求，实现实时与批量的汇聚…', showAnimation: false},
        {title: '数据开发', desc: '从数据需求发起的数据汇聚请求，实现实时与批量的汇聚…', showAnimation: false},
        {title: '数据管理', desc: '从数据管控，升级为数据资产的运营，8大管理数据治理工具，提升数据管理效能。', showAnimation: false},
        {title: '数据服务', desc: '从数据需求发起的数据汇聚请求，实现实时与批量的汇聚…', showAnimation: false},
        {title: '数据应用', desc: '指标、标签、仪表盘、丰富的数据应用，通过低代码数据开发平台快速构建…', showAnimation: false},
        {title: '数据监控', desc: '数据调度监控、数据安全监控、数据服务监控、数据质量监控等，提供全...', showAnimation: false},
      ])
      // 数量
      const datasLen = computed(() => datas.length)
      // 内边间距
      const padding = computed(() => 100 / (datasLen.value + 1) / 2)

      // const lightStates = reactive([
      //   {bottom: 0, top: 0, speed: 0},
      //   {bottom: 0, top: 0, speed: 0},
      //   {bottom: 0, top: 0, speed: 0},
      //   {bottom: 0, top: 0, speed: 0},
      // ])

      const timer = ref<number | null>(null)

      const start = () => {
        timer.value = play()
      }

      const reset = () => {
        timer.value = null
        speed.value = 0
        datas.forEach(item => {
          item.showAnimation = false
        })
        start()
      }

      const animationPlay = (speed: number) => {
        const singleWidth = (100 - (padding.value * 2)) / (datasLen.value - 1)

        datas.forEach((item, index) => {
          if (speed > (padding.value + (singleWidth * index)) && item.showAnimation === false) {
            item.showAnimation = true
          }
        })
      }

      const play = (): number => {
        return window.setTimeout(() => {
          speed.value = speed.value + 0.5
          animationPlay(speed.value)

          if (speed.value < 100) {
            timer.value = play()
          }
        }, 16)
      }

      onMounted(() => {
        start()
      })

      return {
        datas,
        datasLen,
        padding,
        mainVm,
        speed,
        speedWidth,
        reset,
      }
    },
  })
</script>

<style lang="scss">
  .light-pipe {
    .main-line {
      width: 100%;
      height: 6px;
      position: relative;
      // box-shadow: 0px 0px 4px 1px rgba(255, 255, 255, 0.5);
      background-color: rgba(255, 255, 255, .33);

      .light-line {
        height: 100%;
        box-shadow: 0px 0px 4px 1px rgba(255, 255, 255, 0.5);
        background-color: #fff;
      }

      .light-point-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        // padding: 0 15%;
        left: 0;
        top: 0;

        .light-point {
          width: 22px;
          height: 22px;
          background-color: #fff;
          box-shadow: 0px 0px 6px 2px rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          margin-top: -7px;
          cursor: pointer;
          position: relative;

          &.spray,
          &:hover {
            &::before,
            &::after {
              content: '';
              width: 0;
              height: 0;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              background-color: transparent;
              border-radius: 50%;
              border: 2px solid rgba(255, 255, 255, 1);
            }

            &::before {
              animation: pointSpray 800ms;
            }

            &::after {
              animation: pointSpray 800ms 400ms;
            }

            &:last-child,
            &:hover {
              &::before {
                animation: pointSpray 800ms infinite ;
              }
              &::after {
                animation: pointSpray 800ms infinite  400ms;
              }
            }
          }

          &.reverse {
            transform: rotateX(180deg);
            top: 0;
            right: -11px;
            .start-text,
            .end-text {
              transform: scale(1,-1);
            }
          }

          .wrapper-box {
            width: 6px;
            height: 0px;
            position: absolute;
            right: 9px;
            bottom: 0;
            overflow: hidden;
            // transition: all 1000ms;
            &.active {
              animation: pointWrapperBox ease-in 1000ms;
              animation-fill-mode: forwards;
            }
          }

          .start-text {
            width: 230px;
            white-space: break-spaces;
            color: #fff;
            font-size: 16px;
            position: absolute;
            left: -1.4em;
            bottom: -28px;
            font-weight: 300;
          }

          .end-point {
            position: absolute;
            width: 14px;
            height: 14px;
            background-color: #fff;
            box-shadow: 0px 0px 6px 2px rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            cursor: pointer;
            right: 101px;
            bottom: 166px;
          }

          .end-text {
            opacity: 0;
            width: 230px;
            white-space: break-spaces;
            color: #fff;
            font-size: 16px;
            position: absolute;
            left: -70px;
            top: -166px;
            font-weight: 300;
            animation: pointEndText 500ms 1000ms;
            animation-fill-mode: forwards;
          }

          .bottom-box {
            position: absolute;
            right: 0;
            bottom: 15px;
            width: 80px;
            height: 80px;
            border-color: #fff;
            border-style: solid;
            border-width: 4px 4px 0 0;
            border-radius: 0 10px 0 0;
            // border-image: linear-gradient(0deg, #fff 100%, transparent 100%);
            // border-image-slice: 10;
          }

          .top-box {
            position: absolute;
            right: 30px;
            bottom: 91px;
            width: 80px;
            height: 80px;
            border-color: #fff;
            border-style: solid;
            border-width: 0 0 4px 4px;
            border-radius: 0 0 0 10px;
            // border-image: linear-gradient(0deg, #fff 100%, transparent 100%);
            // border-image-slice: 10;
          }
        }
      }
    }
  }

  @keyframes pointWrapperBox {
    0%  {
      width: 6px;
      height: 0px;
    }
    30.64%  {
      height: 95px;
    }
    69.34%  {
      width: 120px;
    }
    100%  {
      width: 120px;
      height: 190px;
    }
  }

  @keyframes pointEndText {
    0%  {
      opacity: 0;
    }
    100%  {
      opacity: 1;
    }
  }

  @keyframes pointSpray {
    0%  {
      width: 0;
      height: 0;
      opacity: 1;
    }
    65% {
      opacity: .4;
    }
    100%  {
      width: calc(100% + 20px);
      height: calc(100% + 20px);
      opacity: .1;
    }
  }
</style>
