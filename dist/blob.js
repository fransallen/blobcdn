"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlob = void 0;
const v2_1 = __importDefault(require("blobs/v2"));
function getBlob(seed, extraPoints, randomness, size, fill, stroke, strokeWidth) {
    const options = { seed, extraPoints, randomness, size };
    const style = {
        fill,
        stroke,
        strokeWidth,
    };
    return v2_1.default.svg(options, style);
}
exports.getBlob = getBlob;
