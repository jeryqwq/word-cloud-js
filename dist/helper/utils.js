import { MODE, TEXT_ORIENTATION } from "./constant";
export const compos = function (...fns) {
    return function (init) {
        return fns.reduce((a, b) => {
            return b(a || init);
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
        return (to[1] - to[0]) / interval * val + to[0];
    };
};
export const throttle = function (fn, ms) {
    let prev = new Date().getTime();
    return function (...args) {
        const cur = new Date().getTime();
        if (cur - prev >= ms) {
            fn && fn(...args);
            prev = new Date().getTime();
        }
        else {
            // prev = new Date().getTime()
        }
    };
};
export function archimedeanSpiral(size, { step = 0.1, b = 5, a = 1 } = {}) {
    const e = size[0] / size[1]; // 根据画布长宽比例进行对应缩放
    // 参数t为当前弧度值
    return function (t) {
        return [e * (a + b * (t *= step)) * Math.cos(t), (a + b * t) * Math.sin(t)];
    };
}
export const checkRepeat = function (curLoc, wordDown, gridNumber) {
    for (let i = 0; i < wordDown.length; i++) {
        const matchLoc = wordDown[i];
        if (!(curLoc.right < matchLoc.left - gridNumber ||
            curLoc.left > matchLoc.right + gridNumber ||
            curLoc.bottom < matchLoc.top - gridNumber ||
            curLoc.top > matchLoc.bottom + gridNumber)) {
            return true;
        }
    }
    return false;
};
export const compareLocation = function (item, layout) {
    let ret = Object.assign({}, layout);
    ret.left = Math.min(item.left, layout.left);
    ret.right = Math.max(item.right, layout.right);
    ret.top = Math.min(item.top, layout.top);
    ret.bottom = Math.max(item.bottom, layout.bottom);
    return ret;
};
export const mergeOptions = function (a, b) {
    let ret = {};
    for (const key in b) {
        const element = b[key];
        const con = element.constructor;
        if (con === Number || con === String || con === Boolean) {
            ret[key] = element;
        }
        else {
            ret[key] = Array.isArray(element) ? new con(...element) : Object.assign({}, element);
        }
    }
    for (const key in a) {
        const element = a[key];
        const con = element.constructor;
        if (con === Number || con === String || con === Boolean) {
            ret[key] = element;
        }
        else {
            ret[key] = Array.isArray(element) ? new con(...element) : Object.assign({}, element);
        }
    }
    return ret;
};
export const setElConfig = function (el, config) {
    config.backgroundColor && (el.style.backgroundColor = config.backgroundColor);
    config.borderColor && (el.style.borderColor = config.borderColor);
    config.borderWidth && (el.style.borderWidth = config.borderWidth + 'px');
    config.font && (el.style.borderWidth = config.font);
    el.style.lineHeight = '1';
    config.padding && (el.style.padding = `${config.padding[0]}px ${config.padding[1]}px`);
    if (config.mode === MODE.NORMAL) {
        const { orientation } = config;
        el.style.writingMode = orientation === TEXT_ORIENTATION.HORIZONTAL ? 'tb' : orientation === TEXT_ORIENTATION.VERTICAL ? '' : Math.random() > 0.5 ? 'tb' : '';
        config.animate && (el.classList.add('word-cloud-animate'));
    }
};
export const appendCss = function () {
    if (window['content-for-word-cloud'])
        return;
    const el = document.createElement('style');
    el.id = 'content-for-word-cloud';
    el.innerHTML = `.word-cloud-item-chencc{
    display: block;
    position: absolute;
    left: 0px;
    top: 0px;
    color: white;
    text-decoration: none;
    font-size: 15px;
    font-family: '微软雅黑';
    font-weight: bold;
    cursor: pointer;
    transition:  all .3s;
    border: solid;
    border-width: 0;
  }
  @keyframes word {
    0% {
      opacity: 0.5;
    }
    3% {
      opacity: 1;
    }
    9% {
      opacity: 1;
    }
    12% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.5;
    }
  }
  .word-cloud-animate {
    animation-name: word;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    will-change: opacity;
    opacity: 0.5;
  }

  .word-cloud-animate:nth-child(3n + 1) {
    animation-delay: 0s;
  }
  .word-cloud-animate:nth-child(3n + 2) {
    animation-delay: 3s;
  }
  .word-cloud-animate:nth-child(3n + 3) {
    animation-delay: 6s;
  }`;
    document.body.appendChild(el);
};
