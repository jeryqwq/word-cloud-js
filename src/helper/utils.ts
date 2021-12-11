export const compos = function<T, I>(...fns: Array<(_:I) => T | void>): (_: I) => T{ // 组合多个函数， 可多次重复继续组合
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
export const checkRepeat = function (curLoc: DOMRect, wordDown: Array<DOMRect>):boolean {
  for(let i = 0; i < wordDown.length; i++) {
    const matchLoc = wordDown[i]
    if(!(curLoc.right  < matchLoc.left  ||
      curLoc.left  > matchLoc.right ||
      curLoc.bottom < matchLoc.top  ||
      curLoc.top  > matchLoc.bottom )){
        return true
      }
  }
  return false
}
export const rect2Object = function(rect: DOMRect): DOMRect{
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y,
    right: rect.right,
    bottom: rect.bottom,
    toJSON: () => {}
  }
}