export const compos = function<T, I>(...fns: Array<(_:I) => T | void>): (_: I) => T{ // 组合多个函数， 可多次重复继续组合
  return function(init: I): T { //  返回的函数需要和传入的函数类型保持一致, funtor
    return fns.reduce((a: any,b: Function ) => { // a 的值首次执行的时候为传入的init初始化的内容，之后为函数执行的返回值, 每次纯函数返回的值应该和其他组合函数的返回值保持一致
      return b(a)
    }, init)
  }
}
declare type Input = [number, number]
export const rangMapping = function (from: Input, to: Input): (val: number) => number { // 转换fontSize, 根据一个范围映射到另外一个范围
  const min = from[0]
  const max = from[1]
  return function (val) {
    if(val < min) return to[0] // 极限最小
    if(val > max) return to[1] // 最大
    const interval = from[1] - from[0]
    return (to[1] - to[0])/interval * val
  }
}