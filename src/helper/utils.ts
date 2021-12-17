import { MODE, TEXT_ORIENTATION } from "./constant"

export const compos = function<T, I>(...fns: Array<(_:I) => T | Promise<T> |void>): (_: I) => T{ // 组合多个函数， 可多次重复继续组合
  return function(init: I): T { //  返回的函数需要和传入的函数类型保持一致, funtor
    return fns.reduce((a: any,b: Function ) => { // a 的值首次执行的时候为传入的init初始化的内容，之后为函数执行的返回值, 每次纯函数返回的值应该和其他组合函数的返回值保持一致
      return b(a || init)
    }, init)
  }
}
declare type Input = [number, number]
export const rangMapping = function (from: Input, to: Input): (val: number) => number { // 动画范围映射, 根据一个范围映射到另外一个范围
  const min = from[0]
  const max = from[1]
  return function (val) {
    if(val < min) return to[0] // 极限最小
    if(val > max) return to[1] // 最大
    const interval = from[1] - from[0]
    return (to[1] - to[0])/interval * val + to[0]
  }
}
export const throttle = function (fn: Function, ms: number) {
  let prev = new Date().getTime()
  return function (...args: Array<any>) {
    const cur = new Date().getTime()
    if(cur - prev >= ms) {
      fn && fn(...args)
      prev = new Date().getTime()
    }else{
      // prev = new Date().getTime()
    }
  }
}
export function archimedeanSpiral(size: Array<number>, { step = 0.1, b = 5, a = 1 } = {}){ //  步长(弧度), 螺距, 起始点距中心的距离 阿基米德螺线 方程
  const e = size[0] / size[1]; // 根据画布长宽比例进行对应缩放
  // 参数t为当前弧度值
  return function(t: number): [number, number] {
    return [e * (a + b * (t *= step)) * Math.cos(t), (a + b * t) * Math.sin(t)];
  };
}
export const checkRepeat = function (curLoc: DOMRect, wordDown: Array<DOMRect>, gridNumber: number):boolean {
  for(let i = 0; i < wordDown.length; i++) {
    const matchLoc = wordDown[i]
    if(!(curLoc.right < matchLoc.left  - gridNumber  ||
      curLoc.left  > matchLoc.right + gridNumber ||
      curLoc.bottom < matchLoc.top  - gridNumber ||
      curLoc.top > matchLoc.bottom  + gridNumber)){
        return true
      }
  }
  return false
}
export const compareLocation = function (item: DOMRect, layout: WordChartLayout) {
  let ret: WordChartLayout = { ...layout };
  ret.left = Math.min(item.left, layout.left)
  ret.right = Math.max(item.right, layout.right)
  ret.top = Math.min(item.top, layout.top)
  ret.bottom = Math.max(item.bottom, layout.bottom)
  return ret
}
export const mergeOptions = function (a: Config, b: Record<string, any>) { // 两层浅克隆
  let ret: Config = {}
  for (const key  in b) {
    const element = b[key];
    const con = element.constructor
    if(con === Number || con === String || con === Boolean) {
      ret[key] = element
    }else{
      ret[key] = Array.isArray(element) ? new con(...element) : {...element}
    }
  }
  for (const key in a) {
    const element = a[key];
    const con = element.constructor
    if(con === Number || con === String || con === Boolean) {
      ret[key] = element
    }else{
      ret[key] = Array.isArray(element) ? new con(...element) : {...element}
    }
  }
  return ret
}
export const setElConfig = function(el: HTMLElement, config: Config) {
  config.backgroundColor && (el.style.backgroundColor = config.backgroundColor)
  config.borderColor && (el.style.borderColor = config.borderColor)
  config.borderWidth && (el.style.borderWidth = config.borderWidth + 'px')
  el.style.lineHeight = '1'
  config.padding && (el.style.padding = `${config.padding[0]}px ${config.padding[1]}px`)
  if(config.mode === MODE.NORMAL) {
    const { orientation } = config
    el.style.writingMode = orientation === TEXT_ORIENTATION.HORIZONTAL ? 'tb' : orientation === TEXT_ORIENTATION.VERTICAL ? '' : Math.random() > 0.5 ? 'tb' : ''
    config.animate && (el.classList.add('word-cloud-animate'))
  }
}
export const appendCss = function() {
  if(window['content-for-word-cloud' as any]) return
  const el = document.createElement('style')
  el.id = 'content-for-word-cloud'
  el.innerHTML = `.word-cloud-item-chencc{
    display: block;
    position: absolute;
    left: 0px;
    top: 0px;
    color: white;
    text-decoration: none;
    font-size: 15px;
    font-family: '微软雅黑';
    font-weight: bold;
    cursor: pointer;
    transition:  all .3s;
    border: solid;
    border-width: 0;
  }
  @keyframes word {
    0% {
      opacity: 0.5;
    }
    3% {
      opacity: 1;
    }
    9% {
      opacity: 1;
    }
    12% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.5;
    }
  }
  .word-cloud-animate {
    animation-name: word;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    will-change: opacity;
    opacity: 0.5;
  }

  .word-cloud-animate:nth-child(3n + 1) {
    animation-delay: 0s;
  }
  .word-cloud-animate:nth-child(3n + 2) {
    animation-delay: 3s;
  }
  .word-cloud-animate:nth-child(3n + 3) {
    animation-delay: 6s;
  }`
  document.body.appendChild(el)
}