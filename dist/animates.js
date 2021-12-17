import { rotateX, rotateY, move } from "./helper/animate";
// animate 
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
