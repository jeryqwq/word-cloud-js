import { initParams, findLocation } from './scans';
import { renderToolTip, setColor } from './effets';
import { rotate3D, move3D } from './animates';
import WordChart from './WordChart';
import { MODE, TEXT_ORIENTATION } from './helper/constant';
import { suitLayout } from './finally';
import { appendCss } from './helper/utils';
export function init(config) {
    var _a;
    const instance = WordChart.of(config); // 类实例
    const mode = (_a = instance === null || instance === void 0 ? void 0 : instance.config) === null || _a === void 0 ? void 0 : _a.mode;
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
    effect: [setColor, renderToolTip],
    finally: []
};
const forStatic = {
    scan: [findLocation],
    effect: [setColor, renderToolTip],
    animate: [],
    finally: [suitLayout]
};
export const ORIENTATION = TEXT_ORIENTATION;
export const RENDER_MODE = MODE;
