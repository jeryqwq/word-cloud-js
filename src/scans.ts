import { createTextNode } from './helper/genItem'
import { checkRepeat, compareLocation, setElConfig } from './helper/utils'

export const initParams = function(_: ScanParams): MappingDataItem{
  const { item, index, instance } = _; 
  const { value: { length }, RADIUSX, RADIUSY } = instance
  const itemEl = createTextNode(item)
  const k = -1 + (2 * (index + 1) - 1) / length
  const a = Math.acos(k)
  const b = a * Math.sqrt(length * Math.PI)
  const x = RADIUSX * Math.sin(a) * Math.cos(b)
  const y  = RADIUSY * Math.sin(a) * Math.sin(b)
  const z = RADIUSX * Math.cos(a)
  setElConfig(itemEl, instance.config)
  instance.elWrap.appendChild(itemEl)
  return {
    ...item,
    el: itemEl,
    x,
    y,
    z,
  }
}
let domLocations: Array<DOMRect> = []
let prevIndex = 0
export const findLocation =  function (_: ScanParams): MappingDataItem {
  const { item, index, instance } = _; 
  const { width, height } = instance.elRect
  const el = createTextNode(item)
  el.style.fontSize = instance.getValue(item.value / instance.maxValue) + 'px'
  let retx, rety
  for( let i = prevIndex; i <= (width + height)/ 2; i++) {
  instance.elWrap.appendChild(el)
  const [x, y] = instance.getSpiral(i * 5)
  const left = x + width / 2
  const top = y + height / 2
  setElConfig(el, instance.config)
  // el.style.transform = `translate(${left}px, ${top}px) rotate(${Math.floor(Math.random()*40)}deg)`
  el.style.transform = `translate(${left}px, ${top}px)`
  const rectObj = el.getBoundingClientRect().toJSON()
  const res = checkRepeat(rectObj, domLocations, instance.config.gridSize || 0)
    if(!res) {
      domLocations.push(rectObj)
      instance.layout = compareLocation(rectObj, instance.layout)
      prevIndex = prevIndex// 已经被算过的点几乎没有概率还能容纳下其他元素了，直接忽略
      retx = rectObj.x
      rety = rectObj.y
      break
    }
  }
  return {
    ...item,
    x: retx,
    y: rety,
    el
  }
}


