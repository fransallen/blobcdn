"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUrl = exports.getInt = void 0;
const url_1 = require("url");
function getInt(str) {
    if (typeof str === 'number') {
        return Math.floor(str);
    }
    return /[0-9]+/.test(String(str)) ? parseInt(String(str), 10) : undefined;
}
exports.getInt = getInt;
function isValidUrl(str) {
    try {
        new url_1.URL(str);
        return true;
    }
    catch (_a) {
        return false;
    }
}
exports.isValidUrl = isValidUrl;
