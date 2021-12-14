export const DIRECTION = {
  RIGHT2LEFT: 1,
  LEFT2RIGHT: -1,
  TOP2BOTTOM: 2,
  BOTTOM2TOP: -2
}
export const TEXT_ORIENTATION = {
  HORIZONTAL: 0,
  VERTICAL: 1
}
export const defaultOptions = {
  orientation: TEXT_ORIENTATION.HORIZONTAL,
  animate: true,
  colors: ["#ff9ecc", "#00b6ff", "#f3bd00", "#884dff", "#d3f0ff ", "#5cc4ee", "#eadf2b", "#e1583e", "#05e1b5", "#3e61e1", "#884dff", "#c59eff", "#06b8d1"],
  sizeRange: [12, 24],
  gridSize: 5, //字符间隔
  borderColor: "rgba(105,207,255)",
  borderWidth: 0,
  backgroundColor: "rgba(16,22,24,0)",
  padding: [1, 1],
  tooltip: {
    show: true,
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
      url: "/static/vis_resource/background/bg-tooltip.png"
    },
    extraCssText: "",
    tooltipEditor:''
  }
}
export const MODE = {
  SCROLL: 1,
  NORMAL: 2
}