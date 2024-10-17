"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app_1 = require("./app");
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '3000', 10);
app.disable('x-powered-by');
// Serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Root route
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../views', 'index.html'));
});
// Blob route
app.get('/blob.svg', app_1.getApp);
// Start the server
app.listen(port, () => {
    console.log(`BlobCDN listening at http://localhost:${port}`);
});
