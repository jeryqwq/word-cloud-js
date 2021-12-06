import { initParams } from './renderEl';
import { rotateY, rotateX, move } from './helper/animate'
import WordChart from './WordChart';
const temp = []
for (let index = 0; index < 60; index++) {
  temp.push({
    value: Math.floor(Math.random() * 1000),
    name: `test-${index}`
  })
}
const config = {
  el: document.querySelector('#app'),
  data: temp,
}
// el.appendChild(itemEl)

const instance = WordChart.of(config)  // 类实例
instance.scan(({item, index, instance}) => {
  const props = initParams(item, index, instance)
  const { el } = props
  const { el: elWrap } = instance
  elWrap.appendChild(el)
  return {   // 生成布局，初始化动画参数  x, y, z, el...，传给下一层业务继续扫描
    ...item,
    ...props
  }
})
.animate((tempArr) => {
  tempArr.forEach(i => {
    const { el } = i as MappingDataItem
    const { transform, opacity, zIndex} = move(i as MappingDataItem , instance)
    el.style.transform = transform
    el.style.opacity = opacity + ''
    el.style.zIndex = zIndex + ''
  })
}, 20) //高刷屏默认触发间隔 120hz > 60hz > 30hz, 防止在高配或者低配电脑上requestAnimateFrame表现不一致，手动配置一个间隔，
.animate((tempArr) => {
  tempArr.forEach(item => {
    const {z, y} = rotateX(item as MappingDataItem, instance)
    item.z = z 
    item.y = y
    const { x, z: z1 } = rotateY(item as MappingDataItem, instance)
    item.z = z1
    item.x = x
  })
}, 20)
.effect(({ instance, item}) => {
  const { getValue } = instance
  const per = item.value / instance.maxValue
  const mappingVal = Math.floor(getValue(per))
  item.el && (item.el.style.fontSize = mappingVal + 'px')
})
.trigger() // 调用trigger不触发任何事件执行
console.log(instance)

// export const render = function (options: Options) {

// }