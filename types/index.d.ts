declare type WordItemAfter = {
  per: number,
  text: string
}
declare type Config = {
  orientation?: 0 | 1 | number
  spiralLimit?: number,
  font?: "sans-serif",
  sizeRange?:{[key: 0 | 1]: number },
  renderFn?: (item: WordItemAfter) => HTMLElement
  speed?: number,
  colors?: Array[string],
  sizeRange?: [12, 24],
  gridSize?: 27, //字符间隔
  borderColor?: "rgba(105,207,255)",
  borderWidth?: 2,
  backgroundColor?: "rgba(16,22,24)",
  animate?:true,
  padding?: [10, 17],
  tooltip?: {
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
    bgStyle?: {
      width: 0,
      height: 0,
      url: "/static/vis_resource/background/bg-tooltip.png"
    },
    extraCssText?: "",
    tooltipEditor?:''
  },
  [key: string]: any,
}
declare type DataItem = { value: number, name: string ,  x?: number,
  y?: number,
  z?: number,
  el?: HTMLElement,
  direction?: Boolean
}
declare type OptionData = Array<DataItem>
declare type ScanItemType = {item: DataItem, index: number, instance: WordChart}
declare type Options = {
  el: any,
  data: OptionData,
  config: Config
}
interface WordChart {
  getValue: (_: number) => number,
  el: HTMLElement;
  value:   OptionData;
  sortValue:  OptionData;
  maxValue: number;
  elRect: DOMRect
  RADIUSX: number
  RADIUSY: number
  DIRECTION: DIRECTION
  speed: number
  getSpiral: (_: number) => [number, number],
  config: Config
  elWrap: HTMLElement,
  layout: WordChartLayout
}
declare type MappingDataItem = {
  x: number,
  y: number,
  z?: number, // 仅滚动
  value: number,
  name: string,
  el: HTMLElement
}
const DIRECTION = {
  RIGHT2LEFT = 1,
  LEFT2RIGHT = -1,
  TOP2BOTTOM = 2,
  BOTTOM2TOP = -2
}
declare type DomLocation = {
  left: number,
  top: number,
  width: number,
  height: number,
  el?: HTMLElement,
  right: number,
  bottom: number
}
declare type ScanParams = {item: DataItem, index: number, instance: Worker}
declare type StandardType = {
  [key: string]: Array<Function>
}
declare type WordChartLayout = {
  left: number,
  top: number,
  right: number,
  bottom: number
}