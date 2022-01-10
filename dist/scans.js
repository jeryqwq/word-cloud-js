import { createTextNode } from './helper/genItem';
import { checkRepeat, compareLocation, setElConfig } from './helper/utils';
export const initParams = function (_) {
    const { item, index, instance } = _;
    const { value: { length }, RADIUSX, RADIUSY } = instance;
    const itemEl = createTextNode(item);
    instance.elMap.set(itemEl, item);
    const k = -1 + (2 * (index + 1) - 1) / length;
    const a = Math.acos(k);
    const b = a * Math.sqrt(length * Math.PI);
    const x = RADIUSX * Math.sin(a) * Math.cos(b);
    const y = RADIUSY * Math.sin(a) * Math.sin(b);
    const z = RADIUSX * Math.cos(a);
    setElConfig(itemEl, instance.config);
    instance.elWrap.appendChild(itemEl);
    return Object.assign(Object.assign({}, item), { el: itemEl, x,
        y,
        z });
};
// let domLocations: Array<DOMRect> = []
let prevIndex = 0;
export const findLocation = function (_) {
    const { item, index, instance } = _;
    const { value: { length }, domLocations } = instance;
    const { width, height } = instance.elRect;
    const el = createTextNode(item);
    instance.elMap.set(el, item);
    const per = (item.value / instance.maxValue);
    item.per = per;
    item.el = el;
    el.style.fontSize = instance.getValue(per) + 'px';
    if (length >= 50) { // 数据量超过50开启时间分片， 仅在CPU空闲之行， 不阻塞浏览器
        el.style.visibility = 'hidden';
        return new Promise((resolve, reject) => {
            let i = prevIndex;
            void function scheduler() {
                requestIdleCallback(() => {
                    instance.elWrap.appendChild(el);
                    const [x, y] = instance.getSpiral(++i * 5);
                    const left = x + width / 2;
                    const top = y + height / 2;
                    setElConfig(el, instance.config);
                    el.style.transform = `translate(${left}px, ${top}px)`;
                    const rectObj = el.getBoundingClientRect().toJSON();
                    if (domLocations.some(i => (Math.abs(i.left - rectObj.left) < i.width / 2) && Math.abs(i.top - rectObj.top) < i.height / 2)) {
                        i += 2; // 已经放置过的节点直接忽略之后的五次遍历
                        scheduler();
                        return;
                    }
                    else {
                        const res = checkRepeat(rectObj, domLocations, instance.config.gridSize || 0);
                        if (!res) {
                            domLocations.push(rectObj);
                            instance.layout = compareLocation(rectObj, instance.layout);
                            prevIndex = i / 1.5; // 已经被算过的点几乎没有概率还能容纳下其他元素了，直接忽略
                            item.x = left;
                            item.y = top;
                            item.elRect = rectObj;
                            el.style.visibility = 'visible';
                            resolve(Object.assign(Object.assign({}, item), { el }));
                        }
                        else {
                            scheduler();
                        }
                    }
                });
            }();
        });
    }
    else {
        for (let i = prevIndex; i <= (width + height) / 2; i++) {
            const [x, y] = instance.getSpiral(i * 5);
            instance.elWrap.appendChild(el);
            // if(checkedCache[`${x}-${y}`]) {continue} // 跳过已经命中过的坐标的
            const left = x + width / 2;
            const top = y + height / 2;
            setElConfig(el, instance.config);
            // el.style.transform = `translate(${left}px, ${top}px) rotate(${Math.floor(Math.random()*40)}deg)`
            el.style.transform = `translate(${left}px, ${top}px)`;
            const rectObj = el.getBoundingClientRect().toJSON();
            // 检查坐标是否在已布局的元素范围内， 在的话直接跳过
            if (domLocations.some(i => (Math.abs(i.left - rectObj.left) < i.width / 2) && Math.abs(i.top - rectObj.top) < i.height / 2)) {
                i += 2;
                continue;
            }
            const res = checkRepeat(rectObj, domLocations, instance.config.gridSize || 0);
            if (!res) {
                domLocations.push(rectObj);
                instance.layout = compareLocation(rectObj, instance.layout);
                prevIndex = i / 1.5; // 已经被算过的点几乎没有概率还能容纳下其他元素了，直接忽略
                item.x = left;
                item.y = top;
                item.elRect = rectObj;
                break;
            }
        }
        // console.timeEnd(`item-${item.name}`)
        return item;
    }
};
