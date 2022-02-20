import Excel, { Workbook } from 'exceljs';

class Database {
  foodDb: Workbook;

  foods: Record<string, string|number>[] = [];

  async initialize() {
    this.foodDb = new Excel.Workbook();
    await this.foodDb.xlsx.readFile('./Schweizer-Nahrwertdatenbank.xlsx');
    const workSheets = [
      this.foodDb.getWorksheet('Generische Lebensmittel'),
      this.foodDb.getWorksheet('Generische Lebensmittel'),
    ];

    // get all the micro / macro nutrition for all registered foods table
    workSheets.forEach((workSheet) => {
      const columnNames = workSheet.getRow(3);

      workSheet.eachRow((foodRow, rowIndex) => {
        if (rowIndex < 4) {
          return;
        }

        const food: Record<string, number|string> = {};

        foodRow.eachCell((cell, colIndex) => {
          const colText = columnNames.getCell(colIndex).text;
          if (colIndex > 8) {
            food[colText] = parseInt(cell.text, 10);
          } else {
            food[colText] = cell.text;
          }
        });

        this.foods.push(food);
      });
    });
  }

  getMeal(name: string) {
    return this.foods.find((food) => {
      const lowerCaseName = (food.Name as string).toLowerCase();
      return lowerCaseName.indexOf(name.toLowerCase()) !== -1;
    });
  }
}

export default new Database();
