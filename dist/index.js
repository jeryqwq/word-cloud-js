import { initParams, findLocation } from './scans';
import { eventHandle, setColor } from './effets';
import { rotate3D, move3D } from './animates';
import WordChart from './WordChart';
import { MODE, TEXT_ORIENTATION } from './helper/constant';
import { suitLayout, toolTipHandle } from './finally';
import { appendCss } from './helper/utils';
let cacheInstance = new WeakMap();
export function init(config) {
    var _a, _b;
    const { el } = config;
    (_a = cacheInstance.get(el)) === null || _a === void 0 ? void 0 : _a.destory(); // 与setOption公用一个api， 初始化检查是否有之前的实例， 有的话销毁掉重新实例化
    const instance = WordChart.of(config); // 类实例
    cacheInstance.set(el, instance);
    const mode = (_b = instance === null || instance === void 0 ? void 0 : instance.config) === null || _b === void 0 ? void 0 : _b.mode;
    const { hooks } = config;
    if (mode === MODE.SCROLL) {
        exec(instance, hooks ? mergeHooks(hooks, forMove) : forMove);
    }
    else {
        exec(instance, hooks ? mergeHooks(hooks, forStatic) : forStatic);
    }
    appendCss();
    instance.trigger();
    return instance;
}
function mergeHooks(hooks, targetMode) {
    hooks.scan && targetMode.scan.splice(0, 0, hooks.scan); // 数据流向， 必须前置执行
    hooks.animate && targetMode.animate.push(hooks.animate);
    hooks.effect && targetMode.effect.push(hooks.effect);
    hooks.finally && targetMode.finally.push(hooks.finally);
    return targetMode;
}
function exec(instance, target) {
    Object.keys(forStatic).forEach(type => {
        target[type].forEach(i => {
            switch (type) {
                case 'scan':
                    {
                        const fn = instance[type];
                        i && fn.bind(instance)(i);
                    }
                    break;
                case 'animate':
                    {
                        const fn = instance[type];
                        fn.bind(instance)((_) => {
                            i(_, instance);
                        }, 20);
                    }
                    break;
                case 'effect':
                    {
                        const fn = instance[type];
                        fn.bind(instance)(({ item, index, instance }) => {
                            i(item, index, instance);
                        });
                    }
                    break;
                case 'finally':
                    {
                        const fn = instance[type];
                        fn.bind(instance)((instance) => {
                            i(instance);
                        });
                    }
                    break;
            }
        });
    });
}
const forMove = {
    scan: [initParams],
    animate: [move3D, rotate3D],
    effect: [setColor, eventHandle],
    finally: [toolTipHandle]
};
const forStatic = {
    scan: [findLocation],
    effect: [setColor, eventHandle],
    animate: [],
    finally: [suitLayout, toolTipHandle]
};
export const ORIENTATION = TEXT_ORIENTATION;
export const RENDER_MODE = MODE;
