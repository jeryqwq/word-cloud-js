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
    data: temp,
  }
  const instance = WordChart.of(config)

  test('instance sort value', () => {
    const val = instance.sortValue
    const res = val.every((item, index) => {
      const next = val[index + 1]
      if(next) {
        return item.value > next.value
      }else{
         return true
      }
    })
    expect(res).toBe(true)
  })
})