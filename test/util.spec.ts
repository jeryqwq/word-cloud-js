import { compos, rangMapping } from '../src/helper/utils';


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
describe("rangeMapping func test", () => {
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
    expect(fn(0.5)).toBe(18)
  })
})
