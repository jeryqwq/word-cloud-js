// effect
export const setColor = function(item: MappingDataItem, index: number, instance: WordChartBase) {
  const { el } = item
  const { colors } = instance.config
  const color = colors[index % colors.length]
  el.style.color = color
  return color
}
export const renderToolTip = function(item: MappingDataItem, index: number, instance: WordChartBase) {
  const { el } = item
  const { config } = instance
  if(config.events) { // 自定义事件
    Object.keys(config.events).forEach((i) => {
      const fn = config.events && config.events[i]
      el.addEventListener(i, (e) => {
        fn && fn(item, e)
      })
    })
  }
  if(config.tooltip?.show) {
    el.addEventListener('mouseenter', (e) => {
      instance.setActive(item, el, e)
    })
    el.addEventListener('mouseleave', () => {
      instance.clearActive()
    })
  }
}