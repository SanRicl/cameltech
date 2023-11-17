"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrCodeRoutes = void 0;
const CreateQrCodeController_1 = __importDefault(require("@modules/qrcodes/useCases/CreateQrCode/CreateQrCodeController"));
const express_1 = require("express");
exports.qrCodeRoutes = express_1.Router();
const createQrCodeController = new CreateQrCodeController_1.default();
exports.qrCodeRoutes.post("/", createQrCodeController.handle);
