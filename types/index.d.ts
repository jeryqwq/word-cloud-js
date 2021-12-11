declare type WordItemAfter = {
  per: number,
  text: string
}
declare type Config = {
  spiralResolution?: 1, //Lower = better resolution
  spiralLimit?: number,
  lineHeight?: 0.7,
  xWordPadding?: 0,
  yWordPadding?: 3,
  font?: "sans-serif",
  fontSizeRange?:{[key: 0 | 1]: number },
  renderFn?: (item: WordItemAfter) => HTMLElement
  speed?: number
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