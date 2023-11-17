"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qrcode_1 = require("@nuintun/qrcode");
const base64_img_1 = __importDefault(require("base64-img"));
const crypto_1 = require("crypto");
const path_1 = __importDefault(require("path"));
class CreateQrCodeUseCase {
    constructor() {
        // do nothing
    }
    execute(qrCodeText) {
        return __awaiter(this, void 0, void 0, function* () {
            const folderPath = path_1.default.resolve(__dirname, "..", "..", "..", "..", "tmp");
            const hash = crypto_1.randomBytes(10).toString("hex");
            const actualDate = new Date(Date.now());
            const fileName = `${hash}-${actualDate}`;
            const qrcode = new qrcode_1.Encoder();
            qrcode.setEncodingHint(true);
            qrcode.setErrorCorrectionLevel(qrcode_1.ErrorCorrectionLevel.H);
            qrcode.write(qrCodeText);
            qrcode.make();
            const base64Image = Array.from(qrcode.toDataURL());
            base64Image.splice(11, 3, "png");
            base64_img_1.default.imgSync(base64Image.join(""), folderPath, Array.from(fileName)
                .slice(0, fileName.length - 4)
                .join(""));
            return true;
            // const bufferedItem = fs.readFileSync(`${folderPath}/${fileName}`);
            // const fileCreated = await this.storageProvider.saveBufferOnFile(
            //   bufferedItem,
            //   bucketName,
            //   fileName,
            //   false
            // );
            // fs.rmSync(`${folderPath}/${fileName}`);
        });
    }
}
exports.default = CreateQrCodeUseCase;
