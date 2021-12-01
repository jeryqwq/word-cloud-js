import { rangMapping } from './helper/index';
class WordChart {
    constructor(options) {
        this.el = options.el;
        this.queue = [];
        this.value = [];
        this.getFontSize = rangMapping([0, 1], [1, 100]);
    }
    getValue(_) {
        return this.getFontSize(_);
    }
    trigger() {
        this.queue.forEach((i) => {
            i && i();
        });
    }
    scan(fn, init) {
        this.queue.push(() => {
            this.value = fn(this.value || init);
            return this.value;
        });
        return this;
    }
    subscribe(_) {
        this.queue.push(() => _(this.value));
    }
    static of(config) {
        return new WordChart(config);
    }
}
console.log(WordChart.of({
    el: document.body,
    data: [{
            value: 20,
            name: 'HE:LLO'
        },
    ]
}));
