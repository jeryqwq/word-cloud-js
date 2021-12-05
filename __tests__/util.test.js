import { compos, rangMapping } from '../src/helper/utils';
test('compos function to merger muti func', () => {
  console.log(123)
  const res = compos((val) => val + 1, (val) => val + 2)(5)
  expect(res).toBe(8);
});