import QRCode = require("qrcode");
import axios = require("axios");

import { ConfigManager } from "./ConfigManager"
import Axios from "axios";
import { ExcelData } from "./ExcelReader";


let ip = `http://${ConfigManager.config.ip}`;

class FormatKeys {
    [key: string]: string;
}
export class QrGenerator {
    static generateQRCode(path: string, data: ExcelData): Promise<{"UUID":string, "path": string, "buffer": Buffer} | null> {
        // let encoded: string = this.base64Encode(JSON.stringify(data));
        return new Promise((res, rej) => {
            Axios({
                method:'post',
                url: `${ip}/encode`,
                data: JSON.parse(JSON.stringify(data))
            }).then((results) => {
                let UUID = results.data;

                if (UUID == '') {
                    res(null)
                }

                console.log(`${ip}/decode/${UUID}`);

                let options: QRCode.QRCodeToBufferOptions = {
                    scale: 8 //default 4
                };

                let formatKeys = {
                    "$UUID": UUID,
                    "$valveID": data.valveID
                }
                path = this.formatName(path, formatKeys);
                // QRCode.toFile(path, `${ip}/decode/${UUID}`, options);
                QRCode.toBuffer(`${ip}/decode/${UUID}`, options, (err, buffer) => {
                    res({"UUID": UUID, "path": path, "buffer": buffer});
                });
            });
        });
    }

    static base64Decode(base64: string): string {
        return Buffer.from(base64, 'base64').toString('ascii');
    }

    static base64Encode(ascii: string): string {
        return Buffer.from(ascii).toString('base64').replace("=", "");
    }

    private static formatName(name: string, formatKeys: FormatKeys): string {
        Object.keys(formatKeys).forEach(e => {
            name = name.replace(e, formatKeys[e]);
        });

        return name;
    }
}
    
