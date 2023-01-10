
const express = require('express') // importing Express
const game = express.Router() // instance of express

game.get("/", function(req, res) {
    console.log(req.query);
    return res.status(200).send("OK\n"+JSON.stringify(req.query));
})
game.post("/", function(req, res) {
    console.log(req.body);
    return res.status(200).send(JSON.stringify(req.body));
})

module.exports = game
