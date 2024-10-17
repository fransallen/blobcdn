"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlob = void 0;
const v2_1 = __importDefault(require("blobs/v2"));
const randomcolor_1 = __importDefault(require("randomcolor"));
function getBlob(seed, extraPoints, randomness, size, fill, stroke = 'none', strokeWidth = 0) {
    const color = (0, randomcolor_1.default)();
    const options = { seed, extraPoints, randomness, size };
    const style = {
        fill: fill ? `#${fill}` : color,
        stroke: stroke !== 'none' ? `#${stroke}` : stroke,
        strokeWidth,
    };
    return v2_1.default.svg(options, style);
}
exports.getBlob = getBlob;
