import { compos, rangMapping } from './helper/index'
declare type WordItemAfter = {
  per: number,
  text: string
}
declare type Config = {
  trace?: true,
  spiralResolution?: 1, //Lower = better resolution
  spiralLimit?: number,
  lineHeight?: 0.8,
  xWordPadding?: 0,
  yWordPadding?: 3,
  font?: "sans-serif",
  renderFn?: (item: WordItemAfter) => HTMLElement
}
declare type DataItem = { value: number, name: string }
declare type OptionData = Array<DataItem>
declare type Options = {
  el: any,
  data: OptionData ,
  config?: Config
}
class WordChart{
  value:   OptionData;
  composFn?: (_: DataItem, idx: number) => DataItem;
  effectComposFn?: (_: DataItem, idx: number) => void;
  el: HTMLElement;
  getSize: (val: number) => number
  sortValue:  OptionData;
  private constructor( options: Options ) {
    this.el = options.el
    this.value = options.data
    this.sortValue = options.data.sort((a,b) => (a.value - b.value) > 0 ? 1 : -1)
    this.getSize = rangMapping([0, 1], [this.sortValue[0].value, this.sortValue[this.sortValue.length - 1].value])
  }
  getValue(_: number): number {
    return this.getSize(_)
  }
  trigger() {
    this.value = this.value.map((i, index) => {
      this.effectComposFn && this.effectComposFn(i, index)
      return this.composFn ? this.composFn(i, index) : i
    })
    return this
  }
  scan(fn: (_: DataItem, idx: number) => DataItem): WordChart{
    if(this.composFn) {
      this.composFn = compos<DataItem>(this.composFn, fn)
    }else{
      this.composFn = fn
    }
    return this
  }
  effect(fn: (_:DataItem, idx: number) => void): WordChart{
    if(this.effectComposFn) { // 多个函数使用compos去组合
      this.effectComposFn = compos<DataItem>(this.effectComposFn, fn)
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
for (let index = 0; index < 100; index++) {
  temp.push({
    value: Math.floor(Math.random() * 1000),
    name: `test-${index}`
  })
}
const instance = WordChart.of({
  el: document.body,
  data: temp
}).scan((val:DataItem)=> {
  return {
    ...val,
    name: '--' + val.name
  }
}).scan((val:DataItem)=> {
  return {
    ...val,
    name: val.name + '--'
  }
}).effect((item) => {
  console.log(item)
}).trigger()
console.log(instance)
