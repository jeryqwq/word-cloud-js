##  词云图
<img src="./demo.gif" style="width: 500px">

File           |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
---------------|----------|----------|----------|----------|-------------------|
All files      |    62.69 |       60 |    52.63 |    61.02 |                   |
 src           |    40.48 |       40 |       25 |    41.03 |                   |
  WordChart.ts |    40.48 |       40 |       25 |    41.03 |... 63,66,67,69,71 |
 src/helper    |      100 |      100 |      100 |      100 |                   |
  constant.ts  |      100 |      100 |      100 |      100 |                   |
  utils.ts     |      100 |      100 |      100 |      100 |                   |
### 简介
#### 优点:
 `相比目前大众开源的词图， 增加了更多的配置， 且支持自定义dom渲染和自定义tooltop和节点之间的间隔等,会按照真实渲染后的css属性去做碰撞检测， 支持颜色多种模式配置，按值的范围或数组索引配置， 不会遗漏数据，哪怕数据的占比很小或者相同占比却没有空间渲染的情况， 支持海量大数据的业务下渲染， 节点数超过一定数量会开启异步渲染，不会阻塞浏览器其他任务，仅在空闲的时间执行，目前其他词图库会默认选择遗漏，支持滚动假3d模式， 可配置斜率`
#### 缺点：
 `目前暂不支持在词内渲染，未基于目前流行库canvas碰撞检测的做法，相比带来的好处就是更小的内存消耗，优化后的空间的利用率可能会没有基于canvas高`
### 纯ts开发，无任何第三方依赖
### 基于函数式编程
### 扩展性强，可自定义追加动画和其他数据
### TS构建，丰富的测试用例
### API
### 数据格式
默认配置：
```ts
import { MODE, ORIENTATION, init } from 'word-cloud-js'
const defaultOptions = {
  mode: MODE.SCROLL, // 模式 ， 滚动 ｜ 普通
  orientation: TEXT_ORIENTATION.RANDOM, // 方向
  animate: true, // 是否开启普通模式的动画
  colors: ["#ff9ecc", "#00b6ff", "#f3bd00", "#884dff", "#d3f0ff ", "#5cc4ee", "#eadf2b", "#e1583e", "#05e1b5", "#3e61e1", "#884dff", "#c59eff", "#06b8d1"],
  sizeRange: [12, 24], // 文字大小
  gridSize: 5, //字符间隔 (不包含padding)
  borderColor: "rgba(105,207,255)", // 单项的css配置
  borderWidth: 0,
  backgroundColor: "rgba(16,22,24,0)",
  padding: [1, 1], // 单项的padding属性
  events: { // 自定义事件
    click: (item: MappingDataItem, instance: WordChartBase) => {
      console.log(item, '----')
    }
  },
  tooltip: {
    show: true,
    // render(item: MappingDataItem, el: HTMLElement) {
    //   return `<span style="color: red">${item.name}</span>`
    // },
    padding: [15, 35],
    backgroundColor: 'rgba(50,50,50,0.7)',
    borderRadius: 0,
    textStyle: {
      color: '#fff',
      fontFamily: 'Microsoft YaHei',
      fontSize: 14,
      lineHeight: 30
    },
    bgStyle: {
      width: 0,
      height: 0,
      url: "/static/vis_resource/background/bg-tooltip.png"
    },
  }
}

const config = {
  el: document.querySelector('#app') as HTMLElement || document.body,
  data: temp,
  config: defaultOptions,
  hooks: { // 函数扩展， 适用于自增加的其他业务, 如增加其他动画， 渲染每一项之前执行自己的钩子...
    // scan: (_: ScanParams) => {
    //   console.log(_)
    //   return _
    // },
    // effect: (_: MappingDataItem) => {
    //   console.log(_, '-effect')
    // },
    finally: (_: WordChartBase) => {
      console.log(_, '---')
    }
  }
}
```
## todos
* 完善文档
* 增加测试用例
* 增加配置和api
* 尝试使用canvas位运算和时间分片机制接入， 适配海量数据模式实现流畅渲染
* 基于该库开发vue， react对应的组件
