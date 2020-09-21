import XLSX = require("xlsx");
import QRCode = require("qrcode");

QRCode.toFile("qr-code.jpg", `http://73.166.82.182:3000/data={"name": "steve"}`);
let ip = "http://192.168.1.19:3000";

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
    
