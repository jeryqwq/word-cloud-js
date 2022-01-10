export const suitLayout = function(instance: WordChartBase){
  const { elRect, layout, elWrap, value } = instance
  const realWidth = layout.right - layout.left
  const realHeight = layout.bottom - layout.top
  const widthPer = elRect.width / realWidth
  const heightPer = elRect.height / realHeight
  const x = elRect.left - layout.left
  const y = elRect.top - layout.top
  const x1 = elRect.right - layout.right
  const y1 = elRect.bottom - layout.bottom
  elWrap.style.transformOrigin = 'center'
  const offsetLeft = (x + x1) / 2
  const offsetTop = (y + y1) / 2
  value.forEach(i => {
    i.x = (i.x || 0) + offsetLeft
    i.y = (i.y || 0) + offsetTop
    const { el} = i
    el && (el.style.transform = `translate(${i.x}px, ${i.y}px)`)
  })
  // elWrap.style.transform = `translate(${x / 2}px, ${y / 2}px) scaleX(${widthPer}) scaleY(${heightPer}) `
  // elWrap.style.transform = `translate(${(x + x1) / 2}px, ${(y + y1) / 2}px)`
}
export const toolTipHandle = function (instance: WordChartBase) {
  const { el, config, value } = instance
  if(config.tooltip?.show) {
    value.forEach(i => {
      const { el } = i
      el?.addEventListener('mouseenter', function(e) {
          instance.setActive(i as MappingDataItem, el, e)
      })
    })
  }
}