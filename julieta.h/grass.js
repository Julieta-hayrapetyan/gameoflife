let LeavingCreature = require("./LivingCreature")
module.exports = class Grass extends  LeavingCreature{
    constructor(x, y, index) {
        super(x, y)
        this.multiply = 0;

    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random()*emptyCells.length)]

        console.log(emptyCells, newCell);
        if (newCell && this.multiply >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
}