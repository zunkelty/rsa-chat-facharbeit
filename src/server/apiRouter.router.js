const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

router.use(bodyParser.json());

router.get('/ping', (req, res) => {
    res.status(200).send('PONG');
})

router.get('/socket-io-client/socket.io.js', (req, res) => {
    res.sendFile(path.join(__dirname, "../../node_modules/socket.io/client-dist/socket.io.js"));
})

module.exports = router;