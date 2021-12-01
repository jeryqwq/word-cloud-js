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
declare type DataItem = Array<{ value: number, name: string }>
declare type Options = {
  el: any,
  data: DataItem,
  config?: Config
}
class WordChart{
  value: Array<DataItem>;
  composFn?: (_: Array<DataItem>) => Array<DataItem>;
  el: HTMLElement;
  getFontSize: (val: number) => number
  private constructor( options: Options ) {
    this.el = options.el
    this.value = []
    this.getFontSize = rangMapping([0, 1], [1, 100])
  }
  getValue(_: number): number {
    return this.getFontSize(_)
  }
  trigger() {
    this.value = this.composFn && this.composFn(this.value)  as Array<DataItem> 
    return this
  }
  scan(fn: (_: Array<DataItem>) => Array<DataItem>){
    this.composFn = compos(this.composFn, fn)
    // this.queue.push(() => {
    //   this.value = fn(this.value || init)
    //   return this.value
    // })
    return this
  }
  static of(config: Options) {
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
}).scan(val => {
  console.log(val)
  return val
}).trigger()
console.log(instance)
