var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
res.redirect('index.html');
});

server.listen(3000);
function generator(matLen, gr, grEat,pr, re, prEat, reEat) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < re; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < prEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    for (let i = 0; i < reEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6;
        }
    }
    io.emit("send matrix",matrix)
    return matrix;
}
matrix = generator(30, 10, 6, 6, 6, 6, 5);

grassArr = []
grassEaterArr = []
PredatorArr = []
restorerArr = []
prEaterArr = []
restorerEaterArr = []

const Grass =  require('./grass')
const GrassEater = require('./GrassEater')
const PrEater = require('./PrEater')
const Predator = require('./Predator')
const Restorer = require ('./Restorer')
const RestorerEater = require('./RestorerEater')

function createrObj (){
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            } else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y)
                PredatorArr.push(gr)
            } else if (matrix[y][x] == 4) {
                let gr = new Restorer(x, y)
                restorerArr.push(gr)
            } else if (matrix[y][x] == 5) {
                let gr = new PrEater(x, y)
                prEaterArr.push(gr)
            }else if (matrix[y][x] == 6) {
                let gr = new RestorerEater(x, y)
                restorerEaterArr.push(gr)
            }
        }
    }
}
createrObj()

function gameMove (){
    for (let i in grassArr) {
        grassArr[i].mul();
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].mul()
        grassEaterArr[i].eat()
    }
    for (let i in PredatorArr) {
        PredatorArr[i].mul()
        PredatorArr[i].eat()
    }
    for (let i in restorerArr) {
        restorerArr[i].mul()
        restorerArr[i].eat()
    }
    for (let i in prEaterArr) {
        prEaterArr[i].eat()
    }
    for (let i in restorerEaterArr) {
        restorerEaterArr[i].mul()
        restorerEaterArr[i].eat()
    }
    io.emit("send matrix",matrix)
}

setInterval(gameMove,1000)

