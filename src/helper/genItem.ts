import { TEXT_ORIENTATION } from "./constant"

export const createTextNode = function(item: DataItem): HTMLElement {
  const el = document.createElement('div')
  el.setAttribute('iswordcloudnode', 'TRUE')
  el.textContent = item.name
  el.className = 'word-cloud-item-chencc'
  return el
}
const canvas = document.createElement('canvas');
export const getTextMetrics = function(text: string, config: Config, fontSize: number) {
  const context = canvas.getContext('2d');
  if(!context) return
  context.font = `normal ${fontSize}px Microsoft YaHei`;
  return context.measureText(text);
}
export const getDomRect = function(metrics: TextMetrics, config: Config, location: Partial<DomLocation>, orientation: number): DOMRect {
  const width = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
  const height = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
  if(orientation === TEXT_ORIENTATION.HORIZONTAL) {
    return {
      x: location.left || 0,
      y: location.top || 0,
      width: metrics.width,
      height: height,
      left: location.left || 0,
      bottom: (location.top || 0) + height,
      top: location.top || 0,
      right: width + (location.left || 0),
      toJSON: () => {}
    }
  }else{
    return {
      x: location.left || 0,
      y: location.top || 0,
      width: metrics.width,
      height: height,
      left: location.left || 0,
      bottom: (location.top || 0) + height,
      top: location.top || 0,
      right: width + (location.left || 0),
      toJSON: () => {}
    }
  }
}