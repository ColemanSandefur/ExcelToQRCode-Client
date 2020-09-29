import QRCode = require("qrcode");
import axios = require("axios");

import { ConfigManager } from "./ConfigManager"
import Axios from "axios";


let ip = `http://${ConfigManager.config.ip}`;

export class QrGenerator {
    static generateQRCode(path: string, data: JSON) {
        // let encoded: string = this.base64Encode(JSON.stringify(data));
        let dataSend = {
            valveFlow: 0,
            fluid: 0,
            valveID: Math.floor(Math.random() * 1000)
        };
        Axios({
            method:'post',
            url: `${ip}/encode`,
            data: {
                valveFlow: 0,
                fluid: 0,
                valveID: Math.floor(Math.random() * 1000)
            }
        }).then((results) => {
            // console.log(results.data);
            let UUID = results.data;
            
            // console.log(UUID);
            console.log(`${ip}/decode/${UUID}`);
            let options: QRCode.QRCodeToFileOptions = {
            };
            QRCode.toFile(path, `${ip}/decode/${UUID}`, options);
        });
        
    }

    static base64Decode(base64: string): string {
        return Buffer.from(base64, 'base64').toString('ascii');
    }

    static base64Encode(ascii: string): string {
        return Buffer.from(ascii).toString('base64').replace("=", "");
    }
}
    
