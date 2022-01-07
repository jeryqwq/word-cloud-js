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
            var _a, _b, _c, _d;
            this.active = {
                item,
                el
            };
            this.toolTipEl.style.left = e.screenX + 'px';
            this.toolTipEl.style.top = e.screenY + 'px';
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
                const { tooltip } = this.config;
                const padding = (tooltip === null || tooltip === void 0 ? void 0 : tooltip.padding) || [5, 10];
                const backgroundColor = (tooltip === null || tooltip === void 0 ? void 0 : tooltip.backgroundColor) || 'rgba(50,50,50,0.7)';
                const borderRadius = (tooltip === null || tooltip === void 0 ? void 0 : tooltip.borderRadius) || '5px';
                const color = (tooltip === null || tooltip === void 0 ? void 0 : tooltip.textStyle.color) || '#fff';
                const fontFamily = (tooltip === null || tooltip === void 0 ? void 0 : tooltip.textStyle.fontFamily) || 'Microsoft YaHei';
                const fontSize = (tooltip === null || tooltip === void 0 ? void 0 : tooltip.textStyle.fontSize) || 14;
                const lineHeight = (tooltip === null || tooltip === void 0 ? void 0 : tooltip.textStyle.lineHeight) || 30;
                this.toolTipEl.style.padding = `${padding[0]}px ${padding[1]}px`;
                this.toolTipEl.style.backgroundColor = backgroundColor;
                this.toolTipEl.style.borderRadius = borderRadius;
                this.toolTipEl.textContent = (tooltip === null || tooltip === void 0 ? void 0 : tooltip.tooltipEditor) || `${item.name}: ${item.value}`;
                ((_c = tooltip === null || tooltip === void 0 ? void 0 : tooltip.bgStyle) === null || _c === void 0 ? void 0 : _c.url) && (this.toolTipEl.style.background = `url(${(_d = tooltip === null || tooltip === void 0 ? void 0 : tooltip.bgStyle) === null || _d === void 0 ? void 0 : _d.url})`);
                this.toolTipEl.style.backgroundSize = '100% 100%';
                this.toolTipEl.style.color = color;
                this.toolTipEl.style.fontFamily = fontFamily;
                this.toolTipEl.style.fontSize = fontSize + '';
                this.toolTipEl.style.lineHeight = lineHeight + 'px';
            }
        };
        this.el = options.el;
        this.isDestory = false;
        this.value = [...options.data]; // clone
        this.sortValue = options.data.sort((a, b) => (a.value - b.value) > 0 ? 1 : -1); // muttable
        this.maxValue = this.sortValue[this.sortValue.length - 1].value;
        this.elRect = this.el.getBoundingClientRect();
        this.domLocations = [];
        const { width, height } = this.elRect;
        this.RADIUSX = (width - 50) / 2;
        this.RADIUSY = (height - 50) / 2;
        this.DIRECTION = DIRECTION.LEFT2RIGHT;
        this.config = mergeOptions(options.config, defaultOptions) || {};
        this.speed = this.config.speed || 200;
        this.getSpiral = archimedeanSpiral([width, height]);
        this.getValue = rangMapping([0, 1], [this.config.sizeMin || 12, this.config.sizeMax || 24]);
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
        this.isDestory = true; // 停止动画
        this.el.removeEventListener('mouseout', this.clearActive);
        this.el.removeChild(this.elWrap);
        this.el.removeChild(this.toolTipEl);
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
                this.effectComposFn && this.effectComposFn({ item: this.value[i], index: i, instance: this });
            }
            // this.value.forEach((i, idx) => {this.effectComposFn && this.effectComposFn({ item:i, index: idx, instance: this })})
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
                    !that.isDestory && run();
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
