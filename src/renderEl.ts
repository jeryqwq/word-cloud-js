import { createTextNode } from './helper/genItem'
import { checkRepeat } from './helper/utils'

export const initParams = function(item: DataItem, index: number, instance: WordChart): MappingDataItem{
  const { value: { length }, RADIUSX, RADIUSY } = instance
  const itemEl = createTextNode(item)
  const k = -1 + (2 * (index + 1) - 1) / length
  const a = Math.acos(k)
  const b = a * Math.sqrt(length * Math.PI)
  const x = RADIUSX * Math.sin(a) * Math.cos(b)
  const y = RADIUSY * Math.sin(a) * Math.sin(b)
  const z = RADIUSX * Math.cos(a)
  return {
    ...item,
    el: itemEl,
    x,
    y,
    z,
  }
}
let domLocations: Array<DOMRect> = []

export const findLocation = async function (item: DataItem, instance: WordChart, index: number) {
  const { width, height } = instance.elRect
  const el = createTextNode(item)
  el.style.fontSize = instance.getValue(item.value / instance.maxValue) + 'px'
  for( let i = 0; i <= 150; i++) {
  instance.el.appendChild(el)
  const [x, y] = instance.getSpiral(i * 5)
  const left = x + width / 2
  const top = y + height / 2
  el.style.lineHeight = '1'
  el.style.writingMode = item.direction ? 'tb' : ''
  // el.style.transform = `translate(${left}px, ${top}px) rotate(${Math.floor(Math.random()*40)}deg)`
  el.style.transform = `translate(${left}px, ${top}px)`
  el.style.padding = '5px'
  const curRect = el.getBoundingClientRect()
  const rectObj = curRect.toJSON()
    if(!domLocations.length) {  // 首次定位
      domLocations.push(rectObj)
      break
    }else{ // 冲突检测
        const res = checkRepeat(rectObj, domLocations)
        if(!res) {
          domLocations.push(rectObj)
          break
        }
    }
  }
 
}


