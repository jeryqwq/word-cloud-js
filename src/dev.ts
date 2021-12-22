import { COLOR_MODE, MODE } from './helper/constant'
import { init, ORIENTATION, RENDER_MODE } from './index'
const temp = []
const words = ['这根本就不好玩', '再见', 'MDML在线测试', '深入浅出CSS3', 'React测试', '这就是个文字内容', '高刷屏' , '默认触发间隔', '假如我说假如', '发现越来越多的美好', '小惊喜', '不会只有我', '哦次打次', '客气客气']
for (let index = 0; index < 120; index++) {
  const item = words[index]
  temp.push({
    value: Math.floor(Math.random() * 100),
    name: item || `test-${index}`
  })
}

const config = {
  el: document.querySelector('#app') as HTMLElement || document.body,
  data: temp,
  config: {
    mode: MODE.SCROLL,
    colorMode: COLOR_MODE.RANGE
  },
  hooks: {
    // scan: (_: ScanParams) => {
    //   console.log(_)
    //   return _
    // },
    // effect: (_: MappingDataItem) => {
    //   console.log(_, '-effect')
    // },
    // finally: (_: WordChartBase) => {
    //   console.log(_, '---')
    // }
  }
}
// init(config)
init({...config, el: document.querySelector('#app2') || document.body, config: { mode: RENDER_MODE.NORMAL }})