import { createTextNode } from './helper/genItem'
export const renderItem = function(item: DataItem, instance: WordChart): HTMLElement{
  const { el, getValue } = instance
  const itemEl = createTextNode(item)
  const rect = el.getBoundingClientRect()
  el.appendChild(itemEl)
  return itemEl
}