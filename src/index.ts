import { initParams, findLocation } from './renderEl';
import { rotate3D, move3D } from './batchAnimate';
import WordChart from './WordChart';
const temp = []
const words = ['这根本就不好玩', '再见', 'MDML在线测试', '深入浅出CSS3', 'React测试', '这就是个文字内容', '高刷屏' , '默认触发间隔', '假如我说假如', '发现越来越多的美好', '小惊喜', '不会只有我', '哦次打次', '客气客气']
for (let index = 0; index < words.length; index++) {
  const item = words[index]
  temp.push({
    value: Math.floor(Math.random() * 1000),
    name: item,
    direction: Math.random() > 0.5
  })
}
const config = {
  el: document.querySelector('#app'),
  data: temp,
  config: {
    fontSizeRange: [12, 30]
  }
}

const instance = WordChart.of(config)  // 类实例
// instance.scan(({item, index, instance}) => { // 滚动代码
//   const props = initParams(item, index, instance)
//   const { el } = props
//   const { el: elWrap } = instance
//   elWrap.appendChild(el)
//   return {   // 生成布局，初始化动画参数  x, y, z, el...，传给下一层业务继续扫描
//     ...item,
//     ...props
//   }
// })
// .animate((tempArr) => {
//   move3D(tempArr, instance)
// }, 20) //高刷屏默认触发间隔 120hz > 60hz > 30hz, 防止在高配或者低配电脑上requestAnimateFrame表现不一致，手动配置一个间隔，
// .animate((tempArr) => {
//   rotate3D(tempArr, instance)
// }, 20)
// .effect(({ instance, item}) => {
//   const { getValue } = instance
//   const per = item.value / instance.maxValue
//   const mappingVal = Math.floor(getValue(per))
//   item.el && (item.el.style.fontSize = mappingVal + 'px')
// })
console.time('test')
instance.effect(({item, index, instance}) => {
  const props = findLocation(item, instance, index)
  return {   // 生成布局，初始化动画参数  x, y, z, el...，传给下一层业务继续扫描
    ...item,
    ...props
  }
})
.trigger() // 调用trigger不触发任何事件执行
console.timeEnd('test')

console.log(instance)

// export const render = function (options: Options) {

// }