import fs = require("fs");

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
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        await QrGenerator.generateQRCode(ConfigManager.config.qrFileName, row).then((UUID) => {
            if (UUID == null) {
                jsonData[i].UUID = "File Not Created"
            } else {
                jsonData[i].UUID = UUID;
            }
        });
    }
}

generateQRCodes(jsonData).then(() => {
    let outputOrder = ConfigManager.config.outputOrder;
    jsonData = JSON.parse(JSON.stringify(jsonData, outputOrder));
    if (ConfigManager.config.fileReferenceName.indexOf(".xlsx")) {
        ExcelReader.writeBook(ConfigManager.config.fileReferenceName, jsonData);
    } else {
        fs.writeFileSync(ConfigManager.config.fileReferenceName, JSON.stringify(jsonData, null, "\t"));
    }
});