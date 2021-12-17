export const createTextNode = function (item) {
    const el = document.createElement('div');
    el.textContent = item.name;
    el.className = 'word-cloud-item-chencc';
    return el;
};
