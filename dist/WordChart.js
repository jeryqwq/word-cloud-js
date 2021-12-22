var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { compos, rangMapping, throttle, archimedeanSpiral } from './helper/utils';
import { DIRECTION, defaultOptions } from './helper/constant';
import { mergeOptions } from './helper/utils';
class WordChart {
    constructor(options) {
        this.clearActive = () => {
            this.active = undefined;
            this.toolTipEl.style.display = 'none';
        };
        this.setActive = (item, el, e) => {
            var _a, _b;
            this.active = {
                item,
                el
            };
            this.toolTipEl.style.left = e.x + 'px';
            this.toolTipEl.style.top = e.y + 'px';
            this.toolTipEl.style.display = 'inline-block';
            if ((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.tooltip) === null || _b === void 0 ? void 0 : _b.render) {
                const context = this.config.tooltip.render(item, this.toolTipEl);
                if (typeof context === 'string') {
                    this.toolTipEl.innerHTML = context;
                }
                else if (context.constructor.toString().includes('Element')) { // dom
                    this.toolTipEl.appendChild(context);
                }
                else {
                    console.error(`the render function should return a HTMLElement or Html String, not a ${context.constructor.toString()}`);
                }
            }
            else { // use setting
                this.toolTipEl.style.padding = '5px 10px';
                this.toolTipEl.style.backgroundColor = 'rgb(105, 207, 255)';
                this.toolTipEl.style.borderRadius = '5px';
                this.toolTipEl.textContent = `${item.name}: ${item.value}`;
            }
        };
        this.el = options.el;
        this.value = [...options.data]; // clone
        this.sortValue = options.data.sort((a, b) => (a.value - b.value) > 0 ? 1 : -1); // muttable
        this.maxValue = this.sortValue[this.sortValue.length - 1].value;
        this.elRect = this.el.getBoundingClientRect();
        const { width, height } = this.elRect;
        this.RADIUSX = (width - 50) / 2;
        this.RADIUSY = (height - 50) / 2;
        this.DIRECTION = DIRECTION.LEFT2RIGHT;
        this.config = mergeOptions(options.config, defaultOptions) || {};
        this.speed = this.config.speed || 200;
        this.getSpiral = archimedeanSpiral([width, height], { b: width / 100 });
        this.getValue = rangMapping([0, 1], this.config.sizeRange || [12, 24]);
        this.elWrap = document.createElement('div');
        this.elWrap.style.width = '100%';
        this.elWrap.style.height = '100%';
        this.el.appendChild(this.elWrap);
        this.el.style.position = 'relative';
        this.toolTipEl = document.createElement('div');
        this.toolTipEl.style.position = 'fixed';
        this.toolTipEl.style.transition = 'all .4s';
        this.el.appendChild(this.toolTipEl);
        this.clearActive = throttle(this.clearActive, 300);
        this.setActive = throttle(this.setActive, 100);
        this.el.addEventListener('mouseout', this.clearActive);
        this.layout = {
            left: Infinity,
            top: Infinity,
            bottom: 0,
            right: 0
        };
    }
    destory() {
        this.el.removeEventListener('mouseout', this.clearActive);
        this.el.removeChild(this.elWrap);
    }
    trigger() {
        return __awaiter(this, void 0, void 0, function* () {
            // this.value = this.value.map((i, index) => this.composFn ? this.composFn({item: i, index: index, instance: this}) : i)
            for (let i = 0; i < this.value.length; i++) { // 处理异步任务
                const item = this.value[i];
                const res = this.composFn && this.composFn({ item, index: i, instance: this });
                if (res instanceof Promise) {
                    this.value[i] = yield res;
                }
                else {
                    this.value[i] = res;
                }
            }
            this.value.forEach((i, idx) => { this.effectComposFn && this.effectComposFn({ item: i, index: idx, instance: this }); });
            this.animateComposFn && this.animateComposFn(this.value);
            setTimeout(() => {
                this.finallyComposFn && this.finallyComposFn(this);
            }, 0);
            return this;
        });
    }
    animate(fn, ms = 20) {
        const that = this;
        const throttledFn = throttle(fn, ms);
        const wrap = function () {
            void function run() {
                window.requestAnimationFrame(() => {
                    throttledFn(that.value);
                    run();
                });
            }();
        };
        if (this.animateComposFn) {
            this.animateComposFn = compos(this.animateComposFn, wrap);
        }
        else {
            this.animateComposFn = wrap;
        }
        return this;
    }
    finally(fn) {
        if (this.finallyComposFn) {
            this.finallyComposFn = compos(this.finallyComposFn, fn);
        }
        else {
            this.finallyComposFn = fn;
        }
        return this;
    }
    scan(fn) {
        if (this.composFn) {
            this.composFn = compos(this.composFn, fn);
        }
        else {
            this.composFn = fn;
        }
        return this;
    }
    effect(fn) {
        if (this.effectComposFn) { // 多个函数使用compos去组合
            this.effectComposFn = compos(this.effectComposFn, fn);
        }
        else {
            this.effectComposFn = fn;
        }
        return this;
    }
    static of(config) {
        return new WordChart(config);
    }
}
export default WordChart;
