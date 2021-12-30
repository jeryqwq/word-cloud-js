import { initParams, findLocation } from './scans';
import { renderToolTip, setColor } from './effets';
import { rotate3D, move3D } from './animates'
import WordChart from './WordChart';
import { MODE, TEXT_ORIENTATION } from './helper/constant';
import { suitLayout } from './finally';
import { appendCss } from './helper/utils';

let cacheInstance = new WeakMap<HTMLElement, WordChart>()
export  function init (config: Options) {
  const { el } = config
  cacheInstance.get(el)?.destory() // 与setOption公用一个api， 初始化检查是否有之前的实例， 有的话销毁掉重新实例化
  const instance = WordChart.of(config)  // 类实例
  cacheInstance.set(el, instance)
  const mode = instance?.config?.mode
  const { hooks } = config
  if(mode === MODE.SCROLL) {
    exec(instance, hooks ? mergeHooks(hooks, forMove) : forMove)
  }else{
    exec(instance, hooks ? mergeHooks(hooks, forStatic) : forStatic)
  }
  appendCss()
  instance.trigger()
  return instance
}
function mergeHooks (hooks: Hooks, targetMode: StandardType): StandardType {
  hooks.scan && targetMode.scan.splice(0, 0, hooks.scan) // 数据流向， 必须前置执行
  hooks.animate && targetMode.animate.push(hooks.animate)
  hooks.effect && targetMode.effect.push(hooks.effect)
  hooks.finally && targetMode.finally.push(hooks.finally)
  return targetMode
}
function exec (instance: WordChart, target: StandardType) {
  Object.keys(forStatic).forEach(type => {
    target[type].forEach(i => {
      switch (type) {
        case 'scan':
          {
            const fn = instance[type as 'scan']
            i && fn.bind(instance)(i as (_: ScanItemType) => MappingDataItem);
          }
          break;
          case 'animate':
            {
              const fn = instance[type as 'animate']
              fn.bind(instance)((_: OptionData) => {
                i(_, instance)
              }, 20)
            }
          break;
          case 'effect':
            {
              const fn = instance[type as 'effect']
              fn.bind(instance)(({ item, index, instance }) => {
                i(item as MappingDataItem, index, instance)
              })
            }
          break;
          case 'finally':
            {
              const fn = instance[type as 'finally']
              fn.bind(instance)((instance) => {
                i(instance)
              })
            }
          break;
      }
    })
  })
}
const forMove = { // 滚动模式
  scan: [initParams],
  animate: [move3D, rotate3D],
  effect: [setColor, renderToolTip],
  finally: []
}
const forStatic = { // 普通模式
  scan: [findLocation],
  effect: [setColor, renderToolTip],
  animate: [],
  finally: [suitLayout]
}

export const ORIENTATION = TEXT_ORIENTATION
export const RENDER_MODE = MODE