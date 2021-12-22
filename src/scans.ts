import { createTextNode } from './helper/genItem'
import { checkRepeat, compareLocation, setElConfig } from './helper/utils'

export const initParams = function(_: ScanParams): MappingDataItem{
  const { item, index, instance } = _; 
  const { value: { length }, RADIUSX, RADIUSY } = instance
  const itemEl = createTextNode(item)
  const k = -1 + (2 * (index + 1) - 1) / length
  const a = Math.acos(k)
  const b = a * Math.sqrt(length * Math.PI)
  const x = RADIUSX * Math.sin(a) * Math.cos(b)
  const y = RADIUSY * Math.sin(a) * Math.sin(b)
  const z = RADIUSX * Math.cos(a)
  setElConfig(itemEl, instance.config)
  instance.elWrap.appendChild(itemEl)
  return {
    ...item,
    el: itemEl,
    x,
    y,
    z,
  }
}
let domLocations: Array<DOMRect> = []
let prevIndex = 0
export const findLocation =  function (_: ScanParams): Promise<MappingDataItem> | MappingDataItem {
  const { item, index, instance } = _
  const { width, height } = instance.elRect
  const el = createTextNode(item)
  const per = (item.value / instance.maxValue)
  item.per = per
  el.style.fontSize = instance.getValue(per) + 'px'
  // return new Promise((resolve, reject) => {
  //   let i = prevIndex
  //   void function scheduler () {
  //     requestIdleCallback(() => {
  //       instance.elWrap.appendChild(el)
  //       const [x, y] = instance.getSpiral(++i * 5)
  //       const left = x + width / 2
  //       const top = y + height / 2
  //       setElConfig(el, instance.config)
  //       // // el.style.transform = `translate(${left}px, ${top}px) rotate(${Math.floor(Math.random()*40)}deg)`
  //       el.style.transform = `translate(${left}px, ${top}px)`
  //       const rectObj = el.getBoundingClientRect().toJSON()
  //       const res = checkRepeat(rectObj, domLocations, instance.config.gridSize || 0)
  //       if(!res) {
  //         domLocations.push(rectObj)
  //         instance.layout = compareLocation(rectObj, instance.layout)
  //         prevIndex = i / 2 // 已经被算过的点几乎没有概率还能容纳下其他元素了，直接忽略
  //         item.x = rectObj.x
  //         item.y = rectObj.y
  //         resolve({
  //           ...item,
  //           el
  //         })
  //       }else{
  //         scheduler()
  //       }
  //     })
  //   }()
  // })
  
    // console.time(`item-${item.name}`)

    for( let i = prevIndex; i <= (width + height)/ 2; i++) {
      instance.elWrap.appendChild(el)
      const [x, y] = instance.getSpiral(i * 5)
      const left = x + width / 2
      const top = y + height / 2
      setElConfig(el, instance.config)
      // el.style.transform = `translate(${left}px, ${top}px) rotate(${Math.floor(Math.random()*40)}deg)`
      el.style.transform = `translate(${left}px, ${top}px)`
      const rectObj = el.getBoundingClientRect().toJSON()
      const res = checkRepeat(rectObj, domLocations, instance.config.gridSize || 0)
        if(!res) {
          domLocations.push(rectObj)
          instance.layout = compareLocation(rectObj, instance.layout)
          prevIndex = i / 1.5// 已经被算过的点几乎没有概率还能容纳下其他元素了，直接忽略
          item.x = rectObj.x
          item.y = rectObj.y
          break
        }
      }
    // console.timeEnd(`item-${item.name}`)
  return {
    ...item,
    el
  }
}


