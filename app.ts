import fs = require("fs");
import Jimp, { BLEND_OVERLAY } from 'jimp';

//Import my classes
import { ConfigManager } from "./ConfigManager";
ConfigManager.loadConfig("qrconfig.json");
import { QrGenerator } from "./qr-generator";
import {ExcelData, ExcelReader} from "./ExcelReader";


let reader = new ExcelReader();
reader.loadBook(ConfigManager.config.excelFileName);
reader.loadPage(ConfigManager.config.excelSheetName);

let jsonData = reader.getRange(ConfigManager.config.columnNames, ConfigManager.config.excelRange.start, ConfigManager.config.excelRange.stop);

async function generateQRCodes(data: ExcelData[]) {
    let font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        await QrGenerator.generateQRCode(ConfigManager.config.qrFileName, row).then((data) => {
            if (data == null) {
                jsonData[i].UUID = "File Not Created"
            } else {
                jsonData[i].UUID = data.UUID;
                addIdToImage(font, data.path, data.buffer, jsonData[i].valveID);
            }
        });
    }
}

generateQRCodes(jsonData).then(() => {
    let outputOrder = ConfigManager.config.outputOrder;
    jsonData = JSON.parse(JSON.stringify(jsonData, outputOrder));
    if (ConfigManager.config.fileReferenceName.indexOf(".xlsx") > -1) {
        ExcelReader.writeBook(ConfigManager.config.fileReferenceName, jsonData);
    } else {
        fs.writeFileSync(ConfigManager.config.fileReferenceName, JSON.stringify(jsonData, null, "\t"));
    }
});

function addIdToImage(font: any, path:string, buffer:Buffer, valveID: string) {
    Jimp.read(buffer, (error, lenna) => {
        if (error) {
            console.error(error);
        }

        lenna.scale(1, (err, lenna) => {
            let text = `Valve ID: ${valveID}`;
            let imageWidth = lenna.getWidth();
            let imageHeight = lenna.getHeight();
            let textHeight = Jimp.measureTextHeight(font, text, lenna.getWidth());
            let textWidth = Jimp.measureText(font, text);
            new Jimp(imageWidth, (imageHeight + textHeight), 0xFFFFFFFF, (err, image) => {
                console.log(image.getWidth, -textWidth, (image.getWidth() - textWidth)/2);
                image
                    .composite(lenna, 0, 0)
                    .print(
                        font,
                        0,
                        image.getHeight() - textHeight,
                        {
                            "text": text,
                            "alignmentX": Jimp.HORIZONTAL_ALIGN_CENTER
                        },
                        image.getWidth()
                    ).write(path);
            });
        });
    });
}