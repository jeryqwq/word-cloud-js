export const DIRECTION = {
  RIGHT2LEFT: 1,
  LEFT2RIGHT: -1,
  TOP2BOTTOM: 2,
  BOTTOM2TOP: -2
}
export const COLOR_MODE = {
  RANGE: 'RANGE', // 根据值范围渲染颜色
  INDEX: 'INDEX' // 根据下标索引渲染颜色
}
export const TEXT_ORIENTATION = {
  HORIZONTAL: 0, // 横向
  VERTICAL: 1, // 竖
  RANDOM: 2 // 随机
}
export const MODE = {
  SCROLL: 1,
  NORMAL: 2
}
export const defaultOptions = {
  mode: MODE.NORMAL, // 模式 ， 滚动 ｜ 普通
  orientation: TEXT_ORIENTATION.RANDOM, // 方向
  animate: true, // 是否开启普通模式的动画
  color: ["#ff9ecc", "#00b6ff", "#f3bd00", "#884dff", "#d3f0ff ", "#5cc4ee", "#eadf2b", "#e1583e", "#05e1b5", "#3e61e1", "#884dff", "#c59eff", "#06b8d1"],
  colors: [{
    from: 0,
    to: 60,
    name: '差',
    color: 'red'
  }, {
    from: 61,
    to: 79,
    name: '良',
    color: 'blue'
  },{
    from: 80,
    to: 100,
    name: '优秀',
    color: 'green'
  }],
  sizeMin: 12,
  sizeMax: 16,
  gridSize: 0, //字符间隔 (不包含padding)
  borderColor: "rgba(105,207,255)", // 单项的css配置
  borderWidth: 0,
  backgroundColor: "rgba(16,22,24,0)",
  padding: [0, 0], // 单项的padding属性
  events: { // 自定义事件
    // click: (item: MappingDataItem, instance: WordChartBase) => {
    //   console.log(item, '----')
    // }
  },
  tooltip: {
    show: true,
    // render(item: MappingDataItem, el: HTMLElement) {
    //   return `<span style="color: red">${item.name}</span>`
    // },
    tooltipEditor: '',
    padding: [15, 35],
    backgroundColor: 'rgba(50,50,50,0.7)',
    borderRadius: 0,
    textStyle: {
      color: '#fff',
      fontFamily: 'Microsoft YaHei',
      fontSize: 14,
      lineHeight: 30
    },
    bgStyle: {
      width: 0,
      height: 0,
      url: "http://10.28.184.189:7000/static/vis_resource/background/bg-tooltip.png"
    },
  }
}
