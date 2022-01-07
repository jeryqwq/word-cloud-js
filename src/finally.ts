export const suitLayout = function(instance: WordChartBase){
  const { elRect, layout, elWrap } = instance
  const realWidth = layout.right - layout.left
  const realHeight = layout.bottom - layout.top
  const widthPer = elRect.width / realWidth
  const heightPer = elRect.height / realHeight
  const x = elRect.left - layout.left
  const y = elRect.top - layout.top
  const x1 = elRect.right - layout.right
  const y1 = elRect.bottom - layout.bottom
  // elWrap.style.transformOrigin = 'center'
  // elWrap.style.transform = `translate(${x / 2}px, ${y / 2}px) scaleX(${widthPer}) scaleY(${heightPer}) `
  // elWrap.style.transform = `translate(${(x + x1) / 2}px, ${(y + y1) / 2}px)`
}
export const toolTipHandle = function (instance: WordChartBase) {
  const { el, config } = instance
  if(config.tooltip?.show) {
    el.addEventListener('mousemove', function(e) {
      const target = e.target as HTMLElement
      if(target.attributes.getNamedItem('iswordcloudnode')) {
        const item = instance.elMap.get(target)
        instance.setActive(item as MappingDataItem, el, e)
      }
    })
  }
}