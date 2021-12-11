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

  for( let i = 0; i <= 150; i++) {
  const el = createTextNode(item)
  el.style.fontSize = instance.getValue(item.value / instance.maxValue) + 'px'
  console.log(instance.getValue(item.value / instance.maxValue))
  instance.el.appendChild(el)
  const [x, y] = instance.getSpiral(i * 5)
  const left = x + width / 2 
  const top = y + height / 2
  el.style.left = left + 'px'
  el.style.top = top +'px'
  el.style.lineHeight = '0.8'
  const curRect = el.getBoundingClientRect()
  instance.el.removeChild(el)
    if(!domLocations.length) {  // 首次定位
      domLocations.push(curRect)
      break
    }else{ // 冲突检测
        const res = checkRepeat(curRect, domLocations)
        if(!res) {
          domLocations.push(curRect)
        instance.el.appendChild(el)
          break
        }
    }
  }
 
}


