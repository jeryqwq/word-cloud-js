
export const createTextNode = function(item: DataItem, rect: DOMRect): HTMLElement {
  const el = document.createElement('div')
  el.style.display = 'inline-block'
  el.style.position = 'absolute'
  el.textContent = item.name
  // const { left, top, width, height } = rect
  // const elRect = el.getBoundingClientRect()
  // const { left: elLeft, top: elTop, width: elWidth, height: elHeight } = elRect
  
  // const curTop = (height / 2 - elHeight / 2)
  el.style.left = '0'
  // el.style.top = curTop + 'px'
  return el
}