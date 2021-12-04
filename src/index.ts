import { compos, rangMapping, throttle } from './helper/utils'
import { renderItem } from './renderEl';
import {DIRECTION} from './helper/constant'
import { rotateY, rotateX, move } from './helper/animate'
class WordChart {
  value: OptionData;
  composFn?: (_: ScanItemType) => DataItem;
  effectComposFn?: (_: ScanItemType) => void;
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
    this.speed = this.config.speed || 50
    this.getValue = rangMapping([0, 1], this.config.fontSizeRange || [12, 24])
  }
  trigger() {
    this.value = this.value.map((i, index) => this.composFn ? this.composFn({item: i, index: index, instance: this}) : i)
    this.value.forEach((i, idx) => {this.effectComposFn && this.effectComposFn({ item:i, index: idx, instance: this })})
    return this
  }
  animate(fn: (_: OptionData, __: WordChart) => void):WordChart {
    const that = this
    let cur = new Date().getTime()
    void function run(){
      window.requestAnimationFrame(() => {
        if(new Date().getTime() - cur >= 200) {
          fn(that.value, that)
          cur = new Date().getTime()
        }
        run()
      })
    }()
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
const instance = WordChart.of(config)
.scan(({item, index, instance}) =>  { // 一层一层的返回扫描后的结果
  const props = renderItem(item, index, instance)  // 生成布局，初始化动画参数  x, y, z, el...，传给下一层业务继续扫描
  return {
    ...item,
    ...props
  }
}).scan((item: any)=> {

  return {
    ...item
  }
})
.animate((tempArr, instance) => {
  tempArr.forEach(i => {
    const { el } = i as MappingDataItem
    const { transform} = move(i as MappingDataItem , instance)
    el.style.transform = transform
  })
})
.effect(({item, index, instance}) => { // 副作用
  setInterval(() => {
    const {z, y} = rotateX(item as MappingDataItem, instance)
    item.z = z 
    item.y = y
    const { x, z: z1 } = rotateY(item as MappingDataItem, instance)
    item.z = z1
    item.x = x
  }, 200)
}).trigger()
console.log(instance)
