import { createTextNode } from './helper/genItem'
import { checkRepeat } from './helper/utils'

export const initParams = function(item: DataItem, index: number, instance: WordChart): MappingDataItem{
  const { value: { length }, RADIUSX, RADIUSY } = instance
  const itemEl = createTextNode(item)
  const k = -1 + (2 * (index + 1) - 1) / length
  const a = Math.acos(k)
  const b = a * Math.sqrt(length * Math.PI)
  const x = RADIUSX * Math.sin(a) * Math.cos(b)
  const y = RADIUSY * Math.sin(a) * Math.sin(b)
  const z = RADIUSX * Math.cos(a)
  return {
    ...item,
    el: itemEl,
    x,
    y,
    z,
  }
}
let domLocations: Array<DOMRect> = []
let startPoint = {
  x: 0,
  y: 0
}
function intersect(word: HTMLElement, x: number, y: number, instance: WordChart): boolean{
  instance.el.appendChild(word);    
  word.style.left = x - word.offsetWidth/2 + "px";
  word.style.top = y - word.offsetHeight/2 + "px";
  var currentWord = word.getBoundingClientRect();
  instance.el.removeChild(word);
  for(var i = 0; i < domLocations.length; i+=1){
      var comparisonWord = domLocations[i];
      if(!(currentWord.right  < comparisonWord.left  ||
           currentWord.left  > comparisonWord.right ||
           currentWord.bottom  < comparisonWord.top ||
           currentWord.top  > comparisonWord.bottom )){
          return true;
      }
  }
  
  return false;
}
export const findLocation = function (item: DataItem, instance: WordChart, index: number): MappingDataItem {
  const { width, height } = instance.elRect
  let retx = 0, rety = 0
  const el = createTextNode(item)
  el.style.fontSize = instance.getValue(item.value / instance.maxValue) + 'px'
  instance.el.appendChild(el)
  for( let i = 0; i <= 150; i++) {
  const [x, y] = instance.getSpiral(i * 5)
  //   if(!intersect(word, x, y, instance)){
  //     instance.el.appendChild(word);
  //     console.log(x, y)
  //     word.style.left = x + word.offsetWidth/2 + "px";
  //     word.style.top = y + word.offsetHeight/2 + "px";
  //     domLocations.push(word.getBoundingClientRect());
  //   }
  // const { width: elWidth, height: elHeight } = elItem
  //   const curLocaiton = {
  //     left: x + width / 2,
  //     top: y + height / 2,
  //     width: elWidth,
  //     height: elHeight,
  //     right: x + elWidth + width / 2,
  //     bottom: y + elHeight + height / 2
  //   }
  const left = x + width / 2 
  const top = y + height / 2
  el.style.left = left + 'px'
  el.style.top = top +'px'
    const curRect = el.getBoundingClientRect()
    if(!domLocations.length) {  // 首次定位
      domLocations.push(curRect)
      break
    }else{ // 冲突检测
      for(let i = 0; i < domLocations.length; i ++ ){
        const itemLoc = domLocations[i]
        const res = checkRepeat(curRect, itemLoc)
        if(res){
          console.log(res, curRect, itemLoc)
          // let j = i
          // while(domLocations[++j]){
          //   tryNext = checkRepeat(curRect, domLocations[j])
          // }
          // if(tryNext) {
          //   domLocations.push(domLocations[j])
          //   retx = left
          //   rety = top
          //   break
          // }
          domLocations.push(curRect)
          return {
            ...item,
            x: left,
            y: top,
            el
          }
        }
      }
    }
  }
  return {
    ...item,
    x: retx, 
    y: rety,
    el
  }
}


