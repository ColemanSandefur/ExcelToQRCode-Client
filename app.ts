import fs = require("fs");

//Import my classes
import { ConfigManager } from "./ConfigManager";
ConfigManager.loadConfig("qrconfig.json");
import { QrGenerator } from "./qr-generator";
import {ExcelReader} from "./ExcelReader";

let reader = new ExcelReader();
reader.loadBook("test-book.xlsx");
reader.loadPage("Sheet1");

QrGenerator.generateQRCode("qr-code.jpg",reader.getRange(["Name", "Job", "Site"], "A2", "I3")[0]);
QrGenerator.generateQRCode("qr-code2.jpg", JSON.parse('{"hi": "steve"}'));