import { COLOR_MODE } from "./helper/constant";
// effect
export const setColor = function (item, index, instance) {
    const { el } = item;
    const { colors, color, colorMode } = instance.config; // color 旧版数据配置, colors: 新版范围数据配置
    if (colorMode === COLOR_MODE.INDEX) {
        if (color && color.length) {
            el.style.color = color[index % color.length];
        }
        return;
    }
    if (colorMode === COLOR_MODE.RANGE) {
        if (colors && colors.length) {
            const curColorItem = colors.find(i => (i.from <= item.value && i.to >= item.value));
            curColorItem && (el.style.color = curColorItem.color);
        }
        return;
    }
    if (color && color.length) { // 适配就数据业务
        el.style.color = color[index % color.length];
        return;
    }
    if (colors && colors.length) {
        const curColorItem = colors.find(i => (i.from <= item.value && i.to >= item.value));
        curColorItem && (el.style.color = curColorItem.color);
        return;
    }
};
export const renderToolTip = function (item, index, instance) {
    var _a;
    const { el } = item;
    const { config } = instance;
    if (config.events) { // 自定义事件
        Object.keys(config.events).forEach((i) => {
            const fn = config.events && config.events[i];
            el.addEventListener(i, (e) => {
                fn && fn(item, e);
            });
        });
    }
    if ((_a = config.tooltip) === null || _a === void 0 ? void 0 : _a.show) {
        el.addEventListener('mouseenter', (e) => {
            instance.setActive(item, el, e);
        });
        el.addEventListener('mouseleave', () => {
            instance.clearActive();
        });
    }
};
