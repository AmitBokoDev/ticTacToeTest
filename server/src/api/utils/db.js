var db = require('node-localdb');
var game = db('./db.json');

async function getGameData(gameId){
    let res = await game.findOne({"gameId":gameId});
    return res;
}

async function insertNewGame(gameId){
    let newGame = {
        gameId:gameId,
        board: Array(9).fill(null),
        gameAlive:false,
        gameFinished: false,
        whosTurn: 'X',
        lastUpdate: new Date().getTime(),
        joined:0,
    }
    let res = await game.insert(newGame);

    console.log(res);
    return res;
}
async function updatePlayers(gameId){
    let newGame = {
        gameId:gameId,
        board: Array(9).fill(null),
        gameAlive:false,
        gameFinished: false,
        whosTurn: 'X',
        lastUpdate: new Date().getTime()
    }
    let res = await game.insert(newGame);

    console.log(res);
    return res;
}

module.exports= {getGameData,insertNewGame,updatePlayers}