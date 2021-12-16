import { initParams, findLocation } from './scans';
import { renderToolTip, setColor } from './effets';
import { rotate3D, move3D } from './animates'
import WordChart from './WordChart';
import { MODE, TEXT_ORIENTATION } from './helper/constant';
import { suitLayout } from './finally';
import { appendCss } from './helper/utils';
const temp = []
const words = ['这根本就不好玩', '再见', 'MDML在线测试', '深入浅出CSS3', 'React测试', '这就是个文字内容', '高刷屏' , '默认触发间隔', '假如我说假如', '发现越来越多的美好', '小惊喜', '不会只有我', '哦次打次', '客气客气']
for (let index = 0; index < 100; index++) {
  const item = words[index]
  temp.push({
    value: Math.floor(Math.random() * 1000),
    name: item || `test-${index}`
  })
}

const config = {
  el: document.querySelector('#app') as HTMLElement || document.body,
  data: temp,
  config: {
    mode: MODE.SCROLL,
  },
  hooks: {
    // scan: (_: ScanParams) => {
    //   console.log(_)
    //   return _
    // },
    // effect: (_: MappingDataItem) => {
    //   console.log(_, '-effect')
    // },
    finally: (_: WordChartBase) => {
      console.log(_, '---')
    }
  }
}
function init (config: Options) {
  const instance = WordChart.of(config)  // 类实例
  const mode = instance?.config?.mode
  const { hooks } = config
  if(mode === MODE.SCROLL) {
    exec(instance, hooks ? mergeHooks(hooks, forMove) : forMove)
  }else{
    exec(instance, hooks ? mergeHooks(hooks, forStatic) : forStatic)
  }
  appendCss()
  console.time('render')
  instance.trigger()
  console.timeEnd('render')
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
init(config)
init({...config, el: document.querySelector('#app2') || document.body, config: { mode: MODE.NORMAL }})