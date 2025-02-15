"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApp = void 0;
const etag_1 = __importDefault(require("etag"));
const randomcolor_1 = __importDefault(require("randomcolor"));
const blob_1 = require("./blob");
const validator_1 = require("./validator");
const os_1 = __importDefault(require("os"));
async function getApp(req, res) {
    var _a, _b, _c, _d, _e, _f;
    try {
        const query = req.query;
        const color = (0, randomcolor_1.default)();
        const random = Math.random();
        const blobQuery = [
            (_a = query.seed) !== null && _a !== void 0 ? _a : random.toString(),
            (_b = (0, validator_1.getInt)(query.extraPoints)) !== null && _b !== void 0 ? _b : 4,
            (_c = (0, validator_1.getInt)(query.randomness)) !== null && _c !== void 0 ? _c : 6,
            (_d = (0, validator_1.getInt)(query.size)) !== null && _d !== void 0 ? _d : 256,
            query.fill ? `#${query.fill}` : color,
            query.stroke ? `#${query.stroke}` : 'none',
            (_e = (0, validator_1.getInt)(query.strokeWidth)) !== null && _e !== void 0 ? _e : 0,
        ];
        const blob = (0, blob_1.getBlob)(...blobQuery);
        res
            .status(200)
            .header('Content-Disposition', 'filename="blob.svg"')
            .header('Content-Type', 'image/svg+xml')
            .header('Cache-Control', 'public, max-age=0, must-revalidate')
            .header('ETag', (0, etag_1.default)(blob))
            .header('Blob-Version', `${(_f = process.env.VERSION) !== null && _f !== void 0 ? _f : '1.0-dev'}-${os_1.default.hostname()}`)
            .header('Blob-Path', `/blob.svg?seed=${blobQuery[0]}&extraPoints=${blobQuery[1]}&randomness=${blobQuery[2]}&size=${blobQuery[3]}&fill=${blobQuery[4].replace('#', '')}&stroke=${blobQuery[5].replace('#', '')}&strokeWidth=${blobQuery[6]}`)
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
