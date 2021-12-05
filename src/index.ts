import { compos, rangMapping, throttle } from './helper/utils'
import { renderItem } from './renderEl';
import {DIRECTION} from './helper/constant'
import { rotateY, rotateX, move } from './helper/animate'
class WordChart {
  value: OptionData;
  composFn?: (_: ScanItemType) => DataItem; // 组合scan
  effectComposFn?: (_: ScanItemType) => void; // 组合effect
  animateComposFn?:(_: OptionData) => void; // 组合animate动画
  el: HTMLElement;
  getValue: (val: number) => number
  sortValue: OptionData;
  maxValue: number;
  elRect: DOMRect;
  RADIUSX: number;
  RADIUSY: number;
  DIRECTION: number
  config: Config
  speed: number
  private constructor( options: Options ) {
    this.el = options.el
    this.value = [...options.data] // clone
    this.sortValue = options.data.sort((a,b) => (a.value - b.value) > 0 ? 1 : -1) // muttable
    this.maxValue = this.sortValue[this.sortValue.length - 1].value
    this.elRect = this.el.getBoundingClientRect()
    const { width, height } = this.elRect
    this.RADIUSX = (width - 50) / 2
    this.RADIUSY = (height - 50) / 2
    this.DIRECTION = DIRECTION.LEFT2RIGHT
    this.config = options.config || {}
    this.speed = this.config.speed || 200
    this.getValue = rangMapping([0, 1], this.config.fontSizeRange || [12, 24])
  }
  trigger() {
    this.value = this.value.map((i, index) => this.composFn ? this.composFn({item: i, index: index, instance: this}) : i)
    this.value.forEach((i, idx) => {this.effectComposFn && this.effectComposFn({ item:i, index: idx, instance: this })})
    this.animateComposFn && this.animateComposFn(this.value)
    return this
  }
  animate(fn: (_: OptionData) => void, ms: number):WordChart {
    const that = this
    const throttledFn = throttle(fn, ms)
    const wrap = function(){
      void function run(){
        window.requestAnimationFrame(() => {
          throttledFn(that.value)
          run()
        })
      }()
    }
    if(this.animateComposFn) {
      this.animateComposFn = compos<DataItem, OptionData>(this.animateComposFn, wrap)
    }else{
      this.animateComposFn = wrap
    }
    return this
  }
  scan(fn: (_: ScanItemType) => DataItem): WordChart{
    if(this.composFn) {
      this.composFn = compos<DataItem, ScanItemType>(this.composFn, fn)
    }else{
      this.composFn = fn
    }
    return this
  }
  effect(fn: (_: ScanItemType) => void): WordChart{
    if(this.effectComposFn) { // 多个函数使用compos去组合
      this.effectComposFn = compos<DataItem, ScanItemType>(this.effectComposFn, fn)
    }else{
      this.effectComposFn = fn
    }
    return this
  }
  static of(config: Options): WordChart{
    return new WordChart(config)
  }
}
const temp = []
for (let index = 0; index < 30; index++) {
  temp.push({
    value: Math.floor(Math.random() * 1000),
    name: `test-${index}`
  })
}
const config = {
  el: document.querySelector('#app'),
  data: temp,
}
// el.appendChild(itemEl)

const instance = WordChart.of(config)  // 类实例
instance.scan(({item, index, instance}) => {
  const props = renderItem(item, index, instance)
  const { el } = props
  const { el: elWrap } = instance
  elWrap.appendChild(el)
  return {   // 生成布局，初始化动画参数  x, y, z, el...，传给下一层业务继续扫描
    ...item,
    ...props
  }
})
.animate((tempArr) => {
  tempArr.forEach(i => {
    const { el } = i as MappingDataItem
    const { transform, opacity, zIndex} = move(i as MappingDataItem , instance)
    el.style.transform = transform
    el.style.opacity = opacity + ''
    el.style.zIndex = zIndex + ''
  })
}, 20) //高刷屏默认触发间隔 120hz > 60hz > 30hz, 防止在高配或者低配电脑上requestAnimateFrame表现不一致，手动配置一个间隔，
.animate((tempArr) => { // 副作用
  tempArr.forEach(item => {
    const {z, y} = rotateX(item as MappingDataItem, instance)
    item.z = z 
    item.y = y
    const { x, z: z1 } = rotateY(item as MappingDataItem, instance)
    item.z = z1
    item.x = x
  })
}, 20)
.effect(({ instance, item}) => {
  const { getValue } = instance
  const per = item.value / instance.maxValue
  const mappingVal = Math.floor(getValue(per))
  item.el && (item.el.style.fontSize = mappingVal + 'px')
})
.trigger()
console.log(instance)

// export const render = function (options: Options) {

// }