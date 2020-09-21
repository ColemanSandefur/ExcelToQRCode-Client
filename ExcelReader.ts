import { debug } from "console";
import XLSX = require("xlsx");

export class ExcelReader {
    public workbook?: XLSX.WorkBook;
    public worksheet?: XLSX.WorkSheet;

    loadBook(path: string) {
        this.workbook = XLSX.readFile(path);
    }

    loadPage(name: string) {
        this.worksheet = this.workbook?.Sheets[name];
    }

    getRange(columnNames: string[], start: string, stop: string): JSON[] {
        if (this.worksheet == null) {
            return JSON.parse("{}");
        }

        //Gets encoded format cells ('A1', 'C8', ect.) to an easier format of (c,r) column, row
        let startAddress:XLSX.CellAddress = XLSX.utils.decode_cell(start);
        let stopAddress:XLSX.CellAddress = XLSX.utils.decode_cell(stop);

        //This is where all the json objects end up
        let output: JSON[] = [];

        for (let r = Math.min(startAddress.r, stopAddress.r); r <= Math.max(startAddress.r, stopAddress.r); r++) {
            let line = JSON.parse("{}");
            let i = 0; //Keeps track of what column we are on when using columnNames
            for (let c = Math.min(startAddress.c, stopAddress.c); c <= Math.max(startAddress.c, stopAddress.c); c++) {
                console.log(`c: ${c}, r: ${r}`);
                var cellRef = XLSX.utils.encode_cell({c: c, r: r});
                var data = this.worksheet[cellRef].w;

                if (columnNames.length > i) {
                    line[columnNames[i]] = data;
                } else {
                    line[`COLUMN_${i}`] = data;
                }
                i++;
            }
            output.push(line);
            
        }

        console.log(output);

        return output;
    }
}