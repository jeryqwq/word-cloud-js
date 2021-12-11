import { initParams, findLocation } from './renderEl';
import { rotate3D, move3D } from './batchAnimate';
import WordChart from './WordChart';
const temp = []
for (let index = 0; index < 15; index++) {
  temp.push({
    value: Math.floor(Math.random() * 1000),
    name: `test-${index}`
  })
}
const config = {
  el: document.querySelector('#app'),
  data: temp,
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
instance.effect(({item, index, instance}) => {
  const props = findLocation(item, instance, index)
  return {   // 生成布局，初始化动画参数  x, y, z, el...，传给下一层业务继续扫描
    ...item,
    ...props
  }
})
.trigger() // 调用trigger不触发任何事件执行
console.log(instance)

// export const render = function (options: Options) {

// }