"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const qrcode_routes_1 = require("./routes/qrcode.routes");
const app = express_1.default();
exports.app = app;
app.use(express_1.default.json());
app.use("/qrcodes", qrcode_routes_1.qrCodeRoutes);
