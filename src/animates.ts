import { rotateX, rotateY, move } from "./helper/animate";

// animate 
export const move3D = function(tempArr: OptionData, instance: WordChartBase) {
  tempArr.forEach(i => {
    const { el } = i as MappingDataItem
    const { transform, opacity, zIndex} = move(i as MappingDataItem , instance)
    el.style.transform = transform
    el.style.opacity = opacity + ''
    el.style.zIndex = zIndex + ''
  })
}
export const rotate3D = function(tempArr: OptionData, instance: WordChartBase) {
    tempArr.forEach(item => {
      const {z, y} = rotateX(item as MappingDataItem, instance)
      item.z = z
      item.y = y
      const { x, z: z1 } = rotateY(item as MappingDataItem, instance)
      item.z = z1
      item.x = x
    })
}