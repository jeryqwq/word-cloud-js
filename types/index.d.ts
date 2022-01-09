
declare type WordItemAfter = {
  per: number,
  text: string
}
declare type Config = {
  orientation?: 0 | 1 | number
  spiralLimit?: number,
  font?: "sans-serif",
  sizeRange?:{[key: 0 | 1]: number },
  sizeMax?: number,
  sizeMin?: number,
  renderFn?: (item: WordItemAfter) => HTMLElement
  speed?: number,
  color?: Array[string],
  colors?:Array<{from: number, to: number, color: string, name: string}>
  gridSize?: 27, //字符间隔
  borderColor?: "rgba(105,207,255)",
  borderWidth?: 2,
  backgroundColor?: "rgba(16,22,24)",
  animate?:true,
  padding?: [10, 17],
  events?: Record<string, (item: MappingDataItem, e: Event) => void>
  tooltip?: {
    show: true,
    render: (item: MappingDataItem, elWrap: HTMLElement) => string | HTMLElement
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
  el: HTMLElement,
  data: OptionData,
  config: Config,
  hooks?: Hooks
}
interface WordChartBase {
  getValue: (_: number) => number,
  elMap: WeakMap<HTMLElement, DataItem>
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
  layout: WordChartLayout,
  setActive: (item: MappingDataItem, el: HTMLElement, e: MouseEvent) => void
  clearActive: Function
  active?: Active,
  destory: Function,
  domLocations: Array<DOMRect>
}
declare type MappingDataItem = {
  x: number,
  y: number,
  z?: number, // 仅滚动
  value: number,
  name: string,
  el: HTMLElement,
  per: number,
  elRect: DOMRect
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
declare type ScanParams = {item: MappingDataItem, index: number, instance: WordChartBase}
declare type StandardType = {
  [key: string]: Array<Function>
}
declare type WordChartLayout = {
  left: number,
  top: number,
  right: number,
  bottom: number
}
declare type Active = {
  item?: MappingDataItem,
  el?: HTMLElement
}
declare type Hooks = {
  scan?: (...args: Array<DataItem, number, WordChartBase>) => args
  animate?: (_: OptionData) => void
  effect?: (_: ScanItemType) => void
  finally?: (_: WordChartBase) => void
}