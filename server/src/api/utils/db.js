var db = require('node-localdb');
var game = db('./db.json');

async function getGameData(gameId){
    let res = await game.findOne({gameId:gameId});
    return res;
}

async function insertNewGame(gameId){
    let newGame = {
        gameId:gameId,
        board: Array(9).fill(null),
        gameAlive:false,
        gameFinished: false,
        whosTurn: 'X',
        lastUpdate: new Date().getTime()
    }
    // newGame = JSON.stringify(newGame);
    // let res = await game.set(gameId,newGame);
    let res = await game.insert(newGame);

    // let res = {status:false};
    console.log(res);
    return res;
}

module.exports= {getGameData,insertNewGame}