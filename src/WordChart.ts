import { compos, rangMapping, throttle, archimedeanSpiral } from './helper/utils'
import { DIRECTION, defaultOptions } from './helper/constant'
import { mergeOptions } from './helper/utils';
class WordChart implements WordChartBase {
  value: OptionData;
  composFn?: (_: ScanItemType) => DataItem | Promise<DataItem>; // 组合scan
  effectComposFn?: (_: ScanItemType) => void; // 组合effect
  animateComposFn?:(_: OptionData) => void; // 组合animate动画
  finallyComposFn?:(instance: WordChart) => void;
  el: HTMLElement
  elWrap: HTMLElement
  getValue: (val: number) => number
  sortValue: OptionData
  maxValue: number
  elRect: DOMRect
  RADIUSX: number
  RADIUSY: number
  DIRECTION: number
  config: Config
  speed: number
  getSpiral: (_: number) => [number, number]
  layout: WordChartLayout
  toolTipEl: HTMLElement
  active?: Active
  isDestory: boolean
  private constructor( options: Options ) {
    this.el = options.el
    this.isDestory = false
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
    this.getSpiral = archimedeanSpiral([width, height])
    this.getValue = rangMapping([0, 1], [this.config.sizeMin || 12, this.config.sizeMax || 24])
    this.elWrap = document.createElement('div')
    this.elWrap.style.width = '100%'
    this.elWrap.style.height = '100%'
    this.el.appendChild(this.elWrap)
    this.el.style.position = 'relative'
    this.toolTipEl = document.createElement('div')
    this.toolTipEl.style.position = 'fixed'
    this.toolTipEl.style.transition = 'all .4s'
    this.el.appendChild(this.toolTipEl)
    this.clearActive = throttle(this.clearActive, 300)
    this.setActive = throttle(this.setActive, 100)
    this.el.addEventListener('mouseout', this.clearActive)
    this.layout = {
      left: Infinity,
      top: Infinity,
      bottom: 0,
      right: 0
    }
  }
  destory () {
    this.isDestory = true // 停止动画
    this.el.removeEventListener('mouseout', this.clearActive)
    this.el.removeChild(this.elWrap)
  }
  async trigger() {
    // this.value = this.value.map((i, index) => this.composFn ? this.composFn({item: i, index: index, instance: this}) : i)
    for(let i = 0; i < this.value.length; i++) { // 处理异步任务
      const item = this.value[i]
      const res = this.composFn && this.composFn({item, index: i, instance: this})
      if(res instanceof Promise) {
        this.value[i] = await res
      }else{
        this.value[i] = res as MappingDataItem
      }
      this.effectComposFn && this.effectComposFn({ item: this.value[i], index: i, instance: this })
    }
    // this.value.forEach((i, idx) => {this.effectComposFn && this.effectComposFn({ item:i, index: idx, instance: this })})
    this.animateComposFn && this.animateComposFn(this.value)
    setTimeout(() => {
      this.finallyComposFn && this.finallyComposFn(this)
    }, 0);
    return this
  }
  clearActive = () =>  {
    this.active = undefined
    this.toolTipEl.style.display = 'none'
  }
  setActive = (item: MappingDataItem, el: HTMLElement, e: MouseEvent) => {
    this.active = {
      item,
      el
    }
    this.toolTipEl.style.left = e.x + 'px'
    this.toolTipEl.style.top = e.y + 'px'
    this.toolTipEl.style.display = 'inline-block'
    if(this.config?.tooltip?.render) {
      const context = this.config.tooltip.render(item, this.toolTipEl)
      if(typeof context === 'string') {
        this.toolTipEl.innerHTML = context
      }else if( context.constructor.toString().includes('Element')) { // dom
        this.toolTipEl.appendChild(context)
      }else{
        console.error(`the render function should return a HTMLElement or Html String, not a ${context.constructor.toString()}`)
      }
    }else{ // use setting
      this.toolTipEl.style.padding = '5px 10px'
      this.toolTipEl.style.backgroundColor = 'rgb(105, 207, 255)'
      this.toolTipEl.style.borderRadius = '5px'
      this.toolTipEl.textContent = `${item.name}: ${item.value}`
    }
  }
  animate(fn: (_: OptionData) => void, ms: number = 20):WordChart {
    const that = this
    const throttledFn = throttle(fn, ms)
    const wrap = function(){
      void function run(){
        window.requestAnimationFrame(() => {
          throttledFn(that.value)
          !that.isDestory && run()
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
  scan(fn: (_: ScanItemType) => DataItem | Promise<DataItem>): WordChart{
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