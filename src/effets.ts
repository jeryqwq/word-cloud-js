// effect
export const setColor = function(item: MappingDataItem, index: number, instance: WordChart) {
  const { el } = item
  const { colors } = instance.config
  const color = colors[index % colors.length]
  el.style.color = color
  return color
}
export const suitLayout = function(item: MappingDataItem, index: number, instance: WordChart){
  const { config } = instance
  console.log(item, index)
}