export const compos = function (...fns) {
    return function (init) {
        return fns.reduce((a, b) => {
            return b(a);
        }, init);
    };
};
export const rangMapping = function (from, to) {
    const min = from[0];
    const max = from[1];
    return function (val) {
        if (val < min)
            return to[0]; // 极限最小
        if (val > max)
            return to[1]; // 最大
        const interval = from[1] - from[0];
        return (to[1] - to[0]) / interval * val;
    };
};
