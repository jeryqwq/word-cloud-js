import { createTextNode } from './helper/genItem'

export const renderItem = function(item: DataItem, index: number, instance: WordChart): HTMLElement{
  const { el, getValue, elRect, value: { length } } = instance
  const itemEl = createTextNode(item, elRect)
  const style = {}
  const k = -1 + (2 * (index + 1) - 1) / length
  const a = Math.acos(k)
  const b = a * Math.sqrt(length * Math.PI)
  const x = RADIUSX * Math.sin(a) * Math.cos(b)
  const y = RADIUSY * Math.sin(a) * Math.sin(b)
  const z = RADIUSX * Math.cos(a)
  const singleEle = {
    x,
    y,
    z,
    style: {},
  }
  if( index > Math.floor(length / 2)) { // 正面
    
  }else{ // 反面

  }
  const rect = el.getBoundingClientRect()
  el.appendChild(itemEl)
  const per = item.value / instance.maxValue
  const mappingVal = Math.floor(getValue(per))
  itemEl.style.fontSize = mappingVal + 'px'
  return itemEl
}