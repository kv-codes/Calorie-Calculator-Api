const db = require('./conn');

class BmiModel {
    constructor(id, age, bmi) {
        this.id=id;
        this.age=age;
        this.bmi=bmi;

    }
    static async getAll() {
        try{ 
            const response = await db.any(
                `SELECT *  FROM averages;`
            );
            return response;
        }
        catch{
            console.log(error);
        }

        
    }
}
module.exports =  BmiModel
