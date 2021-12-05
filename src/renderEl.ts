import { createTextNode } from './helper/genItem'

export const renderItem = function(item: DataItem, index: number, instance: WordChart): MappingDataItem{
  const { elRect, value: { length }, RADIUSX, RADIUSY } = instance
  const itemEl = createTextNode(item, elRect)
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
  return {
    ...item,
    el: itemEl,
    ...singleEle,
  }
}