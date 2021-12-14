import { compos, rangMapping, throttle, archimedeanSpiral } from './helper/utils'
import { DIRECTION, defaultOptions } from './helper/constant'
import { mergeOptions } from './helper/utils';
class WordChart {
  value: OptionData;
  composFn?: (_: ScanItemType) => DataItem; // 组合scan
  effectComposFn?: (_: ScanItemType) => void; // 组合effect
  animateComposFn?:(_: OptionData) => void; // 组合animate动画
  finallyComposFn?:(instance: WordChart) => void;
  el: HTMLElement;
  elWrap: HTMLElement
  getValue: (val: number) => number
  sortValue: OptionData;
  maxValue: number;
  elRect: DOMRect;
  RADIUSX: number;
  RADIUSY: number;
  DIRECTION: number
  config: Config
  speed: number
  getSpiral: (_: number) => [number, number]
  layout: WordChartLayout
  toolTipEl: HTMLElement
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
    this.config = mergeOptions(options.config, defaultOptions) || {}
    this.speed = this.config.speed || 200
    this.getSpiral = archimedeanSpiral([width, height], {b: width / 100})
    this.getValue = rangMapping([0, 1], this.config.sizeRange as [number, number] || [12, 24])
    this.elWrap = document.createElement('div')
    this.elWrap.style.width = '100%'
    this.elWrap.style.height = '100%'
    this.el.appendChild(this.elWrap)
    this.toolTipEl = document.createElement('div')
    this.toolTipEl.style.position = 'fixed'
    this.elWrap.appendChild(this.toolTipEl)
    this.layout = {
      left: Infinity,
      top: Infinity,
      bottom: 0,
      right: 0
    }
  }
  trigger() {
    this.value = this.value.map((i, index) => this.composFn ? this.composFn({item: i, index: index, instance: this}) : i)
    this.value.forEach((i, idx) => {this.effectComposFn && this.effectComposFn({ item:i, index: idx, instance: this })})
    this.animateComposFn && this.animateComposFn(this.value)
    setTimeout(() => {
      this.finallyComposFn && this.finallyComposFn(this)
    }, 0);
    return this
  }
  animate(fn: (_: OptionData) => void, ms: number = 20):WordChart {
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
  finally(fn: (_: WordChart) => void): WordChart {
    if(this.finallyComposFn) {
      this.finallyComposFn = compos<DataItem, WordChart>(this.finallyComposFn, fn)
    }else{
      this.finallyComposFn = fn
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