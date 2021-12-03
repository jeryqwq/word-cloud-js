declare type WordItemAfter = {
  per: number,
  text: string
}
declare type Config = {
  trace?: true,
  spiralResolution?: 1, //Lower = better resolution
  spiralLimit?: number,
  lineHeight?: 0.7,
  xWordPadding?: 0,
  yWordPadding?: 3,
  font?: "sans-serif",
  renderFn?: (item: WordItemAfter) => HTMLElement
}
declare type DataItem = { value: number, name: string }
declare type OptionData = Array<DataItem>
declare type ScanItemType = {item: DataItem, index: number, instance: WordChart}
declare type Options = {
  el: any,
  data: OptionData,
  config?: Config
}
interface WordChart {
  getValue: (_: number) => number,
  el: HTMLElement;
  value:   OptionData;
  sortValue:  OptionData;
  maxValue: number;
  elRect: DOMRect
}