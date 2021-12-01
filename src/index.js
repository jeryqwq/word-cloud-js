import { compos, rangMapping } from './helper/index';
class WordChart {
    constructor(options) {
        this.el = options.el;
        this.value = options.data;
        this.sortValue = options.data.sort((a, b) => (a.value - b.value) > 0 ? 1 : -1);
        this.composFn = () => options.data[0]; // 初始化
        this.effectComposFn = (_, idx) => console.log(_, idx);
        this.getSize = rangMapping([0, 1], [this.sortValue[0].value, this.sortValue[this.sortValue.length - 1].value]);
    }
    getValue(_) {
        return this.getSize(_);
    }
    trigger() {
        this.value = this.value.map((i, index) => {
            this.effectComposFn(i, index);
            return this.composFn(i, index);
        });
        return this;
    }
    scan(fn) {
        this.composFn = compos(this.composFn, fn);
        return this;
    }
    effect(fn) {
        this.effectComposFn = compos(this.effectComposFn, fn);
        return this;
    }
    static of(config) {
        return new WordChart(config);
    }
}
const temp = [];
for (let index = 0; index < 100; index++) {
    temp.push({
        value: Math.floor(Math.random() * 1000),
        name: `test-${index}`
    });
}
const instance = WordChart.of({
    el: document.body,
    data: temp
}).scan((val) => {
    return Object.assign(Object.assign({}, val), { name: '--' + val.name });
}).scan((val) => {
    return Object.assign(Object.assign({}, val), { name: val.name + '--' });
}).effect((item) => {
    console.log(item);
}).trigger();
console.log(instance);
