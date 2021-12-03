import { compos, rangMapping } from './helper/utils'
import { renderItem } from './renderEl';

class WordChart {
  value: OptionData;
  composFn?: (_: ScanItemType) => DataItem;
  effectComposFn?: (_: ScanItemType) => void;
  el: HTMLElement;
  getValue: (val: number) => number
  sortValue: OptionData;
  maxValue: number;
  elRect: DOMRect;
  ra
  private constructor( options: Options ) {
    this.el = options.el
    this.value = options.data.map(i => i) // clone
    this.sortValue = options.data.sort((a,b) => (a.value - b.value) > 0 ? 1 : -1) // muttable
    this.maxValue = this.sortValue[this.sortValue.length - 1].value
    this.elRect = this.el.getBoundingClientRect()
    this.RADIUSX =0
    this.RADIUSY = 0
    this.getValue = rangMapping([0, 1], [12, 24])
  }
  trigger() {
    this.value = this.value.map((i, index) => {
      this.effectComposFn && this.effectComposFn({item: i, index, instance: this})
      return this.composFn ? this.composFn({item: i, index: index, instance: this}) : i
    })
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
for (let index = 0; index < 100; index++) {
  temp.push({
    value: Math.floor(Math.random() * 1000),
    name: `test-${index}`
  })
}
const instance = WordChart.of({
  el: document.querySelector('#app'),
  data: temp
})
.scan(({item, index, instance}) =>  { // 一层一层的返回扫描后的结果
  const props = renderItem(item, index, instance)
  return {
    ...item,
    name: '--' + item.name,
    test: 'add str',
    ...props
  }
}).scan((item: any)=> {
  // console.log(item, '--scan 2')
  return {
    ...item,
    name: item.name + '--'
  }
})
.effect(({item}) => { // 异步
  // console.log(item)
}).trigger()
console.log(instance)
