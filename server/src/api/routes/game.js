
const express = require('express') // importing Express
const game = express.Router() // instance of express
const db = require('../utils/db');


game.get("/", function(req, res) {
    console.log(req.query);
    return res.status(200).send("OK\n"+JSON.stringify(req.query));
})
game.post("/newGame", async function(req, res) {
    console.log(req.body);
    let result = await db.insertNewGame(req.body.gameId);
    return res.status(200).send(JSON.stringify({result}));
})
game.post("/updatePlayers", async function(req, res) {
    console.log(req.body);
    let result = await db.updatePlayers(req.body.gameId);
    return res.status(200).send(JSON.stringify({result}));
})
game.get("/getGameData", async function(req, res) {
    console.log(req.query);
    let result = await db.getGameData(req.query.gameId);
    return res.status(200).send(JSON.stringify(result));
})

module.exports = game
