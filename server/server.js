const express = require('express');
const router = require("./src/api/routes/router");
const game = require("./src/api/routes/game");
const bodyParser = require("body-parser");

const domainName = process.env.DOMAIN_NAME;

const app = express(); // instance of express

// Port listen
const port = 8080;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(bodyParser.json({
  limit: '100mb'
}));
app.use(bodyParser.text({
  limit: '100mb'
}));

app.use(bodyParser.urlencoded({
  limit: '100mb',
  parameterLimit: 200000,
  extended: true
}));

app.use("/", router);
app.use("/game", game);

app.listen(port, function (req, res) {
console.log(`Server is listening on port ${port}!`);
});
