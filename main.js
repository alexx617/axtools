import utils from './utils.js';

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = utils;
    } else {
        exports.utils = utils;
    }
} else {
    window.utils = utils;
}
