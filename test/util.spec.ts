import { checkRepeat, compos, rangMapping, throttle } from '../src/helper/utils';


describe("compos test", () => {
  // merge muti func to one func
  test('compos function to merger muti func', () => {
    const res = compos((val: number) => val + 1, (val) => val + 2)(5)
    expect(res).toBe(8);
  });
  test('merged func again merge func', () => {
    const fn = compos((val: number) => val + 1, (val) => val + 2)
    const res = compos(fn, (val) => val * 2)(5)
    expect(res).toBe(16);
  });
  test('if func return void, should be use init value to next func', () => {
    let count = 0
    compos((val: number) => {count++}, (val) => {count = val})(5)
    expect(count).toBe(5);
  })
});
describe("rangeMapping func test, percentage trasnform to value ", () => {
  test('mapping fontSize 12 to 24, percentage 0', () => {
    const fn = rangMapping([0, 1], [12, 24])
    expect(fn(0)).toBe(12)
  })
  test('mapping fontSize 12 to 24, percentage 0.5(50%)', () => {
    const fn = rangMapping([0, 1], [12, 24])
    expect(fn(0.5)).toBe(18)
  })
  test('mapping fontSize 12 to 24, percentage 1(100%)', () => {
    const fn = rangMapping([0, 1], [12, 24])
    expect(fn(1)).toBe(24)
  })
  test('mapping fontSize 12 to 24, min', () => {
    const fn = rangMapping([0, 1], [10, 24])
    expect(fn(-1)).toBe(10)
  })
  test('mapping fontSize 12 to 24, max', () => {
    const fn = rangMapping([0, 1], [12, 24])
    expect(fn(20)).toBe(24)
  })
})

describe('throttle fn for animate', () => {
  test('fn exec interval should exec once in time frame', async  () => {
    let count = 0
    const fn = throttle(()=> {
      count++
    }, 200)
    fn()
    setTimeout(() => {
      fn()
    }, 250);
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(count)
      }, 1000);
    })
    expect(res).toBe(1)
  })
})
describe('shape repeat', () => {
  test('tow square should not repeat ', () => {
    const rect1 = {
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 40,
      bottom: 40
    } as DOMRect
    const rect2 = {
      x: 41,
      y: 41,
      left: 41,
      top: 41,
      right: 60,
      bottom: 60
    } as DOMRect
    expect(checkRepeat(rect1, [rect2], 0)).toBe(false)
  })
  test('tow square should repeat ', () => {
    const rect1 = {
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 40,
      bottom: 40
    } as DOMRect
    const rect2 = {
      x: 39,
      y: 39,
      left: 39,
      top: 39,
      right: 60,
      bottom: 60
    } as DOMRect
    expect(checkRepeat(rect1, [rect2], 0)).toBe(true)
  })
})