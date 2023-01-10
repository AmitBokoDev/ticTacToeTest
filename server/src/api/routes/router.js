
const express = require('express') // importing Express
const router = express.Router() // instance of express

router.get("/", function(req, res) {
    console.log(req.query);
    return res.status(200).send("OK\n"+JSON.stringify(req.query));
})
router.post("/", function(req, res) {
    console.log(req.body);
    return res.status(200).send(JSON.stringify(req.body));
})

module.exports = router
