// using local Js db package, should probably use something else
var db = require('node-localdb');
var game = db('./db.json');

// fetch game data
async function getGameData(gameId){
    let res = await game.findOne({"gameId":gameId});
    return res;
}

// insert to db
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

// update both players connected to db
async function updatePlayers(gameId){
   // no update function? find new package
   
    let res = {status: false}
    console.log(res);
    return res;
}

module.exports= {getGameData,insertNewGame,updatePlayers}