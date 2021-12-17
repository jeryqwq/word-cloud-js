// effect
export const setColor = function (item, index, instance) {
    const { el } = item;
    const { colors } = instance.config;
    const color = colors[index % colors.length];
    el.style.color = color;
    return color;
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
