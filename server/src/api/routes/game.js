
const express = require('express') // importing Express
const game = express.Router() // instance of express
const db = require('../utils/db');

//test get
game.get("/", function(req, res) {
    console.log(req.query);
    return res.status(200).send("OK\n"+JSON.stringify(req.query));
})

//create new game in db
game.post("/newGame", async function(req, res) {
    console.log(req.body);
    let result = await db.insertNewGame(req.body.gameId);
    return res.status(200).send(JSON.stringify({result}));
})

// update player connected | TODO: make this work
game.post("/updatePlayers", async function(req, res) {
    console.log(req.body);
    let result = await db.updatePlayers(req.body.gameId);
    return res.status(200).send(JSON.stringify({result}));
})

// fetch game data | TODO: make better, check for a better solution than periodic gets
game.get("/getGameData", async function(req, res) {
    console.log(req.query);
    let result = await db.getGameData(req.query.gameId);
    return res.status(200).send(JSON.stringify(result));
})

module.exports = game
