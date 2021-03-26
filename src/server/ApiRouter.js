const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const { v4: uuid } = require('uuid');

class ApiRouter {
    constructor() {
        this.setup();

        this.onNewUserSearching = () => { };
        this.onCheckHasUserMatched = () => { };
    }

    setup() {
        router.use(bodyParser.json());

        router.get('/ping', (req, res) => {
            res.status(200).send('PONG');
        })

        router.get('/socket-io-client/socket.io.js', (req, res) => {
            res.sendFile(path.join(__dirname, "../../node_modules/socket.io/client-dist/socket.io.js"));
        })

        router.post('/match/hello/', (req, res) => {
            let userId = uuid();
            this.onNewUserSearching(userId);
            res.status(200).json({ userId: userId })
        })

        router.get('/match/poll/:userId', (req, res) => {
            const userId = req.params.userId;
            if (!userId) return res.sendStatus(400);
            let chat = this.onCheckHasUserMatched(userId);
            if (chat !== undefined) {
                res.status(200).json({'status': 'found', 'chatId': chat.chatId})
            } else {
                console.log('Has not matched')
                res.status(200).json({ 'status': 'open' })
            }
        })
    }

    getRouter() {
        return router;
    }
}

module.exports = ApiRouter;