import { createTextNode } from './helper/genItem'

export const initParams = function(item: DataItem, index: number, instance: WordChart): MappingDataItem{
  const { value: { length }, RADIUSX, RADIUSY } = instance
  const itemEl = createTextNode(item)
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
  }
  return {
    ...item,
    el: itemEl,
    ...singleEle,
  }
}
function parseCSV(input:string): Record<string,string>[]{
  return [{
    test: '213'
  }]
}
