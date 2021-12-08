import { DIRECTION } from "./constant"
export const move2D = function (item: MappingDataItem, instance: WordChart) {
  
}
export const rotateX = function (item: MappingDataItem, instance: WordChart){
  const angleX = [DIRECTION.RIGHT2LEFT, DIRECTION.LEFT2RIGHT].includes(instance.DIRECTION)
  ? Math.PI / Infinity
  : Math.PI / ((Number(instance.DIRECTION) / 2) * Number(instance.speed))
  const cos = Math.cos(angleX)
  const sin = Math.sin(angleX)
  const y1 = item.y * cos - item.z * sin
  const z1 = item.z * cos + item.y * sin
  return {
    ...item,
    y: y1,
    z: z1,
  }
}
export const rotateY = function (item: MappingDataItem, instance: WordChart) {
  const angleY = [DIRECTION.BOTTOM2TOP, DIRECTION.TOP2BOTTOM].includes(instance.DIRECTION)
  ? Math.PI / Infinity
  : Math.PI / (Number(instance.DIRECTION) * Number(instance.speed))
    const cos = Math.cos(angleY)
    const sin = Math.sin(angleY)
    const x1 = item.x * cos - item.z * sin
    const z1 = item.z * cos + item.x * sin
    return {
      ...item,
      x: x1,
      z: z1,
    }
}

export const move = function (item: MappingDataItem, instance: WordChart) {
  const { elRect } = instance
  const { width, height } = elRect
  const CX = width / 2
  const CY = height / 2
    const { x, y, z } = item
    const fallLength = 500
    const RADIUS = (width - 50) / 2
    const scale = fallLength / (fallLength - z)
    const alpha = (z + RADIUS) / (2 * RADIUS)
    const left = `${x + CX - 15}px`
    const top = `${y + CY - 15}px`
    const transform = `translate(${left}, ${top}) scale(${scale})`
    return {
      x,
      y,
      z,
      opacity: alpha + 0.5,
      zIndex: parseInt(scale * 100 + '', 10),
      transform
    }
}