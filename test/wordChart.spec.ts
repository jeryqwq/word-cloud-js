import { checkRepeat } from '../src/helper/utils'
import WordChart from './../src/WordChart'
describe("init instance for wordChart", () => {
  let temp = []
  for (let index = 0; index < 60; index++) {
    temp.push({
      value: Math.floor(Math.random() * 1000),
      name: `test-${index}`
    })
  }
  const config = {
    el: document.createElement('div'),
    data: temp
  }
  const instance = WordChart.of(config)
  test('instance sort value', () => {
    const val = instance.sortValue
    const res = val.every((item, index) => {
      const next = val[index + 1]
      if(next) {
        return item.value <= next.value
      }else{
         return true
      }
    })
    expect(res).toBe(true)
  })
  test('max min value', () => {
    const val = instance.sortValue
    expect(val[val.length - 1].value === instance.maxValue).toBe(true)
  })
  test('word-cloud-item quantity', () => {
    const { elWrap } = instance
     expect(elWrap.childNodes.length).toBe(instance.value.length)
  })
 
  test('word-clout item location should not repeat', () => {
    const { value } = instance
    const isRepeated = new Array(...value).every((i, idx) => { // dom && dom compare location, every one sholud not repeat
      const { el } = i
      return value.reverse().every((j, idxj) => {
        const { el: elJ } = j
        const rectI = el.getBoundingClientRect()
        if(j !== i) {
          const rectJ = elJ.getBoundingClientRect()
          return !checkRepeat(rectI, rectJ, 0)
        }
      })
    })
    expect(isRepeated).toBe(false)
  })
})
