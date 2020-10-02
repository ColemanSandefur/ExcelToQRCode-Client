import fs = require("fs");

export class Config {
    "ip": string;
    "excelFileName": string;
    "excelSheetName": string;
    "excelRange": {
        "start": string,
        "stop": string
    }
    "columnNames": string[];
    "qrFileName": string;
    "fileReferenceName": string;
    "outputOrder": string[];
}
export class ConfigManager {
    static config: Config

    static loadConfig(path: string) {
        if (fs.existsSync(path)) {
            this.config = JSON.parse(fs.readFileSync(path).toString());
        } else {
            this.createConfigFile(path);
        }
    }

    private static createConfigFile(path: string) {
        console.log(`\nconfig file not found at ${path}, creating one now`);
        let newConfig:Config = new Config();

        newConfig.ip = "0.0.0.0:3000";
        newConfig.excelFileName = "test-book.xlsx";
        newConfig.excelSheetName = "Sheet1";
        newConfig.excelRange = {"start": "A2", "stop": "D10"};
        newConfig.columnNames = ["valveFlow", "fluid", "valveID"];
        newConfig.qrFileName = "$UUID.jpg",
        newConfig.fileReferenceName = "fileOutupt.json";
        newConfig.outputOrder =  ["UUID", "valveFlow", "fluid", "valveID"];
        

        this.config = <any>newConfig;
        fs.writeFileSync(path, JSON.stringify(newConfig, null, "\t"));

        console.log(`generated config, please edit the config at ${path}`);
        process.exit(0);
    }
}