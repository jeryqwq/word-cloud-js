import { compos, rangMapping, throttle } from './helper/utils'
import { DIRECTION } from './helper/constant'

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
export default WordChart