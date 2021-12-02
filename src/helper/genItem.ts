export const createTextNode = function(item: DataItem): HTMLElement {
  const el = document.createElement('div')
  el.style.display = 'inline-block'
  el.style.position = 'absolute'
  el.style.left = '0'
  el.style.top = '0'
  el.textContent = item.name
  return el
}