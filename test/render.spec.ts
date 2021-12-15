import WordChart from "../src/WordChart"

describe('after render ', () => {
  const instance = WordChart.of({
    el: document.body,
    data: [
      {
        name: '111',
        value: '0'
      },
      {
        name: '222',
        value: '1'
      },
      {
        name: '333',
        value: '2'
      },
      {
        name: '444',
        value: '3'
      }
    ]
  })
  
})