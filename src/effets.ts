// effect
export const setColor = function(item: MappingDataItem, index: number, instance: WordChart) {
  const { el } = item
  const { colors } = instance.config
  const color = colors[index % colors.length]
  el.style.color = color
  return color
}
export const renderToolTip = function(item: MappingDataItem, index: number, instance: WordChart) {
  
}