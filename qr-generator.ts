import XLSX = require("xlsx");
import QRCode = require("qrcode");
import fs = require("fs");

import { ConfigManager } from "./ConfigManager"

let ip = `http://${ConfigManager.config.ip}`;

export class QrGenerator {
    static generateQRCode(path: string, data: JSON) {
        let encoded: string = this.base64Encode(JSON.stringify(data));
        console.log(`${ip}/decode/${encoded}`);
        console.log(this.base64Decode(encoded));
        QRCode.toFile(path, `${ip}/decode/${encoded}`);
    }

    static base64Decode(base64: string): string {
        return Buffer.from(base64, 'base64').toString('ascii');
    }

    static base64Encode(ascii: string): string {
        return Buffer.from(ascii).toString('base64').replace("=", "");
    }
}
    
