"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApp = void 0;
const etag_1 = __importDefault(require("etag"));
const blob_1 = require("./blob");
const validator_1 = require("./validator");
async function getApp(req, res) {
    var _a, _b, _c, _d, _e, _f;
    try {
        const query = req.query;
        const blob = (0, blob_1.getBlob)((_a = query.seed) !== null && _a !== void 0 ? _a : Math.random(), (_b = (0, validator_1.getInt)(query.extraPoints)) !== null && _b !== void 0 ? _b : 4, (_c = (0, validator_1.getInt)(query.randomness)) !== null && _c !== void 0 ? _c : 6, (_d = (0, validator_1.getInt)(query.size)) !== null && _d !== void 0 ? _d : 256, query.fill, (_e = query.stroke) !== null && _e !== void 0 ? _e : 'none', (_f = (0, validator_1.getInt)(query.strokeWidth)) !== null && _f !== void 0 ? _f : 0);
        res
            .status(200)
            .header('Content-Disposition', 'filename="blob.svg"')
            .header('Content-Type', 'image/svg+xml')
            .header('Cache-Control', 'public, max-age=0, must-revalidate')
            .header('ETag', (0, etag_1.default)(blob))
            .send(blob);
    }
    catch (e) {
        console.error(e.message);
        res
            .status(500)
            .type('text/plain')
            .send('Failed to generate a blob SVG image.');
    }
}
exports.getApp = getApp;
