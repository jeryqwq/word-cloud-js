// animate 
import { DIRECTION } from "./helper/constant";
export const rotateX = function (item, instance) {
    const angleX = [DIRECTION.RIGHT2LEFT, DIRECTION.LEFT2RIGHT].includes(instance.DIRECTION)
        ? Math.PI / Infinity
        : Math.PI / ((Number(instance.DIRECTION) / 2) * Number(instance.speed));
    const cos = Math.cos(angleX);
    const sin = Math.sin(angleX);
    item.z = item.z || 1;
    const y1 = item.y * cos - item.z * sin;
    const z1 = item.z * cos + item.y * sin;
    return Object.assign(Object.assign({}, item), { y: y1, z: z1 });
};
export const rotateY = function (item, instance) {
    const angleY = [DIRECTION.BOTTOM2TOP, DIRECTION.TOP2BOTTOM].includes(instance.DIRECTION)
        ? Math.PI / Infinity
        : Math.PI / (Number(instance.DIRECTION) * Number(instance.speed));
    const cos = Math.cos(angleY);
    const sin = Math.sin(angleY);
    item.z = item.z || 1;
    const x1 = item.x * cos - item.z * sin;
    const z1 = item.z * cos + item.x * sin;
    return Object.assign(Object.assign({}, item), { x: x1, z: z1 });
};
export const move = function (item, instance) {
    const { elRect } = instance;
    const { width, height } = elRect;
    const CX = width / 2;
    const CY = height / 2;
    let { x, y, z } = item;
    z = z || 1;
    const fallLength = 500;
    const RADIUS = (width - 50) / 2;
    const scale = fallLength / (fallLength - z);
    const alpha = (z + RADIUS) / (2 * RADIUS);
    const left = `${x + CX - 15}px`;
    const top = `${y + CY - 15}px`;
    item.x1 = x + CX - 15;
    item.y1 = y + CY - 15;
    const transform = `translate(${left}, ${top}) scale(${scale})`;
    return {
        x,
        y,
        z,
        opacity: alpha + 0.5,
        zIndex: parseInt(scale * 100 + '', 10),
        transform
    };
};
export const move3D = function (tempArr, instance) {
    tempArr.forEach(i => {
        const { el } = i;
        const { transform, opacity, zIndex } = move(i, instance);
        el.style.transform = transform;
        el.style.opacity = opacity + '';
        el.style.zIndex = zIndex + '';
    });
};
export const rotate3D = function (tempArr, instance) {
    tempArr.forEach(item => {
        const { z, y } = rotateX(item, instance);
        item.z = z;
        item.y = y;
        const { x, z: z1 } = rotateY(item, instance);
        item.z = z1;
        item.x = x;
    });
};
