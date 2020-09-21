import QRCode = require("qrcode");

import { ConfigManager } from "./ConfigManager"


let ip = `http://${ConfigManager.config.ip}`;

export class QrGenerator {
    static generateQRCode(path: string, data: JSON) {
        let encoded: string = this.base64Encode(JSON.stringify(data));
        QRCode.toFile(path, `${ip}/decode/${encoded}`);
    }

    static base64Decode(base64: string): string {
        return Buffer.from(base64, 'base64').toString('ascii');
    }

    static base64Encode(ascii: string): string {
        return Buffer.from(ascii).toString('base64').replace("=", "");
    }
}
    
