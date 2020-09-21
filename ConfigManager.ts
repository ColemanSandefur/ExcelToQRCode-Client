import fs = require("fs");

export class ConfigManager {
    static config: {"ip": string};

    static loadConfig(path: string) {
        if (fs.existsSync(path)) {
            this.config = JSON.parse(fs.readFileSync(path).toString());
        } else {
            this.createConfigFile(path);
        }
    }

    private static createConfigFile(path: string) {
        let newConfig:JSON = <JSON><unknown>{
            "ip": "0.0.0.0:3000"
        };

        this.config = <any>newConfig;
        fs.writeFileSync(path, JSON.stringify(newConfig));
    }
}