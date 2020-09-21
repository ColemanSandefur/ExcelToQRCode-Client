import fs = require("fs");

//Import my classes
import { ConfigManager } from "./ConfigManager";
ConfigManager.loadConfig("qrconfig.json");
import { QrGenerator } from "./qr-generator";
import {ExcelReader} from "./ExcelReader";

let reader = new ExcelReader();
reader.loadBook("test-book.xlsx");
reader.loadPage("Sheet1");

// console.log(reader.getRange(["Name", "Job", "Site"], "A1", "C3"));
QrGenerator.generateQRCode("qr-code.jpg",reader.getRange(["Name", "Job", "Site"], "A2", "C3")[1]);