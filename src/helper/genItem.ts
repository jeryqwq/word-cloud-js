
export const createTextNode = function(item: DataItem): HTMLElement {
  const el = document.createElement('div')
  el.textContent = item.name
  el.className = 'word-cloud-item-chencc'
  return el
}