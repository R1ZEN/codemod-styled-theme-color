const { join } = require('path');
const { getThemePath } = require('./get-theme-path');

const colorPathMap = new Map();

const fillColorPathMap = () => {
    const themePath = getThemePath();
    let theme;
    if (themePath) {
        const cwd = process.cwd();
        theme = require(join(cwd, themePath)).theme;
    } else {
        throw new Error('Need pass path to theme to THEME_PATH variable');
    }

    const acc = [{
        path: 'theme',
        value: theme
    }];

    let obj;
    let keys;
    let path;
    let isArray;
    let item;

    while (acc.length) {
        item = acc.pop();
        obj = item.value;
        path = item.path;
        keys = Object.keys(obj);
        isArray = Array.isArray(obj);

        for (const key of keys) {
            if (typeof obj[key] === 'object') {
                if (isArray) {
                    acc.push({
                        path: `${path}[${key}]`,
                        value: obj[key]
                    });
                } else {
                    acc.push({
                        path: `${path}.${key}`,
                        value: obj[key]
                    });
                }

                continue;
            }

            if (typeof obj[key] === 'string' && obj[key][0] === '#' && !colorPathMap.has(obj[key])) {
                if (isArray) {
                    colorPathMap.set(obj[key], `${path}[${key}]`);
                } else {
                    colorPathMap.set(obj[key], `${path}.${key}`);
                }
            }
        }
    }
}

const getColorPath = (color) => {
    if (!colorPathMap.size) {
        fillColorPathMap();
    }

    return colorPathMap.get(color);
}

module.exports = { getColorPath };
